import { Company, Reservable } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import React from 'react';
import { getCompanyList } from '~/models/company.server';
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server';

interface PlacesAdminLoaderData {
  companies: Company[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const companies = await getCompanyList({ name: params.companyId ?? '' });
  return { companies }
}

export default function CompaniesAdminIndex() {

  const { companies } = useLoaderData<PlacesAdminLoaderData>();

  return <>
    <div>
      { companies.map(c => <div key={c.id}>
        <p>Name: {c.name}</p>
        <Link to={`/admin/companies/${c.id}`}>View / Edit</Link>
      </div>) }
      <Link to={'/admin/companies/new'} >New company</Link>
    </div>
  </>
}