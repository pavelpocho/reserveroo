import { Company, Place, Reservable, Reservation, ReservationGroup, User } from "@prisma/client"
import { Form, Link } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"
import { Button } from "../button";
import { IdInput } from "../inputs/ObjectInput";
import { SingleSelectorInput } from "../inputs/SingleSelectorInput";
import { ReservationSummary } from "../profile/reservation-summary"
import { AdminReservationSummary } from "./reservation-summary";

interface ReservationGroupSummaryProps {
  reservationGroup: (ReservationGroup & {
    user: User | null;
    reservations: (Reservation & {
        reservable: (Reservable & {
            place: (Place & {
              company: Company | null;
            });
        }) | null;
    })[];
  });
}

const Title = styled.h5`
  margin: 0;
  font-size: 1.2rem;
`;

const InfoTitle = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 1.5rem;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

const SummaryInfoWrap = styled.div`
  display: flex;
  gap: 2rem;
`;

const Wrap = styled.div`
  display: flex;
  overflow: hidden;
  transition:
    height 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    padding 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    margin 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  box-shadow: ${styles.shadows[0]};
  border-radius: 0.6rem;
  background-color: ${styles.colors.white};
  padding: 1.3rem 1rem;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1rem;
  &>* {
    flex-shrink: 0;
  }
`;

const UpdateStatus = styled.button`
  display: block;
  margin: 1rem 0rem;
`;

const InnerWrap = styled.div`
`;

export const AdminReservationGroupSummary: React.FC<ReservationGroupSummaryProps> = ({ reservationGroup: rg }) => {

  const ref = React.useRef<HTMLDivElement>(null);

  const actions = [{
    text: "Confirm preferred",
    value: "confirm_preferred",
  }, {
    text: "Set as unavailable",
    value: "unavailable",
  }];

  const attendedOptions = [{
    text: "Yes",
    value: 't',
  }, {
    text: "No",
    value: 'f',
  }];

  if (!!rg.reservations.find(r => r.backup)) {
    actions.push({
      text: "Confirm backup",
      value: "confirm_backup",
    });
  }

  return <>
    <Wrap key={rg.id} ref={ref}>
      <InnerWrap>
        <Title>{rg.user?.username}</Title>
        { rg.reservations.map(r => <div key={r.id}>
          <AdminReservationSummary reservation={r} />
        </div>) }
        <SummaryInfoWrap>
          <div>
            <InfoTitle>Created</InfoTitle>
            <Value>{new Date(rg.createdAt).toDateString()}, {new Date(rg.createdAt).toTimeString()}</Value>
          </div>
          <div>
            <InfoTitle>Note to business</InfoTitle>
            <Value>{rg.note}</Value>
          </div>
        </SummaryInfoWrap>
        { rg.reservations.length > 0 && !rg.reservations.find(r => r.status == ReservationStatus.Cancelled || r.status == ReservationStatus.Confirmed || r.status == ReservationStatus.Rejected) && <Form method='post' action='/admin/reservations?index'>
          <SingleSelectorInput name='action' possibleValuesAndTexts={actions} defaultValueAndText={null} />
          <IdInput name='rgId' value={rg.id} />
          <p>Select a status in the input above and then hit "Update status". This WILL SEND AN EMAIL to the user!</p>
          <UpdateStatus>Update status</UpdateStatus>
        </Form> }
        { <Form method='post' action='/admin/reservations/setAttendance' >
          <SingleSelectorInput name='attended' possibleValuesAndTexts={attendedOptions} defaultValueAndText={{ text: rg.attended === true ? 'Yes' : rg.attended === false ? 'No' : 'Unset', value: rg.attended === true ? 't' : rg.attended === false ? 'f' : ''}} />
          <IdInput name='rgId' value={rg.id} />
          <p>Select an attendance if we for example know a person didn't show up...</p>
          <UpdateStatus>Update attendance</UpdateStatus>
        </Form> }
        <Link to={`/admin/reservations/${rg.id}`}>Edit</Link>
      </InnerWrap>
    </Wrap>
  </>
}