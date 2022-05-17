import { Form, useActionData, useLoaderData, useMatches, useParams, useSubmit } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
import AngleLeftIcon from '~/assets/icons/AngleLeft';
import AnglesRightIcon from '~/assets/icons/AnglesRight';
import { Button } from '~/components/button';
import { ConfirmationDialog } from '~/components/confirmation-dialog';
import { DateInput } from '~/components/inputs/DateInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { RadioInput } from '~/components/inputs/RadioInput';
import { TextInput } from '~/components/inputs/TextInput';
import { TimeInput } from '~/components/inputs/TimeInput';
import { MainButton, MainButtonBtn, SecondaryButton, SecondaryButtonBtn } from '~/components/place/place-summary';
import { ReservableTimes } from '~/components/reservable-times';
import { styles } from '~/constants/styles';
import { useUsername } from '~/contexts/usernameContext';
import { OpeningTime } from '~/models/openingTime.server';
import { getPlace, getPlaceWithReservations, Place } from '~/models/place.server';
import { getReservableList, Reservable } from '~/models/reservable.server';
import { createReservation, Reservation } from '~/models/reservation.server';
import { createReservationGroup } from '~/models/reservationGroup.server';
import { getUserId } from '~/models/user.server';
import { ReservableTypeWithTexts, ReservableWithReservations, TimeSection } from '~/types/types';
import { sendCreationEmail } from '~/utils/emails.server';
import { getDayOfWeek } from '~/utils/forms';
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
  return json({ username, place })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const note = form.get('note')?.toString();
  const placeId = form.get('placeId')?.toString();
  const username = form.get('username')?.toString();

  const reservationBackup = form.getAll('reservationBackup[]').map(r => r.toString());
  const reservableId = form.getAll('reservableId[]').map(r => r.toString()).filter(r => r != '-1');
  const dateTimeStart = form.getAll('start[]').map(r => r.toString());
  const dateTimeEnd = form.getAll('end[]').map(r => r.toString());

  // You need to repeat the validation here!!!!!!

  const datesInPast = dateTimeStart.find(s => new Date(s).getTime() < new Date().getTime());

  if (dateTimeEnd.length == 0 || dateTimeStart.length == 0 || datesInPast || !placeId || !username || !reservableId) {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: 'Fill everything in pls.'
    })
  }

  const user = await getUserId({ username });
  await sendCreationEmail(username);
  const resGroup = user ? await createReservationGroup({ note: note ?? '', userId: user.id }) : null;
  if (resGroup == null) {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: 'Cannot find who you are :(.'
    })
  }
  const promises: Promise<object>[] = []
  dateTimeStart.forEach((d, i) => {
    promises.push(createReservation({ backup: reservationBackup[i] == '1', start: new Date(dateTimeStart[i]), end: new Date(dateTimeEnd[i]), reservableId: reservableId[i] ?? null, reservationGroupId: resGroup.id ?? null }));
  });
  await Promise.all(promises);

  // Here you can return actionData instead to show a confirmation dialog and then
  // redirect to the details from there or something
  return redirect(`/profile`);
}

const HeaderBar = styled.div<{ color: 'primary' | 'gray' | 'none' }>`
  background-color: ${props => props.color == 'primary' ? styles.colors.primary : props.color == 'gray' ? styles.colors.gray[10] : ''};
  @media (min-width: 500px) {
    border-radius: 0.5rem;
  }
  margin-top: 2rem;
  margin-bottom: 1rem;
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

export default function ReservationElement() {

  const params = useParams();
  const s = useSubmit();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [ confirmationDialog, setConfirmationDialog ] = React.useState<boolean>(false);
  const { username, place } = useLoaderData<ReserveLoaderData>();
  const reservables = place.reservables;
  const actionData = useActionData<ReserveActionData>();

  const [ date, setDate ] = React.useState<Date | null>(null);
  const [ backup, setBackup ] = React.useState(false);

  return (<Wrap>
    <ConfirmationDialog 
      hidden={!confirmationDialog}
      onConfirm={() => {
        if (formRef.current) s(formRef.current);
      }}
      title={'Create reservation?'}
      text={'Is all the information correct?'}
      confirmText={'Yes, create reservation'}
      cancelText={'No, go back'}
      close={() => {
        setConfirmationDialog(false);
      }}
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
          <Title>Date</Title>
          <DateInput disablePast={true} name={'date'} defaultValue={date} onChange={setDate} />
        </Flex>
      </HeaderBar>
      { date && <ReservableTimes
        startName='start[]'
        endName='end[]'
        reservationBackupName='reservationBackup[]'
        reservationIdName='reservationId[]'
        reservableIdName='reservableId[]'
        reservables={reservables}
        date={date}
        openingTime={place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)]}
      /> }
      <HeaderBar color='gray'>
        <Title>Backup timeslot</Title>
        <SecondaryButtonBtn onClick={(e) => {
          e.preventDefault();
          setBackup(!backup);
        }}>{ !backup ? 'Choose a' : 'Remove'} backup timeslot</SecondaryButtonBtn>
      </HeaderBar>
      { backup && date && <ReservableTimes
        backup={true}
        startName='start[]'
        endName='end[]'
        reservationBackupName='reservationBackup[]'
        reservationIdName='reservationId[]'
        reservableIdName='reservableId[]'
        reservables={reservables}
        date={date}
        openingTime={place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)]}
      /> }
      <HeaderBar color='none' style={{ marginBottom: '0px' }}>
        <Title>Additional info</Title>
      </HeaderBar>
      <TextWrap>
        <TextInput name={'note'} title={'Note'} defaultValue={actionData?.fields?.note ?? ''} />
      </TextWrap>
      <MainButtonBtn style={{ margin: '2rem auto' }} onClick={(e) => {
        e.preventDefault();
        setConfirmationDialog(true);
      }}>Create reservation<AnglesRightIcon height='1.5rem' /></MainButtonBtn>
      {
        actionData?.formError && <p>{actionData.formError ?? ''}</p>
      }
    </Form>
  </Wrap>)
}