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
import { CategoryWithTexts, LocationWithEverything, LocationWithTexts, TagWithTexts } from "~/types/types";
import { WidthRestrictor } from "~/root";
import { IconRow } from "~/components/icon-row";

interface LoaderData {
  locations: LocationWithEverything[],
  tags: TagWithTexts[],
  categories: CategoryWithTexts[],
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
    places: await getPlaceList({ name: searchTerm ?? '', cityCountry: !location || location == '' ? undefined : location, tagIds: tags, catIds: categories }),
    locations: await getAllLocations(),
    tags: await getTagList({ nameFragment: '' }),
    categories: await getCategoryList({ nameFragment: '' }),
  });
};

const Title = styled.h6`
  font-size: 2.625rem;
  text-align: center;
  margin: 0 0 1.625rem 0;
  color: ${styles.colors.white};
`;

const TopSegment = styled.div`
  padding: 3.75rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${styles.colors.primary};
  overflow-x: hidden;
`;

const MainSegment = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styles.colors.gray[5]};
`;

export default function Places() {
  
  const { places, locations, tags, categories } = useLoaderData<LoaderData>();

  const searchParams = useSearchParams()[0];
  return (
    <div>
      <TopSegment>
        <WidthRestrictor> 
          <Title>Book a spot anywhere. Right here.</Title>
          <IconRow />
          <SearchUI
            searchParams={searchParams}
            locations={locations}
            tags={tags}
            categories={categories}
          />
        </WidthRestrictor>
      </TopSegment>
      <MainSegment>
        {places.filter(p => !p.hidden).map((place) => (
          <PlaceSummary place={place} key={place.id} />
        ))}
      </MainSegment>
    </div>
  );
}