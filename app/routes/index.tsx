import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { getPlaceList, Place } from "~/models/place.server";
import styled from "styled-components";
import { SearchBar } from "~/components/search-bar";
import { PlaceSummary } from "~/components/place/place-summary";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return json(await getPlaceList({ name: url.searchParams.get('searchTerm') ?? '' }));
};

const Title = styled.h6`
  font-size: 3.5rem;
  margin: 0.5rem;
`;

export default function Index() {
  
  const places = useLoaderData<Place[]>();

  const searchParams = useSearchParams()[0];
  return (
    <div>
      <Title>What will you try next?</Title>
      <SearchBar defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
      {places.map((place) => (
        <PlaceSummary place={place} key={place.id} />
      ))}
      <Link to={'/about'}>About us</Link>
    </div>
  );
}