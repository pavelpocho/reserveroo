import { Form, useActionData, useLoaderData, useParams, useSubmit } from '@remix-run/react';
import type { ActionFunction, LoaderFunction} from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime'
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import AnglesRightIcon from '~/assets/icons/AnglesRight';
import InfoButton from '~/components/info-button';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { FormError } from '~/components/other/auth-components';
import { Indicator } from '~/components/place/facilities-indicator';
import { MainButtonBtn, SecondaryButton, SecondaryButtonBtn } from '~/components/place/place-summary';
import { doDaysMatch, ReservableTimes } from '~/components/reservable-times';
import { ReserveConfirmationDialog } from '~/components/reserve-confirmation-dialog';
import { styles } from '~/constants/styles';
import type { OpeningTime } from '~/models/openingTime.server';
import type { Place } from '~/models/place.server';
import { getPlaceWithReservations } from '~/models/place.server';
import { getReservableWReservations } from '~/models/reservable.server';
import type { Reservation } from '~/models/reservation.server';
import { createReservation } from '~/models/reservation.server';
import { createReservationGroup } from '~/models/reservationGroup.server';
import { getUserId } from '~/models/user.server';
import type { ReservableTypeWithTexts, ReservableWithCountForEmail, ReservableWithReservations, Time, TimeSection } from '~/types/types';
import { ReservationStatus } from '~/types/types';
import { sendCreationEmail } from '~/utils/emails.server';
import { getBaseUrl, getStringDateValue, getStringTimeValue } from '~/utils/forms';
import { requireUsernameAndAdmin } from '~/utils/session.server'

interface ReserveLoaderData {
  username: string,
  place: (Place & {
    reservables: (ReservableWithReservations & {
      ReservableType: ReservableTypeWithTexts
    })[];
    openingTimes: OpeningTime[];
})
}

export type ReserveActionData = {
  formError?: string;
  fields?: {
    note: string;
    username: string;
    placeId: string;
  };
};

const badRequest = (data: ReserveActionData) => json(data, { status: 400 });

