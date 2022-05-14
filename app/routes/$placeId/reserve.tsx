import { Form, useActionData, useLoaderData, useMatches, useParams, useSubmit } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/components/button';
import { ConfirmationDialog } from '~/components/confirmation-dialog';
import { DateInput } from '~/components/inputs/DateInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { RadioInput } from '~/components/inputs/RadioInput';
import { TextInput } from '~/components/inputs/TextInput';
import { TimeInput } from '~/components/inputs/TimeInput';
import { ReservableTimes } from '~/components/reservable-times';
import { useUsername } from '~/contexts/usernameContext';
import { OpeningTime } from '~/models/openingTime.server';
import { getPlace, getPlaceWithReservations, Place } from '~/models/place.server';
import { getReservableList, Reservable } from '~/models/reservable.server';
import { createReservation, Reservation } from '~/models/reservation.server';
import { createReservationGroup } from '~/models/reservationGroup.server';
import { getUserId } from '~/models/user.server';
import { ReservableWithReservations, TimeSection } from '~/types/types';
import { sendCreationEmail } from '~/utils/emails.server';
import { getDayOfWeek } from '~/utils/forms';
import { requireUsernameAndAdmin } from '~/utils/session.server'

interface ReserveLoaderData {
  username: string,
  place: (Place & {
    reservables: ReservableWithReservations[];
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
  const reservableId = form.getAll('reservableId[]').map(r => r.toString());
  const dateTimeStart = form.getAll('start[]').map(r => r.toString());
  const dateTimeEnd = form.getAll('end[]').map(r => r.toString());

  // You need to repeat the validation here!!!!!!

  const datesInPast = dateTimeStart.find(s => new Date(s).getTime() < new Date().getTime());

  if (!dateTimeEnd || !dateTimeStart || !note || datesInPast || !placeId || !username || !reservableId || note == '') {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', username: username ?? ''
      },
      formError: 'Fill everything in pls.'
    })
  }

  const user = await getUserId({ username });
  await sendCreationEmail(username);
  const resGroup = user ? await createReservationGroup({ note, userId: user.id }) : null;
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

const getDiffBetweenTwoDates = (close: string | Date, open: string | Date) => {
  const millis = new Date(close).getTime() - new Date(open).getTime();
  return millis / 1000 / 60;
}

const getTimeSectionOfReservation = (reservation: Reservation) => {
  return {
    start: {
      hour: new Date(reservation.start).getHours(),
      minute: new Date(reservation.start).getMinutes(),
    },
    end: {
      hour: new Date(reservation.end).getHours(),
      minute: new Date(reservation.end).getMinutes(),
    }
  }
}

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

  return (<>
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
      }} />
    <Form method='post' ref={formRef}>
      <IdInput name={'username'} value={username} /> 
      <IdInput name={'placeId'} value={params.placeId ?? ''} />
      <DateInput disablePast={true} name={'date'} defaultValue={date} title={'Date'} onChange={setDate} />
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
      <p>
        We don't yet have real-time availability data for this business.
        If you wish, you can provide us with a backup timeslot, to maximize
        your chances of encountering a free place.
        By booking with us, you can help us remove this limitation as soon as possible.
      </p>
      <Button onClick={() => {
        setBackup(!backup);
      }}>{ !backup ? 'Choose a' : 'Remove the'} backup timeslot</Button>
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
      <TextInput name={'note'} title={'Note'} defaultValue={actionData?.fields?.note ?? ''} />
      <Button onClick={() => {
        setConfirmationDialog(true);
      }}>Create reservation</Button>
      {
        actionData?.formError && <p>{actionData.formError ?? ''}</p>
      }
    </Form>
  </>)
}