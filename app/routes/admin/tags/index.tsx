import { Company, Reservable, Tag } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import React from 'react';
import { getCompanyList } from '~/models/company.server';
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server';
import { getAllTags } from '~/models/tag.server';

interface TagsAdminLoaderData {
  tags: Tag[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const tags = await getAllTags();
  return { tags }
}

export default function CompaniesAdminIndex() {

  const { tags } = useLoaderData<TagsAdminLoaderData>();

  return <>
    <div>
      { tags.map(t => <div key={t.id}>
        <p>Name: {t.name}</p>
        <p>Description: {t.description}</p>
        <Link to={`/admin/tags/${t.id}`}>View / Edit</Link>
      </div>) }
      <Link to={'/admin/tags/new'} >New tag</Link>
    </div>
  </>
}