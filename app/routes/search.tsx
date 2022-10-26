import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import type { Place } from "~/models/place.server";
import { getSearchPlaces } from "~/models/place.server";
import styled from "styled-components";
import { PlaceSummary } from "~/components/place/place-summary";
import { styles } from "~/constants/styles";
import type { OpeningTime, Reservable } from "@prisma/client";
import { getLocationByName, getShownLocations } from "~/models/location.server";
import { getTagList } from "~/models/tag.server";
import { getCategoryList } from "~/models/category.server";
import type { CategoryWithTexts, LocationWithEverything, ReservableTypeWithTexts, TagWithTexts } from "~/types/types";
import { IconRow } from "~/components/icon-row";
import { addToSearchHistory } from "~/models/user.server";
import { getUsernameAndAdmin } from "~/utils/session.server";
import { SearchUI } from "~/components/search/search-ui";
import { useEffect, useRef, useState } from "react";
import { IdInput } from "~/components/inputs/ObjectInput";
import { WidthRestrictor } from "~/components/other/width-restrictor";

interface LoaderData {
  locations: LocationWithEverything[],
  tags: TagWithTexts[],
  categories: CategoryWithTexts[],
  places: (Place & {
    tags: TagWithTexts[];
    openingTimes: OpeningTime[];
    reservables: Reservable & {
      ReservableType: ReservableTypeWithTexts
    }[]
  })[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const dontSave =  url.searchParams.get('dontSave');
  const searchTerm = url.searchParams.get('searchTerm');
  const location =  url.searchParams.get('selectedLocation');
  const tags = url.searchParams.getAll('tags[]');
  const categories = url.searchParams.getAll('categories[]');
  const usernameAndAdmin = await getUsernameAndAdmin(request);

  if (usernameAndAdmin.username != null && dontSave != '1') await addToSearchHistory({
    username: usernameAndAdmin.username,
    phrase: searchTerm ?? '',
    locationId: location ? (await getLocationByName({ cityCountry: location }))?.id ?? null : null,
    tagIds: tags,
    categoryIds: categories
  });

  const places = await getSearchPlaces({ name: searchTerm ?? '', cityCountry: !location || location == '' ? undefined : location, tagIds: tags, catIds: categories, itemsPerPage: 10, page: 1 });

  if (page === '1' || page == null || isNaN(parseInt(page))) {
    return json({
      places,
      locations: await getShownLocations(),
      tags: await getTagList({ nameFragment: '' }),
      categories: await getCategoryList({ nameFragment: '' }),
    });
  }

  return json({
    places: await getSearchPlaces({ name: searchTerm ?? '', cityCountry: !location || location == '' ? undefined : location, tagIds: tags, catIds: categories, itemsPerPage: 10, page: parseInt(page) })
  });
};

const Title = styled.h6`
  font-size: 1.7rem;
  margin: 0 0 1.5rem 0;
  @media (max-width: 800px) {
    padding: 0rem 2rem;
  }
`;

const TopSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styles.colors.primary};
`;

const MainSegment = styled.div`
  padding: 3rem 0;
  display: grid;
  gap: 2rem;
  align-items: flex-start;
  grid-template-columns: 22rem 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
  }
`;

const PlacesColumn = styled.div`
  flex-grow: 1;
`;

interface ScrollState {
  height: number;
  scrollY: number;
  scrollHeight: number;
}

export default function Search() {
  
  const { places: defaultPlaces, locations, tags, categories } = useLoaderData<LoaderData>();
  const [ page, setPage ] = useState(1);
  const [ places, setPlaces ] = useState(defaultPlaces);
  const [ fetching, setFetching ] = useState(false);
  const [ scrollState, setScrollState ] = useState<ScrollState>({ height: 0, scrollHeight: 0, scrollY: 0 });
  const [ reachedEnd, setReachedEnd ] = useState(false);

  const searchParams = useSearchParams()[0];
  const fetcher = useFetcher<LoaderData>();
  const fetcherForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window != 'undefined') {

      const scrollListener = () => {
        setScrollState({
          height: window.innerHeight,
          scrollHeight: document.body.scrollHeight,
          scrollY: window.scrollY
        });
      }

      window.addEventListener('scroll', scrollListener)

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', scrollListener);
        }
      };
    }
  }, []);

  useEffect(() => {
    setPlaces(defaultPlaces);
    setPage(1);
    setScrollState({ height: 0, scrollHeight: 0, scrollY: 0 });
    setReachedEnd(false);
    window.scrollTo({ top: 0 });
  }, [defaultPlaces, locations, tags, categories]);

  useEffect(() => {
    if (scrollState.height + scrollState.scrollY > scrollState.scrollHeight && !fetching && !reachedEnd) {
      setPage(page + 1);
      setFetching(true);
    }
  }, [scrollState]);

  useEffect(() => {
    if (fetcherForm.current) {
      fetcher.submit(fetcherForm.current);
    }
  }, [page]);

  useEffect(() => {
    if (fetcher.data?.places && page != 1) {
      if (fetcher.data.places.length == 0) {
        setReachedEnd(true);
      }
      setPlaces([...places, ...fetcher.data?.places]);
      setScrollState({
        ...scrollState,
        scrollHeight: document.body.scrollHeight
      })
    }
  }, [fetcher.data]);

  useEffect(() => {
    setFetching(false);
  }, [places]);

  const locationCityCountry = searchParams.get('selectedLocation');
  const tagIds = searchParams.getAll('tags[]');
  const categoryIds = searchParams.getAll('categories[]');
  const searchTerm = searchParams.get('searchTerm');

  return (
    <div key={searchTerm + tagIds.join(',') + categoryIds.join(',') + locationCityCountry}>
      <TopSegment>
        <IconRow />
      </TopSegment>
      <WidthRestrictor width={'1368px'}>
      { /* Fetcher used for paging*/}
        <fetcher.Form style={{ visibility: 'hidden' }} ref={fetcherForm} method='get'>
          <IdInput name='page' value={page.toString()} />
          <IdInput name='dontSave' value={'1'} />
          <IdInput name='searchTerm' value={searchTerm ?? ''} />
          { categoryIds.map(c => <IdInput name='categories[]' value={c} />) }
          { tagIds.map(t => <IdInput name='tags[]' value={t} />) }
          <IdInput name='selectedLocation' value={locationCityCountry ?? ''} />
        </fetcher.Form>
        <MainSegment>
          <SearchUI
            searchParams={searchParams}
            locations={locations}
            tags={tags}
            categories={categories}
            narrowView={true}
          />
          <PlacesColumn>
            <Title>Search Results</Title>
            {places.filter(p => !p.hidden).map((place) => (
              <PlaceSummary place={place} key={place.id} inSearch={true} />
            ))}
          </PlacesColumn>
        </MainSegment>
      </WidthRestrictor>
    </div>
  );
}