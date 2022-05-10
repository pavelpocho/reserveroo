import styled from "styled-components";
import { Reservable } from "~/models/reservable.server"

interface FacilitiesIndicatorProps {
  reservables: Reservable[]
}

const Wrap = styled.div`
  display: flex;
  gap: 2rem;
`;

export const FacilitiesIndicator: React.FC<FacilitiesIndicatorProps> = ({ reservables }) => {
  return <Wrap>{
    reservables.map((r) => <p key={r.id}>{r.name}</p>)
  }</Wrap>
}