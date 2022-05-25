import { Place, Reservable, Reservation, ReservationGroup } from "@prisma/client"
import { Form, Link } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservableTypeWithTexts, ReservationStatus as R } from "~/types/types"
import { Button } from "../button";
import { ConfirmationDialog } from "../confirmation-dialog";
import InfoButton from "../info-button";
import { IdInput } from "../inputs/ObjectInput";
import { PlaceImage } from "../place/place-image";
import { SecondaryButtonBtn } from "../place/place-summary";
import { ReservationSummary } from "./reservation-summary"

interface ReservationGroupSummaryProps {
  reservationGroup: (ReservationGroup & {
    reservations: (Reservation & {
      reservable: (Reservable & {
        place: Place,
        ReservableType: ReservableTypeWithTexts
      }) | null;
    })[];
  }),
  onCancel: (reservationGroupId: string, formRef: HTMLFormElement) => void
}

const Title = styled(Link)`
  margin: 0;
  font-weight: bold;
  text-decoration: none;
  color: ${styles.colors.black};
  font-size: 1.2rem;
`;

const NoteTitle = styled.p`
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

const Wrap = styled.div`
  display: grid;
  grid-template-rows: 9rem auto;
  @media (min-width: 550px) {
    grid-template-rows: unset;
    grid-template-columns: 11rem auto;
  }
  overflow: hidden;
  gap: 0.87rem;
  transition:
    height 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    padding 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    margin 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  border-radius: 0.6rem;
  background-color: ${styles.colors.gray[5]};
  padding: 1.3rem 1rem;
  margin-top: 1rem;
  /* &>* {
    flex-shrink: 0;
  } */
`;

const CancelWrap = styled.div`
  width: 100%;
  @media (min-width: 550px) {
    width: auto;
    align-self: flex-end;
  }
`;

const TitleStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SlotTitle = styled.p`
  margin: 0;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.87rem;
  align-items: flex-start;
