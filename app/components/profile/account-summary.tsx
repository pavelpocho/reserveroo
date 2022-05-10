import { Place, Reservable, Reservation, User } from "@prisma/client"
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"

interface AccountSummaryProps {
  user: {
    email: string,
    username: string,
    createdAt: Date
  } | null
}

const Wrap = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
  align-items: center;
  background-color: ${styles.colors.gray[10]};
`;

const Photo = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 100%;
  background-color: ${styles.colors.gray[30]};
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

export const AccountSummary: React.FC<AccountSummaryProps> = ({ user }) => {
  return user && <Wrap>
    <Photo />
    <div>
      <Title>Email</Title>
      <Value>{user?.email}</Value>
    </div>
    <div>
      <Title>Username</Title>
      <Value>{user?.username}</Value>
    </div>
    <div>
      <Title>Reserving since</Title>
      <Value>{new Date(user?.createdAt).toDateString()}</Value>
    </div>
  </Wrap>
}