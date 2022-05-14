import { Reservable } from "@prisma/client";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime";
import React from "react";
import { useRoutes } from "react-router";
import styled from "styled-components";
import LocationIcon from "~/assets/icons/Location";
import { AvailabilityIndicator } from "~/components/availability-indicator";
import { FacilitiesIndicator } from "~/components/place/facilities-indicator";
import { PlaceImage } from "~/components/place/place-image";
import { styles } from "~/constants/styles";
import { getPlace, Place } from "~/models/place.server";
import { getImageFromS3 } from "~/utils/s3.server";
import { ActiveHighlighter, AuthTabLink, Separator, TabBar } from "./authenticate";

interface LoaderData {
  place: Place & {
    reservables: Reservable[]
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
  position: sticky;
  top: 4rem;
  background-color: ${styles.colors.white};
`;

const PlaceInfoWrap = styled.div`
  display: flex;
  width: 30rem;
  max-width: 768px;
  flex-direction: column;
  justify-content: center;
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

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function PlaceDetail() {

  const { place, imageUrl } = useLoaderData<LoaderData>();
  const [ position, setPosition ] = React.useState<number>(0);

  return <>
    <Banner>
      <Flex>
        <PlaceImage shape='circle' imageUrl={imageUrl} />
        <PlaceInfoWrap>
          <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
          {/* <AvailabilityIndicator color='free' /> */}
          <FacilitiesIndicator reservables={place.reservables} />
        </PlaceInfoWrap>
        <LocationInfoWrap>
          <LocationIcon height={'1.5rem'} />
          <LocationText>{place.street}, {place.city}</LocationText>
        </LocationInfoWrap>
      </Flex>
      <TabBar>
        <ActiveHighlighter position={position} />
        <AuthTabLink onClick={() => {setPosition(0)}} to={`/${place.id}/`}>Details</AuthTabLink>
        <Separator />
        <AuthTabLink onClick={() => {setPosition(1)}} to={`/${place.id}/reserve`}>Reserve</AuthTabLink>
      </TabBar>
    </Banner>
    <Outlet />
  </>
}