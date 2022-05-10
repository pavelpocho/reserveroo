import { Company, Reservable } from '@prisma/client';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import React from 'react';
import { getCompanyList } from '~/models/company.server';
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server';

interface PlacesAdminLoaderData {
  companies: Company[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {}
}

export default function CompaniesAdmin() {

  const { companies } = useLoaderData<PlacesAdminLoaderData>();

  return <>
    <div>COMPANY ADMIN</div>
    <Outlet />
  </>
}