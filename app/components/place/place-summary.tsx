import { Place } from "@prisma/client";
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
  background-color: ${styles.colors.gray[10]};
  border: ${styles.colors.gray[20]};
  border-radius: 8px;
  display: flex;
  padding: 1rem 2rem;
`;

export const PlaceName = styled(UnstyledLink)`
  font-size: 1.8rem;
  color: ${styles.colors.black};
`;

export const PlaceInfoWrap = styled.div`
  background-color: white;
  border-radius: 4px;
`;

interface PlaceProps {
  place: Place
}

export const PlaceSummary: React.FC<PlaceProps> = ({ place }: PlaceProps) => {
  return <PlaceWrap>
    <PlaceImage shape='square' />
    <PlaceInfoWrap>
      <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
      <AvailabilityIndicator color='free' />
      <FacilitiesIndicator />
    </PlaceInfoWrap>
  </PlaceWrap>
}