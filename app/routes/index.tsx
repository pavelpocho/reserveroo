import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import { getPlaceList, Place } from "~/models/place.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await getPlaceList();
};

export default function Index() {
  const places = useLoaderData<Place[]>();
  console.log(places);
  return (
    <div>
      <h6>Hello. See places here:</h6>
      {places.map((place) => (
        <div key={place.id}><Link to={`/${place.id}`}>{place.name}</Link></div>
      ))}
      <Link to={'/about'}>About us</Link>
    </div>
  );
}