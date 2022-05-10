import { Company, Reservable, Reservation } from '@prisma/client';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import { IdInput } from '~/components/inputs/ObjectInput';
import { Place } from '~/models/place.server';
import { changeReservationStatus, updateReservation } from '~/models/reservation.server';
import { getReservationGroupList, ReservationGroup } from '~/models/reservationGroup.server'
import { User } from '~/models/user.server';
import { ReservationStatus } from '~/types/types';

interface ReservationsAdminLoaderData {
  reservationGroups: (ReservationGroup & {
    user: User | null;
    reservations: (Reservation & {
        reservable: (Reservable & {
            place: (Place & {
              company: Company | null;
            }) | null;
        }) | null;
    })[];
})[]
}

export const loader: LoaderFunction = async () => {
  const reservationGroups = await getReservationGroupList();
  return json({ reservationGroups });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // TODO: Validation
  const reservationId = formData.get('reservationId')?.toString();
  const status = parseInt(formData.get('status')?.toString() ?? '');

  if (!reservationId || isNaN(status)) {
    // return error message
    return {}
  }

  console.log(reservationId);
  console.log(status);

  await changeReservationStatus({ id: reservationId, status: status });

  return {}
}

export default function ReservationsAdmin() {

  const { reservationGroups } = useLoaderData<ReservationsAdminLoaderData>();
  const submit = useSubmit();

  const handleChange = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    submit(e.currentTarget, { replace: true });
  }

  return <>
    <div>RESERVATION GROUPS ADMIN</div>
    { reservationGroups.map(rg => <div key={rg.id}>
      <p>Created at: {rg.createdAt}</p>
      <p>User: {rg.user?.username}</p>
      <p>Note: {rg.note}</p>
      { rg.reservations.map(r => <div key={r.id}>
        <p>Reservation: {r.id}</p>
        <p>From: {new Date(r.start).getHours()}:{new Date(r.start).getMinutes()}</p>
        <p>To: {new Date(r.end).getHours()}:{new Date(r.end).getMinutes()}</p>
        <p>Status {
          (r.status as ReservationStatus) == ReservationStatus.AwaitingConfirmation ? 'Awaiting confirmation' : 
          (r.status as ReservationStatus) == ReservationStatus.Confirmed ? 'Confirmed' : 
          (r.status as ReservationStatus) == ReservationStatus.Rejected ? 'Rejected' : 
          (r.status as ReservationStatus) == ReservationStatus.Cancelled ? 'Cancelled' : 
          (r.status as ReservationStatus) == ReservationStatus.Paid ? 'Paid' :
          (r.status as ReservationStatus) == ReservationStatus.Past ? 'Past' : '' 
        }</p>
        <Form method='post' onChange={handleChange}>
          <IdInput name={'reservationId'} value={r.id} />
          <select name='status' defaultValue={r.status.toString()}>
            <option value='0'>Awaiting confirmation</option>
            <option value='1'>Confirmed</option>
            <option value='2'>Rejected</option>
            <option value='3'>Cancelled</option>
            <option value='4'>Paid</option>
          </select>
        </Form>
        <p>Reservable: {r.reservable?.name}</p>
        <p>Place (Company): {r.reservable?.place?.name} ({r.reservable?.place?.company?.name})</p>
      </div>) }
    </div>) }
  </>
}