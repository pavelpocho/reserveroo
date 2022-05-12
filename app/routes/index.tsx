import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { getPlaceList, Place } from "~/models/place.server";
import styled from "styled-components";
import { SearchBar } from "~/components/search/search-bar";
import { PlaceSummary } from "~/components/place/place-summary";
import { styles } from "~/constants/styles";
import { Category, Location, Reservable, Tag } from "@prisma/client";
import { SearchUI } from "~/components/search/search-ui";
import { getAllLocations } from "~/models/location.server";
import { getTagList } from "~/models/tag.server";
import { getCategoryList } from "~/models/category.server";

interface LoaderData {
  locations: Location[],
  tags: Tag[],
  categories: Category[],
  places: (Place & {
    reservables: Reservable[]
  })[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm');
  const location =  url.searchParams.get('selectedLocation');
  const tags = url.searchParams.getAll('tags[]');
  const categories = url.searchParams.getAll('categories[]');

  return json({
    places: await getPlaceList({ name: searchTerm ?? '', cityCountry: !location || location == '' ? undefined : location, tagNames: tags, catNames: categories }),
    locations: await getAllLocations(),
    tags: await getTagList({ name: '' }),
    categories: await getCategoryList({ name: '' }),
  });
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
  
  const { places, locations, tags, categories } = useLoaderData<LoaderData>();

  const searchParams = useSearchParams()[0];
  return (
    <div>
      <TopSegment>
        <Title>What will you try next?</Title>
        <SearchUI
          searchParams={searchParams}
          locations={locations}
          tags={tags}
          categories={categories}
        />
      </TopSegment>
      <MainSegment>
        {places.map((place) => (
          <PlaceSummary place={place} key={place.id} />
        ))}
      </MainSegment>
    </div>
  );
}