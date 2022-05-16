import { OpeningTime, Place, Reservable } from "@prisma/client";
import { Link } from "@remix-run/react";
import styled from "styled-components"
import AngleRightIcon from "~/assets/icons/AngleRight";
import AnglesRightIcon from "~/assets/icons/AnglesRight";
import ClockIcon from "~/assets/icons/Clock";
import LocationIcon from "~/assets/icons/Location";
import { styles } from "~/constants/styles";
import { UnstyledLink } from "~/root";
import { ReservableTypeWithTexts } from "~/types/types";
import { getDayOfWeek } from "~/utils/forms";
import { AvailabilityIndicator } from "../availability-indicator";
import { FacilitiesIndicator } from "./facilities-indicator";
import { PlaceImage } from "./place-image";

export const PlaceWrap = styled.div`
  background-color: ${styles.colors.gray[5]};
  margin-bottom: 2.125rem;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 11rem 1fr;
  padding: 1.875rem;
  height: 11rem;
  align-items: stretch;
  position: relative;
`;

export const PlaceName = styled(UnstyledLink)`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${styles.colors.black};
`;

export const PlaceInfoWrap = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: grid;
  gap: 0.8rem;
  grid-template-rows: 2.2rem 2.7rem 1fr;
  justify-self: stretch;
`;

const Address = styled.div`
  display: flex;
`;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FlexApart = styled(Flex)`
  justify-content: space-between;
  align-self: stretch;
`;

const BaseButton = styled(Link)`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1.8rem;
  font-size: 1rem;
  font-weight: bold;
  gap: 1.3rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  text-decoration: none;
  color: ${styles.colors.black};
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
  }
`;

const SecondaryButton = styled(BaseButton)`
  border: 1.5px solid #22222240;
  color: ${styles.colors.gray[140]};
`;

const MainButton = styled(BaseButton)`
  border: 1.5px solid ${styles.colors.action};
  background-color: ${styles.colors.action};
`;

const Time = styled.p`
  font-weight: 600;
`;

interface PlaceProps {
  place: Place & {
    openingTimes: OpeningTime[];
    reservables: Reservable & {
      ReservableType: ReservableTypeWithTexts
    }[];
  };
}

export const PlaceSummary: React.FC<PlaceProps> = ({ place }: PlaceProps) => {

  const getNextImportantTime = (place: Place & {
    openingTimes: OpeningTime[];
    reservables: Reservable & {
      ReservableType: ReservableTypeWithTexts
    }[];
  }) => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const closeToday = new Date(place.openingTimes.find(o => o.day == getDayOfWeek(new Date()))?.close ?? '');
    const openTomorrow = new Date(place.openingTimes.find(o => o.day == getDayOfWeek(tomorrow))?.open ?? '');
    
    if (new Date().getTime() > closeToday.getTime()) {
      return `Opens at ${openTomorrow.toLocaleTimeString()} tomorrow.`;
    }
    return `Closes at ${closeToday.toLocaleDateString()} today.`;
  }

  return <PlaceWrap>
    <PlaceImage shape='square' imageUrl={place.profilePicUrl} />
    <PlaceInfoWrap>
      <FlexApart>
        <PlaceName to={`/${place.id}`}>{place.name}</PlaceName>
        <Flex>
          {place.street && place.city && <>
            <LocationIcon height='1rem' />
            <Address>{<p>{place.street}, {place.city}</p>}</Address>
          </>}
        </Flex>
      </FlexApart>
      <FacilitiesIndicator reservables={place.reservables} />
      <FlexApart>
        <Flex>
          <ClockIcon height='1.25rem' />
          <Time>{getNextImportantTime(place)}</Time>
        </Flex>
        <Flex>
          <SecondaryButton to={`/${place.id}`}>See Details<AngleRightIcon height='1.25rem' /></SecondaryButton>
          <MainButton to={`/${place.id}/reserve`}>Reserve<AnglesRightIcon height='1.25rem' /></MainButton>
        </Flex>
      </FlexApart>
    </PlaceInfoWrap>
  </PlaceWrap>
}