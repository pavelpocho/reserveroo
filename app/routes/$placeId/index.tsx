import { OpeningTime } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { getPlace, Place } from "~/models/place.server";
import { Reservable } from "~/models/reservable.server";

const Wrap = styled.div`
  background-color: ${styles.colors.gray[10]};
`;

interface PlaceDetailsLoaderData {
  place: (Place & {
    reservables: Reservable[];
    openingTimes: OpeningTime[];
  })
}

export const loader: LoaderFunction = async ({ params }) => {
  return json({ place: await getPlace({ id: params.placeId ?? '' }) });
}

const GalleryImage = styled.img`
  object-fit: cover;
  width: 20rem;
  height: 20rem;
`;

export default function PlaceDetails({}) {

  const { place } = useLoaderData<PlaceDetailsLoaderData>();

  const timeStr = (date: Date) => {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return <Wrap>
    <p>Details about the business</p>
    <p>Opening hours</p>
    { place.openingTimes ? place.openingTimes.sort((a, b) => a.day - b.day).map(o => <div key={o.id} >
      <p>{daysOfWeek[o.day]}: {timeStr(o.open)} - {timeStr(o.close)}</p>
    </div>) : null }
    <p>Details about whats there and whatnot</p>
    <p>{place.description}</p>
    {place.galleryPicUrls.map((p, i) => <GalleryImage key={i} src={p} />)}
  </Wrap>
}