import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getUserById } from '~/models/user.server';
import { requireUserIdAndAdmin } from '~/utils/session.server';
import { Company, Place, Reservation, User } from '@prisma/client';

interface ProfileLoaderData {
  user: User & { reservations: (Reservation & {
    Place: (Place & {
      Company: Company | null;
  }) | null;
  })[] }
}

export const loader: LoaderFunction = async ({ request }) => {
  console.log("User id for profile");
  console.log((await requireUserIdAndAdmin(request)).userId);
  console.log("eh?");
  return { user: await getUserById({ id: (await requireUserIdAndAdmin(request)).userId })};
}

export default function Profile() {

  const { user } = useLoaderData<ProfileLoaderData>();

  return (
    <div>
      <p>{user.id}</p>
      <p>{user.email}</p>
      <p>{user.username}</p>
      <p>{user.createdAt}</p>
      { user.reservations.map(r => <div key={r.id}>
        <p>Reservation with id {r.id}</p>
        <p>At place {r.Place?.name}</p>
        <p>Which is managed by company {r.Place?.Company?.name}</p>
        <p>Note you put in: {r.note}</p>
      </div>) }
    </div>
  )
}