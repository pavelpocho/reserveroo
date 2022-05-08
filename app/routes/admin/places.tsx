import { Company } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime'
import { getAllPlaces, getPlaceList, Place } from '~/models/place.server'

interface PlacesAdminLoaderData {
  places: (Place & {
    Company: Company | null;
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
        <p>Name (Company): {p.name} ({p.Company?.name})</p>
      </div>) }
    </div>
  </>
}