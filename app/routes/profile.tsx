import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getUserById } from '~/models/user.server';
import { requireUserIdAndAdmin } from '~/utils/session.server';
import { Company, Place, Reservable, Reservation, ReservationGroup, User } from '@prisma/client';
import { ReservationStatus } from '~/types/types';

interface ProfileLoaderData {
  user: User & {
    reservationGroups: (ReservationGroup & {
      reservations: (Reservation & {
        reservable: (Reservable & {
          place: Place
        }) | null;
      })[];
    })[];
  } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  return { user: await getUserById({ id: (await requireUserIdAndAdmin(request)).userId })};
}

export default function Profile() {

  const { user } = useLoaderData<ProfileLoaderData>();

  return (
    <div>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.username}</p>
      <p>{user?.createdAt}</p>
      { user?.reservationGroups.map(rg => <div key={rg.id}>
        <p>ReservationGroup with id {rg.id}</p>
        { rg.reservations.map(r => <div key={r.id}>
          <p>Reservation {r.id}</p>
          <p>For reservable {r.reservable?.name}</p>
          <p>From: {new Date(r.start).getHours()}:{new Date(r.start).getMinutes()}</p>
          <p>To: {new Date(r.end).getHours()}:{new Date(r.end).getMinutes()}</p>
          <p>At place {r.reservable?.place.name}</p>
          <p>Status {
            (r.status as ReservationStatus) == ReservationStatus.AwaitingConfirmation ? 'Awaiting confirmation' : 
            (r.status as ReservationStatus) == ReservationStatus.Confirmed ? 'Confirmed' : 
            (r.status as ReservationStatus) == ReservationStatus.Rejected ? 'Rejected' : 
            (r.status as ReservationStatus) == ReservationStatus.Cancelled ? 'Cancelled' : 
            (r.status as ReservationStatus) == ReservationStatus.Paid ? 'Paid' :
            (r.status as ReservationStatus) == ReservationStatus.Past ? 'Past' : '' 
          }</p>
        </div>) }
        <p>Note you put in: {rg.note}</p>
      </div>) }
    </div>
  )
}