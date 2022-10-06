import { Company, Place, Reservable, Reservation, User } from "@prisma/client"
import { Form } from "@remix-run/react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"
import { getStringTimeValue } from "~/utils/forms";
import { IdInput } from "../inputs/ObjectInput";

interface UserSummaryProps {
  user: {
    username: string,
    reservationGroups: {
        attended: boolean;
    }[]
  }
}

const Wrap = styled.div`
  display: flex;
  gap: 2rem;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 1rem;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

const Card = styled.div`
  margin: 0.2rem;
  width: 100%;
  padding: 1rem;
`;

export const UserReservationSummary: React.FC<UserSummaryProps> = ({ user }) => {

  const attended = user.reservationGroups.filter(g => g.attended === true).length;
  const missed = user.reservationGroups.filter(g => g.attended === false).length;
  const total = user.reservationGroups.length;

  return <Wrap>
    <Card>
      <Title>{user.username}</Title>
      <Value>Attended: { attended }</Value>
      <Value>Missed: { missed }</Value>
      <Value>Unknown: { total - missed - attended }</Value>
      <Value>Total: { total }</Value>
    </Card>
  </Wrap>
}