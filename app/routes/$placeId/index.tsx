import { OpeningTime } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { getPlace, Place } from "~/models/place.server";
import { Reservable } from "~/models/reservable.server";

const Wrap = styled.div`
  background-color: ${styles.colors.gray[5]};
  padding: 2rem;
  border-radius: 1.5rem;
  margin-top: 2rem;
`;

const Title = styled.h4`
  font-size: 1.4rem;
`;

const Desc = styled.p`

`;

const OpeningTime = styled.p`
  font-size: 0.95rem;
  margin: 0.9rem;
  &::first-letter {
    text-transform:capitalize;
  }
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

const Gallery = styled.div`
  overflow-x: scroll;
  width: 100%;
  white-space: nowrap;
`;

export default function PlaceDetails({}) {

  const { place } = useLoaderData<PlaceDetailsLoaderData>();

  const timeStr = (date: Date) => {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return <Wrap>
    <Title>Description</Title>
    <Desc>{place.description}</Desc>
    <Title>Opening hours</Title>
    { place.openingTimes ? place.openingTimes.sort((a, b) => a.day - b.day).map(o => <div key={o.id} >
      <OpeningTime><strong>{daysOfWeek[o.day]}:</strong> {timeStr(o.open)} - {timeStr(o.close)}</OpeningTime>
    </div>) : null }
    <Title>How do I get there?</Title>
    <Desc>{place.howToGetThere}</Desc>
    <Title>Photos</Title>
    <Gallery>
      {place.galleryPicUrls.map((p, i) => <GalleryImage key={i} src={p} />)}
    </Gallery>
  </Wrap>
}