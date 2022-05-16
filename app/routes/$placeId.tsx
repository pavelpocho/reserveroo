import { OpeningTime, Reservable } from "@prisma/client";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime";
import React from "react";
import { useRoutes } from "react-router";
import styled from "styled-components";
import ClockIcon from "~/assets/icons/Clock";
import LocationIcon from "~/assets/icons/Location";
import { AvailabilityIndicator } from "~/components/availability-indicator";
import { FacilitiesIndicator } from "~/components/place/facilities-indicator";
import { PlaceImage } from "~/components/place/place-image";
import { getNextImportantTime } from "~/components/place/place-summary";
import { TagList } from "~/components/place/tag-list";
import { styles } from "~/constants/styles";
import { getPlace, Place } from "~/models/place.server";
import { ReservableTypeWithTexts, TagWithTexts } from "~/types/types";
import { getImageFromS3 } from "~/utils/s3.server";
import { ActiveHighlighter, AuthTabLink, Separator, TabBar } from "./authenticate";

interface LoaderData {
  place: Place & {
    openingTimes: OpeningTime[],
    tags: TagWithTexts[],
    reservables: Reservable & {
      ReservableType: ReservableTypeWithTexts
    }[]
  },
  imageUrl: string | undefined
}

export const loader: LoaderFunction = async ({ params }) => {
  const place = await getPlace({ id: params.placeId ?? '' });
  return json({ place, imageUrl: place?.profilePicUrl });
}

const Banner = styled.div`
  padding: 2rem 0rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${styles.colors.gray[5]};
`;

const PlaceInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaceName = styled(Link)`
  color: ${styles.colors.black};
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
`;

const LocationInfoWrap = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LocationText = styled.p`
  margin: 0px;
`;

const OuterFlex = styled.div`
  display: grid;
  grid-template-columns: 9rem 1fr;
  height: 9rem;
  gap: 2rem;
  max-width: 938px;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Time = styled.p`
  font-weight: 600;
`;

const GeneralInfoWrap = styled.div`
  display: grid;
  gap: 0.8rem;
  align-items: stretch;
  grid-template-rows: repeat(3, 1fr);
`;

export default function PlaceDetail() {

  const { place, imageUrl } = useLoaderData<LoaderData>();
  const [ position, setPosition ] = React.useState<number>(0);

  return <>
    <Banner>
      <OuterFlex>
        <PlaceImage shape='circle' imageUrl={imageUrl} />
        <PlaceInfoWrap>
          <GeneralInfoWrap>
            <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
            {/* <AvailabilityIndicator color='free' /> */}
            <FacilitiesIndicator reservables={place.reservables} />
            <TagList tags={place.tags} />
          </GeneralInfoWrap>
          <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
            <LocationInfoWrap>
              <LocationIcon height={'1.25rem'} />
              <LocationText>{place.street}, {place.city}</LocationText>
            </LocationInfoWrap>
            <Flex>
              <ClockIcon height='1.25rem' />
              <Time>{getNextImportantTime(place)}</Time>
            </Flex>
          </div>
        </PlaceInfoWrap>
      </OuterFlex>
    </Banner>
    <Outlet />
  </>
}