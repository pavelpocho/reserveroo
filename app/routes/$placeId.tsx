import { useLoaderData, useParams } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/server-runtime";
import { getPlace, Place } from "~/models/place.server";

export const loader: LoaderFunction = async ({ params }) => {
  return getPlace({ id: parseInt(params.placeId ?? '') })
}

export default function PlaceDetail() {

  const place = useLoaderData<Place>();

  return (
    <div>
      {place.id}
      {place.name}
    </div>
  )
}