`;

const Status = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 0.25rem;
  margin: 0;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${styles.colors.gray[30]};
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

  const prefs = rg.reservations.filter(r => !r.backup).length;
  const backups = rg.reservations.filter(r => r.backup).length;
  console.log(rg);
  // Options: 
  // Just main option       Waiting
  // Just main option       Confirmed
  // Just main option       Unavailable
  // Main + backup option       Waiting
  // Main + backup option       Main confirmed
  // Main + backup option       Backup confirmed
  // Main + backup option       Unavailable
  const prefStatus = rg.reservations.filter(r => !r.backup)[prefs - 1].status;
  const backupStatus = backups > 0 ? rg.reservations.filter(r => r.backup)[backups - 1].status : null;
  const text = (
    prefStatus == R.AwaitingConfirmation || backupStatus == R.AwaitingConfirmation ? 'Awaiting confirmation' : 
    prefStatus == R.Confirmed && backupStatus == null ? 'Confirmed' : 
    prefStatus == R.Rejected && backupStatus == null ? 'Unavailable' : 
    prefStatus == R.Confirmed && backupStatus == R.Cancelled ? 'Preferred Confirmed' : 
    prefStatus == R.Rejected && backupStatus == R.Confirmed ? 'Backup Confirmed' : 
    prefStatus == R.Rejected && backupStatus == R.Rejected ? 'Unavailable' :
    prefStatus == R.Cancelled && backupStatus == R.Cancelled ? 'Cancelled' : ''
  );

  const backgroundColor = (
    prefStatus == R.AwaitingConfirmation || backupStatus == R.AwaitingConfirmation ? styles.colors.warn : 
    prefStatus == R.Confirmed && backupStatus == null ? styles.colors.free : 
    prefStatus == R.Rejected && backupStatus == null ? styles.colors.busy : 
    prefStatus == R.Confirmed && backupStatus == R.Cancelled ? styles.colors.free : 
    prefStatus == R.Rejected && backupStatus == R.Confirmed ? styles.colors.free : 
    prefStatus == R.Rejected && backupStatus == R.Rejected ? styles.colors.busy : 
    prefStatus == R.Cancelled && backupStatus == R.Cancelled ? styles.colors.gray[70] : ''
  );

  const color = (
    prefStatus == R.AwaitingConfirmation || backupStatus == R.AwaitingConfirmation ? styles.colors.black : 
    prefStatus == R.Confirmed && backupStatus == null ? styles.colors.black : 
    prefStatus == R.Rejected && backupStatus == null ? styles.colors.white : 
    prefStatus == R.Confirmed && backupStatus == R.Cancelled ? styles.colors.black : 
    prefStatus == R.Rejected && backupStatus == R.Confirmed ? styles.colors.black : 
    prefStatus == R.Rejected && backupStatus == R.Rejected ? styles.colors.white : 
    prefStatus == R.Cancelled && backupStatus == R.Cancelled ? styles.colors.black : ''
  );

  const helpText = (
    prefStatus == R.AwaitingConfirmation || backupStatus == R.AwaitingConfirmation ? 'We are confirming your reservation with the business.' : 
    prefStatus == R.Confirmed && backupStatus == null ? 'Your timeslot is confirmed. Enjoy!' : 
    prefStatus == R.Rejected && backupStatus == null ? 'Your timeslot is unfortunately unavailable. You can try booking a different time though!' : 
    prefStatus == R.Confirmed && backupStatus == R.Cancelled ? 'Your preferred timeslot is confirmed. Enjoy!' : 
    prefStatus == R.Rejected && backupStatus == R.Confirmed ? 'Your BACKUP timeslot is confirmed. It is highlighed below. Enjoy!' : 
    prefStatus == R.Rejected && backupStatus == R.Rejected ? 'Your timeslots are unfortunately unavailable. You can try booking a different time though!' : 
    prefStatus == R.Cancelled && backupStatus == R.Cancelled ? 'You have cancelled this booking.' : ''
  )

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
      <PlaceImage shape='square' imageUrl={rg.reservations[0].reservable?.place.profilePicUrl} />
      <InnerWrap>
        <TitleStatus>
        <Title to={`/${rg.reservations[0].reservable?.place.id}`}>{rg.reservations.length > 0 ? rg.reservations[0].reservable?.place.name : 'Reservation'}</Title>
          <Status style={{
            backgroundColor: backgroundColor,
            color: color,
          }}>
            {text}
          <InfoButton left={true} bottom={true} helpText={helpText} />
          </Status>
        </TitleStatus>
        {prefs > 0 && <>
          <SlotTitle style={text == 'Backup Confirmed' ? { opacity: 0.5 } : {}}>Preffered slot{prefs > 1 && 's'}:</SlotTitle>
          { rg.reservations.filter(r => !r.backup).map(r => <div key={r.id}>
            <ReservationSummary style={text == 'Backup Confirmed' ? { opacity: 0.5 } : {}} reservation={r} />
          </div>) }
          <Line />
        </>}
        {backups > 0 && <>
          <SlotTitle style={text == 'Preferred Confirmed' ? { opacity: 0.5 } : {}}>Backup slot{backups > 1 && 's'}:</SlotTitle>
          { rg.reservations.filter(r => r.backup).map(r => <div key={r.id}>
            <ReservationSummary style={text == 'Preferred Confirmed' ? { opacity: 0.5 } : {}} reservation={r} />
          </div>) }
          <Line />
        </>}
        {rg.note && <div>
          <NoteTitle>Note</NoteTitle>
          <Value>{rg.note}</Value>
        </div>}
        <CancelWrap>
          <SecondaryButtonBtn style={{ width: '100%' }} onClick={(e) => {
            setShowConfirmation(true);
          }}>Cancel reservation</SecondaryButtonBtn>
        </CancelWrap>
      </InnerWrap>
      <Form ref={formRef} method='post' action='/profile/cancelReservation' style={{ visibility: 'hidden' }}>
        <IdInput name='rgId' value={rg.id} />
      </Form>
    </Wrap>
  </>
}