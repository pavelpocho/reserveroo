import { Reservable } from "@prisma/client";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react"
import { json, LoaderFunction } from "@remix-run/server-runtime";
import { useRoutes } from "react-router";
import styled from "styled-components";
import { AvailabilityIndicator } from "~/components/availability-indicator";
import { FacilitiesIndicator } from "~/components/place/facilities-indicator";
import { PlaceImage } from "~/components/place/place-image";
import { PlaceInfoWrap, PlaceName } from "~/components/place/place-summary";
import { styles } from "~/constants/styles";
import { getPlace, Place } from "~/models/place.server";
import { getImageFromS3 } from "~/utils/s3.server";

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
  height: 20rem;
  width: 100%;
  display: flex;
  background-color: ${styles.colors.gray[10]};
`;

export default function PlaceDetail() {

  const { place, imageUrl } = useLoaderData<LoaderData>();

  return <>
    <Banner>
      <PlaceImage shape='circle' imageUrl={imageUrl} />
      <PlaceInfoWrap>
        <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
        <AvailabilityIndicator color='free' />
        <FacilitiesIndicator reservables={place.reservables} />
      </PlaceInfoWrap>
    </Banner>
    <Link to={`/${place.id}/`}>Details</Link>
    <Link to={`/${place.id}/reserve`}>Reserve</Link>
    <Outlet />
  </>
}