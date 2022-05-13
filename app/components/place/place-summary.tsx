import { Place, Reservable } from "@prisma/client";
import { Link } from "@remix-run/react";
import styled from "styled-components"
import { styles } from "~/constants/styles";
import { UnstyledLink } from "~/root";
import { AvailabilityIndicator } from "../availability-indicator";
import { FacilitiesIndicator } from "./facilities-indicator";
import { PlaceImage } from "./place-image";

export const PlaceWrap = styled.div`
  width: 80%;
  max-width: 1000px;
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[0]};
  margin-top: 2rem;
  border: ${styles.colors.gray[20]};
  border-radius: 0.6rem;
  display: flex;
  position: relative;
  padding: 1rem;
`;

export const PlaceName = styled(UnstyledLink)`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${styles.colors.black};
`;

export const PlaceInfoWrap = styled.div`
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: grid;
  grid-template-rows: 2rem 1.5rem 1fr;
`;

interface PlaceProps {
  place: Place & {
    reservables: Reservable[]
  }
}

export const PlaceSummary: React.FC<PlaceProps> = ({ place }: PlaceProps) => {
  return <PlaceWrap>
    <PlaceImage shape='square' imageUrl={place.profilePicUrl} />
    <PlaceInfoWrap>
      <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
      <AvailabilityIndicator color='free' />
      <FacilitiesIndicator reservables={place.reservables} />
    </PlaceInfoWrap>
  </PlaceWrap>
}