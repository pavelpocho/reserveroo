import { Company, Reservable, Reservation } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/server-runtime'
import { Place } from '~/models/place.server';
import { getReservationGroupList, ReservationGroup } from '~/models/reservationGroup.server'
import { User } from '~/models/user.server';

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

export default function ReservationsAdmin() {

  const { reservationGroups } = useLoaderData<ReservationsAdminLoaderData>();

  return <>
    <div>RESERVATION GROUPS ADMIN</div>
    { reservationGroups.map(rg => <div key={rg.id}>
      <p>Created at: {rg.createdAt}</p>
      <p>User: {rg.user?.username}</p>
      <p>Note: {rg.note}</p>
      { rg.reservations.map(r => <div key={r.id}>
        <p>Reservation: {r.id}</p>
        <p>Reservable: {r.reservable?.name}</p>
        <p>Place (Company): {r.reservable?.place?.name} ({r.reservable?.place?.company?.name})</p>
      </div>) }
    </div>) }
  </>
}