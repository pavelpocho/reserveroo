import { Company } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/server-runtime'
import { Place } from '~/models/place.server';
import { getReservationList, Reservation } from '~/models/reservation.server'
import { User } from '~/models/user.server';

interface ReservationsAdminLoaderData {
  reservations: (Reservation & {
    User: User | null;
    Place: (Place & {
        Company: Company | null;
    }) | null;
  })[]
}

export const loader: LoaderFunction = async () => {
  const reservations = await getReservationList();
  return json({ reservations });
}

export default function ReservationsAdmin() {

  const { reservations } = useLoaderData<ReservationsAdminLoaderData>();

  return <>
    <div>RESERVATION ADMIN</div>
    { reservations.map(r => <div key={r.id}>
      <p>Created at: {r.createdAt}</p>
      <p>User: {r.User?.username}</p>
      <p>Place (Company): {r.Place?.name} ({r.Place?.Company?.name})</p>
      <p>Note: {r.note}</p>
    </div>) }
  </>
}