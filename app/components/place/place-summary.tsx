import { OpeningTime, Place, Reservable } from "@prisma/client";
import { Link } from "@remix-run/react";
import styled from "styled-components"
import AngleRightIcon from "~/assets/icons/AngleRight";
import AnglesRightIcon from "~/assets/icons/AnglesRight";
import ClockIcon from "~/assets/icons/Clock";
import LocationIcon from "~/assets/icons/Location";
import { styles } from "~/constants/styles";
import { UnstyledLink } from "~/root";
import { ReservableTypeWithTexts, TagWithTexts } from "~/types/types";
import { getDayOfWeek } from "~/utils/forms";
import { AvailabilityIndicator } from "../availability-indicator";
import { FacilitiesIndicator } from "./facilities-indicator";
import { PlaceImage } from "./place-image";
import { TagList } from "./tag-list";

export const PlaceWrap = styled.div`
  background-color: ${styles.colors.gray[5]};
  margin-bottom: 2.125rem;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 11rem 1fr;
  padding: 0.6rem 1.475rem;
  min-height: 11rem;
  align-items: center;
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
  grid-template-rows: 2rem 2rem 2rem 1fr;
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
  padding: 0.6rem 1.6rem;
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

export const SecondaryButton = styled(BaseButton)`
  border: 1.5px solid #22222240;
  color: ${styles.colors.gray[140]};
`;

export const MainButton = styled(BaseButton)`
  border: 1.5px solid ${styles.colors.action};
  background-color: ${styles.colors.action};
`;

const BaseButtonBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1.6rem;
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

export const SecondaryButtonBtn = styled(BaseButtonBtn)`
  border: 1.5px solid #22222240;
  color: ${styles.colors.gray[140]};
`;

export const MainButtonBtn = styled(BaseButtonBtn)`
  border: 1.5px solid ${styles.colors.action};
  background-color: ${styles.colors.action};
`;

const Time = styled.p`
  font-weight: 600;
`;

interface PlaceProps {
  place: Place & {
    tags: TagWithTexts[];
    openingTimes: OpeningTime[];
    reservables: Reservable & {
      ReservableType: ReservableTypeWithTexts
    }[];
  };
}

export const getNextImportantTime = (place: Place & {
  openingTimes: OpeningTime[];
  reservables: Reservable & {
    ReservableType: ReservableTypeWithTexts
  }[];
}) => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const closeToday = new Date(place.openingTimes.find(o => o.day == getDayOfWeek(new Date()))?.close ?? '');
  const openTomorrow = new Date(place.openingTimes.find(o => o.day == getDayOfWeek(tomorrow))?.open ?? '');
  
  if (new Date().getHours() * 60 + new Date().getMinutes() > closeToday.getHours() * 60 + closeToday.getMinutes()) {
    return `Opens at ${openTomorrow.toLocaleTimeString()} tomorrow.`;
  }
  return `Closes at ${closeToday.toLocaleTimeString()} today.`;
}

export const PlaceSummary: React.FC<PlaceProps> = ({ place }: PlaceProps) => {

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
      <TagList tags={place.tags} />
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