export const loader: LoaderFunction = async ({ request, params }) => {
  // Return availability data
  const { username } = await requireUsernameAndAdmin(request);
  const place = await getPlaceWithReservations({ id: params.placeId ?? '' });
  return json({ username, place });
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const note = form.get('note')?.toString();
  const placeId = form.get('placeId')?.toString();
  const username = form.get('username')?.toString();

  const place = await getPlaceWithReservations({ id: placeId ?? '' });

  const getTotalMinutes = (time: Time) => time.hour * 60 + time.minute;

  const getTimeSectionOfReservation = (reservation: Reservation) => {
    // @ts-ignore
    return getTimeSectionOfDates(new Date(reservation.start.slice(0, 16)), new Date(reservation.end.slice(0, 16)));
  }

  const getTimeSectionOfDates = (start: Date, end: Date) => {
    return {
      start: {
        hour: start.getHours(),
        minute: start.getMinutes(),
      },
      end: {
        hour: end.getHours(),
        minute: end.getMinutes(),
      }
    }
  }

  const doSectionsOverlap = (section1: TimeSection, section2: TimeSection | null) => {
    return section2 != null && (!(getTotalMinutes(section1.end) <= getTotalMinutes(section2.start) || getTotalMinutes(section2.end) <= getTotalMinutes(section1.start)))
  }

  const reservationBackup = form.getAll('reservationBackup[]').map(r => r.toString());
  const reservableId = form.getAll('reservableId[]').map(r => r.toString()).filter(r => r != '-1');
  const dateTimeStart = form.getAll('start[]').map(r => r.toString());
  const dateTimeEnd = form.getAll('end[]').map(r => r.toString());

  const reservablePromises = reservableId.map((r) => getReservableWReservations({ id: r }));
  const reservables = await Promise.all(reservablePromises);
  const reservablesWithBackup = reservables.map((r, i) => ({
    reservable: r,
    backup: reservationBackup[i]
  }));

  // Possible errors
  /**
   * 1) No main timeslot selected
   * 2) Timeslots overlap
   * 3) Past slot selected
   * 4) Something else missing
   */

   if (reservationBackup.filter(b => b === '0').length == 0) {
    // Problem 1)
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: `Please select a preferred timeslot.`
    })
  }

  // These are the reservableIds we book
  const overlap = !!(reservables.map((r, i) => {
    // TODO: Fix this shit
    // @ts-ignore
    const start = dateTimeStart[i];
    const end = dateTimeEnd[i];
    if (r == null) return false;
    return r.reservations.filter(
      rx => (
        doDaysMatch(new Date(start), rx.start, rx.end) &&                                                             // Is the reservation on the same day?
        doSectionsOverlap(getTimeSectionOfReservation(rx), getTimeSectionOfDates(new Date(start), new Date(end))) &&  // Is the reservation during the same time?
        rx.status != ReservationStatus.Cancelled                                                                      // Is it active?
      )
    ).length >= r.reservationsPerSlot;
  }).find(o => o));

  if (overlap) {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: `It looks like you selected a time that's already booked. Please try another time.`
    })
    // Problem 2)
  }

  const inTwoHours = new Date();
  inTwoHours.setHours(inTwoHours.getHours() + 2);
  const datesInPast = dateTimeStart.find(s => new Date(s).getTime() < inTwoHours.getTime());

  if (datesInPast) {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: `Please select a slot that's at least 2 hours in the future.`
    })
    // Problem 3)
  }

  if (!placeId || !username || !reservableId) {
    // Problem 4)
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: 'We are mising some information about you. Please try reloading.'
    })
  }

  const user = await getUserId({ username });
  const typesWithAmount: ReservableWithCountForEmail[] = [];
  const reservableTypes = reservablesWithBackup.filter(r => r.backup == '0').map(r => r?.reservable?.ReservableType);
  reservableTypes.forEach(rt => {
    let cur = typesWithAmount.find(t => t.type == rt?.multiLangName?.english);
    if (cur) {
      cur.amount += 1;
    }
    else {
      typesWithAmount.push({ amount: 1, type: rt?.multiLangName?.english ?? '' });
    }
  });

  const resGroup = user ? await createReservationGroup({ note: note ?? '', userId: user.id }) : null;
  if (resGroup == null) {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: 'We cannot find you. Please try reloading the page.'
    })
  }

  await sendCreationEmail(getBaseUrl(request), user?.email ?? '', place?.name ?? '', typesWithAmount);

  const promises: Promise<object>[] = []
  dateTimeStart.forEach((d, i) => {
    promises.push(createReservation({
      backup: reservationBackup[i] == '1',
      start: new Date(new Date(dateTimeStart[i]).setMinutes(new Date(dateTimeStart[i]).getMinutes() - new Date().getTimezoneOffset())), 
      end: new Date(new Date(dateTimeEnd[i]).setMinutes(new Date(dateTimeEnd[i]).getMinutes() - new Date().getTimezoneOffset())),
      reservableId: reservableId[i] ?? null,
      reservationGroupId: resGroup.id ?? null 
    }));
  });
  await Promise.all(promises);

  // Here you can return actionData instead to show a confirmation dialog and then
  // redirect to the details from there or something
  return redirect(`/profile`);
}

const HeaderBar = styled.div<{ color: 'primary' | 'gray' | 'none' }>`
  background-color: ${props => props.color == 'primary' ? styles.colors.primary : props.color == 'gray' ? styles.colors.gray[10] : ''};
  @media (min-width: 500px) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.6rem 0.9rem 1.6rem;
  & h5 {
    color: ${props => props.color == 'primary' ? styles.colors.white : styles.colors.black};
    font-size: 1.2rem;
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    row-gap: 0.6rem;
  }
`;

const Title = styled.h5`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0rem;
  height: 2.25rem;
  line-height: 2.25rem;
`;

const SubTitle = styled.p`
  margin: 0;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  color: ${styles.colors.gray[50]};
  align-items: center;
  gap: 0rem;
  height: 2.25rem;
  line-height: 2.25rem;
`;

