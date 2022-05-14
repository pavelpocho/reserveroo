import { Place, Reservable, Reservation, ReservationGroup } from "@prisma/client"
import { Form } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"
import { Button } from "../button";
import { ConfirmationDialog } from "../confirmation-dialog";
import { IdInput } from "../inputs/ObjectInput";
import { ReservationSummary } from "./reservation-summary"

interface ReservationGroupSummaryProps {
  reservationGroup: (ReservationGroup & {
    reservations: (Reservation & {
      reservable: (Reservable & {
        place: Place
      }) | null;
    })[];
  }),
  onCancel: (reservationGroupId: string, formRef: HTMLFormElement) => void
}

const Title = styled.h5`
  margin: 0;
  font-size: 1.2rem;
`;

const NoteTitle = styled.p`
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

const InnerWrap = styled.div`
`;

export const ReservationGroupSummary: React.FC<ReservationGroupSummaryProps> = ({ reservationGroup: rg, onCancel }) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [ showConfirmation, setShowConfirmation ] = React.useState<boolean>(false);

  const cancelReservation = () => {
    if (ref.current) {
      ref.current.style.height = `${ref.current.clientHeight - parseFloat(window.getComputedStyle(ref.current).paddingTop) - parseFloat(window.getComputedStyle(ref.current).paddingBottom)}px`;
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.height = '0px';
          ref.current.style.paddingTop = '0px';
          ref.current.style.marginTop = '0px';
          ref.current.style.opacity = '0';
          ref.current.style.paddingBottom = '0px';
        }
      }, 100);
    }
    if (formRef.current) onCancel(rg.id, formRef.current);
  }

  return <>
    <ConfirmationDialog
      title='Confirm cancellation' 
      text='Are you sure you want to cancel your reservation? (This cannot be undone!)'
      hidden={!showConfirmation}
      onConfirm={() => {
        cancelReservation();
      }}
      close={() => {
        setShowConfirmation(false);
      }}
      confirmText={'Cancel my reservation'}
      cancelText={'Keep my reservation'}
    />
    <Wrap key={rg.id} ref={ref}>
      <InnerWrap>
        <Title>{rg.reservations.length > 0 ? rg.reservations[0].reservable?.place.name : 'Reservation'}</Title>
        { rg.reservations.map(r => <div key={r.id}>
          <ReservationSummary reservation={r} />
        </div>) }
        <div>
          <NoteTitle>Note to business</NoteTitle>
          <Value>{rg.note}</Value>
        </div>
      </InnerWrap>
      <Button onClick={(e) => {
        setShowConfirmation(true);
      }}>Cancel reservation</Button>
    </Wrap>
    <Form ref={formRef} method='post' action='/profile/cancelReservation'>
      <IdInput name='rgId' value={rg.id} />
    </Form>
  </>
}