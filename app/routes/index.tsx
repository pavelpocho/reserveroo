import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { getPlaceList, Place } from "~/models/place.server";
import styled from "styled-components";
import { SearchBar } from "~/components/search-bar";
import { PlaceSummary } from "~/components/place/place-summary";
import { styles } from "~/constants/styles";
import { Reservable } from "@prisma/client";

interface LoaderData {
  places: (Place & {
    reservables: Reservable[]
  })[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return json({ places: await getPlaceList({ name: url.searchParams.get('searchTerm') ?? '' }) });
};

const Title = styled.h6`
  font-size: 3.5rem;
  margin: 0 0 3rem 0;
  color: ${styles.colors.gray[90]};
`;

const TopSegment = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styles.colors.gray[10]};
`;

const MainSegment = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styles.colors.gray[5]};
`;

export default function Index() {
  
  const { places } = useLoaderData<LoaderData>();

  const searchParams = useSearchParams()[0];
  return (
    <div>
      <TopSegment>
        <Title>What will you try next?</Title>
        <SearchBar defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
      </TopSegment>
      <MainSegment>
        {places.map((place) => (
          <PlaceSummary place={place} key={place.id} />
        ))}
      </MainSegment>
    </div>
  );
}