const ButtonWrap = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  max-width: 938px;
  display: flex;
  @media (min-width: 500px) {
    padding: 0rem 2rem;
  }
  flex-direction: column;
  margin: 2rem auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  & h5 {
    font-weight: 500;
    margin-right: 1.5rem;
  }
`;

const TextWrap = styled.div`
  padding: 0.5rem 1.6rem;
`;

const SlotList = styled.div`
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 500px) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  gap: 1.5rem;
  background-color: ${styles.colors.primary};
`;

const BackupSlotList = styled(SlotList)`
  background-color: ${styles.colors.gray[5]};
`;

const ResE = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SlotListTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const WhiteSlotListTitle = styled(SlotListTitle)`
  color: ${styles.colors.white};
`;

const BackupSlotText = styled.p`

`;

const SlotText = styled(BackupSlotText)`
  color: ${styles.colors.white};  
`;

const FlexSL = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.4rem;
  flex-wrap: wrap;
  & > p {
    margin: 0;
  }
`;

export interface Res {
  isBackup: boolean,
  reservableId: string,
  startTime: Date | null,
  endTime: Date | null
}

export default function ReservationElement() {

  const params = useParams();
  const s = useSubmit();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [ confirmationDialog, setConfirmationDialog ] = React.useState<boolean>(false);
  const { username, place } = useLoaderData<ReserveLoaderData>();
  const reservables = place.reservables;
  const actionData = useActionData<ReserveActionData>();

  const [ resList, setResList ] = useState<Res[]>([]);

  const [ date, setDate ] = React.useState<Date | null>(null);
  const [ backup, setBackup ] = React.useState(false);

  return (<Wrap>
    <ReserveConfirmationDialog 
      hidden={!confirmationDialog}
      backup={backup}
      onConfirm={() => {
        if (formRef.current)
          s(formRef.current);
      } }
      title={'Create reservation?'}
      text={'Is all the information correct?'}
      confirmText={'Yes, create reservation'}
      cancelText={'No, go back'}
      close={() => {
        setConfirmationDialog(false);
      } }
      subHeaderText={'Is all of the information bellow correct?'}
      resList={resList} 
      reservables={reservables}
      backupTitle={backup && resList.filter(r => r.isBackup).length > 0 ? 'What does this mean?' : 'Cannot go any other time?'}
      backupText1={backup && resList.filter(r => r.isBackup).length > 0 && resList.filter(r => !r.isBackup).length > 1 ? <span>
        We will try to book all your primary slots. If <b>*any* (read: at least one)</b> of them are unavailable, we will try your backup option.
      </span> : backup && resList.filter(r => r.isBackup).length > 0 && resList.filter(r => !r.isBackup).length == 1 ? <span>
        We will try to book your primary slot. If it's unavailable, we will try your backup option.
      </span> : <span>
        Please keep in mind that for the time being, we cannot guarantee a free spot at this business. That’s why we provide the option to choose a backupslot, which we will book you into if your first choice isn’t free.
      </span>}
      backupText2={backup && resList.filter(r => r.isBackup).length > 0 ? <span>
        Please keep in mind that for the time being, we cannot guarantee a free spot at this business. To help us bring this functionality to everyone, you can share this service with your friends! Thanks for understanding. :)
      </span> : <span>
        To help us bring real-time availability information to everyone, you can share this service with your friends! Thanks for understanding. :)
      </span>}
    />
    <ButtonWrap>
      <SecondaryButton inSearch={false} style={{ alignSelf: 'start' }} to={`/${place.id}`}>View Place Details</SecondaryButton>
    </ButtonWrap>
    <Form method='post' ref={formRef}>
      <IdInput name={'username'} value={username} /> 
      <IdInput name={'placeId'} value={params.placeId ?? ''} />
      <HeaderBar color={'primary'}>
        <Title>Make a Reservation</Title>
        <Flex>
          <SubTitle>
            Scroll to see more
            <FaChevronRight color={styles.colors.gray[50]} size={16} style={{ marginLeft: '8px', marginRight: '-8px' }} />
            <FaChevronRight color={styles.colors.gray[50]} size={14} style={{ marginRight: '-6px' }} />
            <FaChevronRight color={styles.colors.gray[50]} size={12} />
          </SubTitle>
        </Flex>
      </HeaderBar>
      { <ReservableTimes
        startName='start[]'
        endName='end[]'
        reservationBackupName='reservationBackup[]'
        reservationIdName='reservationId[]'
        reservableIdName='reservableId[]'
        reservables={reservables}
        setResList={setResList}
        openingTimes={place.openingTimes.sort((a, b) => a.day - b.day)/*[getDayOfWeek(date)]*/}
      /> }
      <SlotList>
        <WhiteSlotListTitle>{resList.filter(r => !r.isBackup).length == 0 ? <i style={{ fontWeight: 'normal' }}>Nothing selected.</i> :'Picked timeslots'}</WhiteSlotListTitle>
        { resList.filter(r => !r.isBackup).map((r, i) => r.startTime && r.endTime && <ResE key={i}>
          <Indicator style={{ padding: '0.5rem', whiteSpace: 'nowrap' }}>{reservables.find(x => x.id == r.reservableId)?.name}</Indicator>
          <FlexSL>
            <SlotText>Date: {getStringDateValue(r.startTime)}</SlotText>
            <SlotText>Time: {getStringTimeValue(r.startTime)} - {getStringTimeValue(new Date(r.endTime))}</SlotText>
          </FlexSL>
        </ResE>) }
      </SlotList>
      <HeaderBar color='gray'>
        <Title>Backup timeslot<InfoButton helpText={`If the timeslot you selected above isn't available, we will try to get a second option for you.`} /></Title>
        <SecondaryButtonBtn onClick={(e) => {
          e.preventDefault();
          setBackup(!backup);
        }}>{ !backup ? 'Choose a' : 'Remove'} backup timeslot</SecondaryButtonBtn>
      </HeaderBar>
      { backup && <ReservableTimes
        backup={true}
        startName='start[]'
        endName='end[]'
        reservationBackupName='reservationBackup[]'
        reservationIdName='reservationId[]'
        reservableIdName='reservableId[]'
        reservables={reservables}
        setResList={setResList}
        openingTimes={place.openingTimes.sort((a, b) => a.day - b.day)}
      /> }
      <BackupSlotList>
        <SlotListTitle>{!backup || resList.filter(r => r.isBackup).length == 0 ? <i style={{ fontWeight: 'normal' }}>Nothing selected.</i> : 'Picked backup timeslots'}</SlotListTitle>
        { backup && resList.filter(r => r.isBackup).map(r => r.startTime && r.endTime && <ResE>
          <Indicator style={{ padding: '0.5rem' }}>{reservables.find(x => x.id == r.reservableId)?.name}</Indicator>
          <FlexSL>
            <BackupSlotText>{getStringDateValue(r.startTime)}</BackupSlotText>
            <BackupSlotText>{getStringTimeValue(r.startTime)} - {getStringTimeValue(new Date(r.endTime))}</BackupSlotText>
          </FlexSL>
        </ResE>) }
      </BackupSlotList>
      <HeaderBar color='none' style={{ marginBottom: '0px' }}>
        <Title>Additional info</Title>
      </HeaderBar>
      <TextWrap>
        <TextInput name={'note'} title={'Note'} defaultValue={actionData?.fields?.note ?? ''} />
      </TextWrap>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        { actionData?.formError && <FormError>{actionData.formError ?? ''}</FormError> }
      </div>
      <MainButtonBtn disabled={resList.filter(r => !r.isBackup).length == 0} style={{ margin: '2rem auto' }} onClick={(e) => {
        e.preventDefault();
        setConfirmationDialog(true);
      }}>Create reservation<AnglesRightIcon height='1.5rem' /></MainButtonBtn>
    </Form>
  </Wrap>)
}