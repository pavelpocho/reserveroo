import { Tag, Reservable } from '@prisma/client';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import React from 'react';
import { getTagList } from '~/models/tag.server';
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server';

interface PlacesAdminLoaderData {
  tags: Tag[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {}
}

export default function TagAdmin() {

  return <>
    <div>TAG ADMIN</div>
    <Outlet />
  </>
}