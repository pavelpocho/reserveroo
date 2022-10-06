import { Outlet } from "@remix-run/react";
import { ActionFunction } from "@remix-run/server-runtime";
import styled from "styled-components";
import { getReservationGroupForConfirmationEmail, setRGAttendance } from "~/models/reservationGroup.server";

const Wrap = styled.div`
  
`;

export default function ReservationsAdmin() {
  return <Wrap>
    <Outlet />
  </Wrap>
}