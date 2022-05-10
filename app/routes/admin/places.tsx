import { Company, Reservable } from '@prisma/client';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
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
  return {}
}

export default function PlacesAdmin() {

  const { places } = useLoaderData<PlacesAdminLoaderData>();

  return <>
    <div>PLACE ADMIN</div>
    <Outlet />
  </>
}