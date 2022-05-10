import { Form, useActionData, useLoaderData, useMatches, useParams } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/components/button';
import { DateInput } from '~/components/inputs/DateInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { RadioInput } from '~/components/inputs/RadioInput';
import { TextInput } from '~/components/inputs/TextInput';
import { TimeInput } from '~/components/inputs/TimeInput';
import { ReservableTimes } from '~/components/reservable-times';
import { useUserId } from '~/contexts/userIdContext';
import { OpeningTime } from '~/models/openingTime.server';
import { getPlace, getPlaceWithReservations, Place } from '~/models/place.server';
import { getReservableList, Reservable } from '~/models/reservable.server';
import { createReservation, Reservation } from '~/models/reservation.server';
import { createReservationGroup } from '~/models/reservationGroup.server';
import { ReservableWithReservations, TimeSection } from '~/types/types';
import { getDayOfWeek } from '~/utils/forms';
import { requireUserIdAndAdmin } from '~/utils/session.server'

interface ReserveLoaderData {
  userId: string,
  place: (Place & {
    reservables: ReservableWithReservations[];
    openingTimes: OpeningTime[];
})
}

export type ReserveActionData = {
  formError?: string;
  fields?: {
    note: string;
    userId: string;
    placeId: string;
  };
};

const badRequest = (data: ReserveActionData) => json(data, { status: 400 });

export const loader: LoaderFunction = async ({ request, params }) => {
  // Return availability data
  const { userId } = await requireUserIdAndAdmin(request);
  const place = await getPlaceWithReservations({ id: params.placeId ?? '' });
  return json({ userId, place })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const note = form.get('note')?.toString();
  const placeId = form.get('placeId')?.toString();
  const userId = form.get('userId')?.toString();

  const reservationBackup = form.getAll('reservationBackup[]').map(r => r.toString());
  const reservableId = form.getAll('reservableId[]').map(r => r.toString());
  const dateTimeStart = form.getAll('start[]').map(r => r.toString());
  const dateTimeEnd = form.getAll('end[]').map(r => r.toString());

  // You need to repeat the validation here!!!!!!

  const datesInPast = dateTimeStart.find(s => new Date(s).getTime() < new Date().getTime());

  if (!dateTimeEnd || !dateTimeStart || !note || datesInPast || !placeId || !userId || !reservableId || note == '') {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', userId: userId ?? ''
      },
      formError: 'Fill everything in pls.'
    })
  }

  const resGroup = await createReservationGroup({ note, userId });
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
  const { userId, place } = useLoaderData<ReserveLoaderData>();
  const reservables = place.reservables;
  const actionData = useActionData<ReserveActionData>();

  const [ date, setDate ] = React.useState<Date | null>(null);
  const [ backup, setBackup ] = React.useState(false);

  return (
    <Form method='post'>
      <IdInput name={'userId'} value={userId} /> 
      <IdInput name={'placeId'} value={params.placeId ?? ''} />
      <TextInput name={'note'} title={'Note'} defaultValue={actionData?.fields?.note ?? ''} />
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
        setBackup(true);
      }}>Choose a backup timeslot</Button>
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
      <input type='submit'></input>
      {
        actionData?.formError && <p>{actionData.formError ?? ''}</p>
      }
    </Form>
  )
}