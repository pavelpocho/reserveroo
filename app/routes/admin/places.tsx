import { Company, Reservable } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import React from 'react';
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server';

interface PlacesAdminLoaderData {
  places: (Place & {
    reservables: Reservable[];
    company: Company | null;
})[]
}

export const loader: LoaderFunction = async () => {
  const places = await getAllPlaces();
  return { places }
}

export default function PlacesAdmin() {

  const { places } = useLoaderData<PlacesAdminLoaderData>();

  return <>
    <div>PLACE ADMIN</div>
    <div>
      { places.map(p => <div key={p.id}>
        <p>Name (Company): {p.name} ({p.company?.name})</p>
        <Link to={`/admin/${p.id}`}>View / Edit</Link>
      </div>) }
    </div>
  </>
}