import { Location } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getAllLocations } from '~/models/location.server';

interface LocationsAdminLoaderData {
  locations: Location[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const locations = await getAllLocations();
  return { locations }
}

export default function CompaniesAdminIndex() {

  const { locations } = useLoaderData<LocationsAdminLoaderData>();

  return <>
    <div>
      { locations.map(l => <div key={l.id}>
        <p>City: {l.city}</p>
        <p>Country: {l.country}</p>
        <Link to={`/admin/locations/${l.id}`}>View / Edit</Link>
      </div>) }
      <Link to={'/admin/locations/new'} >New location</Link>
    </div>
  </>
}