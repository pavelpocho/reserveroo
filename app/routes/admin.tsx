import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderFunction } from '@remix-run/server-runtime'
// import { LinkWithLoader } from '~/components/LinkWithLoader';
import { requireUserIdAndAdmin } from '~/utils/session.server'

interface AdminLoaderData {
  forbidden: boolean
}

const forbidden = (data: AdminLoaderData) => json(data, { status: 403 });

export const loader: LoaderFunction = async ({ request }) => {
  const { admin } = await requireUserIdAndAdmin(request);
  if (admin === true) {
    return {}
  }
  return forbidden({ forbidden: true });
}

export default function Admin() {
  return useLoaderData<AdminLoaderData>().forbidden ? 
    <div>Iiii dont think ur an admin m8</div> : <>
    <div>
      <Link to='/admin/reservations'>Reservations</Link>
      <Link to='/admin/places'>Places</Link>
    </div>
    <div>
      <Outlet />
    </div>
  </>
}