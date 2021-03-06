import { OpeningTime, Place, Reservable, Reservation } from "@prisma/client"
import { PresignedPost } from "aws-sdk/clients/s3"
import React from "react"
import styled from "styled-components"
import { styles } from "~/constants/styles"
import { useLangs } from "~/contexts/langsContext"
import { Res } from "~/routes/$placeId/reserve"
import { ReservableTypeWithTexts, ReservableWithReservations, ReservationGroupForEdit, ReservationStatus, Time, TimeSection } from "~/types/types"
import { areDatesEqual, getInputDateFromString, getStringTimeValue } from "~/utils/forms"
import { IdInput } from "./inputs/ObjectInput"

interface ReservableTimesProps {
  reservables: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  })[],
  date: Date,
  openingTime: OpeningTime,
  startName: string,
  endName: string,
  reservableIdName: string,
  defaultReservationGroup?: ReservationGroupForEdit,
  reservationIdName: string,
  backup?: boolean,
  reservationBackupName: string,
  setResList: React.Dispatch<React.SetStateAction<Res[]>>
}

type ReservableGroup = {
  typeId: string
  typeName: string,
  reservables: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  })[]
}

export const ReservableTimes: React.FC<ReservableTimesProps> = ({ reservationBackupName, setResList, backup = false, reservationIdName, defaultReservationGroup, reservableIdName, reservables, date, openingTime, startName, endName }: ReservableTimesProps) => {

  const { lang } = useLangs();

  const reservableGroups: ReservableGroup[] = [];
  reservables.forEach(r => {
    if (!r.ReservableType) return;
    let rg = reservableGroups.find(rgx => rgx.typeId == r.ReservableType.id);
    if (rg != null) {
      rg.reservables.push(r);
    }
    else {
      reservableGroups.push({
        typeId: r.ReservableType.id,
        typeName: r.ReservableType.multiLangName ? r.ReservableType.multiLangName[lang] : '',
        reservables: [ r ]
      });
    }
  });

  return <GroupWrap>
    {reservableGroups.map(rg => <ReservableGroupSection
      key={rg.typeId}
      reservableGroup={rg}
      date={date}
      openingTime={openingTime}
      startName={startName}
      endName={endName}
      backup={backup}
      reservableIdName={reservableIdName}
      defaultReservationGroup={defaultReservationGroup}
      reservationIdName={reservationIdName}
      reservationBackupName={reservationBackupName}
      setResList={setResList} />
    )}
  </GroupWrap>
}

interface ReservableGroupSectionProps {
  reservableGroup: ReservableGroup;
  date: Date;
  openingTime: OpeningTime;
  startName: string;
  endName: string;
  reservableIdName: string;
  defaultReservationGroup?: ReservationGroupForEdit;
  reservationIdName: string;
  backup?: boolean;
  reservationBackupName: string;
  setResList: React.Dispatch<React.SetStateAction<Res[]>>;
}

const TypeName = styled.h3`
  align-self: end;
  text-align: end;
  position: sticky;
  left: -30%;
  font-weight: 600;
  padding: 1.6rem 1rem 0.5rem;
  margin-bottom: 0;
  margin-top: 0;
  background-color: ${styles.colors.gray[5]};
`;

const Times = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 1.6rem 1rem 0.5rem;
  background-color: ${styles.colors.primary_background};
  & p {
    width: 44px;
    text-align: center;
    margin: 0;
  }
`;

const GroupWrap = styled.div`
  display: grid;
  width: 100%;
  overflow-x: auto;
  grid-template-columns: max-content 1fr;
  position: relative;
`;

const ReservableGroupSection: React.FC<ReservableGroupSectionProps> = ({
  reservableGroup, date, openingTime, startName, endName, reservableIdName,
  defaultReservationGroup, reservationIdName, backup, reservationBackupName, setResList
}) => {

  const openMinutes = getDiffBetweenTwoDates(openingTime.close, openingTime.open);
  const openSinceMinutes = new Date(openingTime.open).getMinutes() + new Date(openingTime.open).getHours() * 60;
  const minMin = reservableGroup.reservables[0].minimumReservationTime;
  // Not used right now, might be in the future
  const slotCapacity = reservableGroup.reservables[0].reservationsPerSlot;
  const sections = Math.floor(openMinutes / Math.max(1, minMin));
  const timeTitle = [...Array(Math.floor(sections / 2)).keys()].map(s => {
    const currentMins = openSinceMinutes + openMinutes / sections * s * 2;
    return getStringTimeValue(new Date(0, 0, 0, Math.floor(currentMins / 60), currentMins % 60));
  });

  return <>
    <TypeName>{reservableGroup.typeName}</TypeName>
    <Times>
      {timeTitle.map((t, i) => <p key={i}>{t}</p>)}
    </Times>
    {reservableGroup.reservables.map(r => <ReservableSection
      key={r.id}
      reservable={r}
      date={date}
      openingTime={openingTime}
      startName={startName}
      endName={endName}
      backup={backup}
      reservableIdName={reservableIdName}
      reservationIdName={reservationIdName}
      defaultReservationGroup={defaultReservationGroup}
      reservationBackupName={reservationBackupName}
      setResList={setResList}
    />)}
  </>
}

const getTotalMinutes = (time: Time) => time.hour * 60 + time.minute;

const getTimeOfTotalMinutes = (minutes: number): Time => ({
  hour: Math.floor(minutes / 60),
  minute: minutes % 60,
})

const doSectionsOverlap = (section1: TimeSection, section2: TimeSection | null) => {
  return section2 != null && (!(getTotalMinutes(section1.end) <= getTotalMinutes(section2.start) || getTotalMinutes(section2.end) <= getTotalMinutes(section1.start)))
}

const getDiffBetweenTwoDates = (close: string | Date, open: string | Date) => {
  const millis = new Date(close).getTime() - new Date(open).getTime();
  return millis / 1000 / 60;
}

const getTimeSectionOfDates = (start: Date, end: Date) => {
  return {
    start: {
      hour: start.getHours(),
      minute: start.getMinutes(),
    },
    end: {
      hour: end.getHours(),
      minute: end.getMinutes(),
    }
  }
}

const getTimeSectionOfReservation = (reservation: Reservation) => {
  return getTimeSectionOfDates(new Date(reservation.start), new Date(reservation.end));
}

const doDaysMatch = (date1: Date | string, date2: Date | string, date3: Date | string) => {
  return (
    new Date(date1).getFullYear() === new Date(date2).getFullYear() && new Date(date1).getFullYear() === new Date(date3).getFullYear() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getMonth() === new Date(date3).getMonth() &&
    new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getDate() === new Date(date3).getDate()
  );
}

const Section = styled.button<{taken: boolean, selected: boolean}>`
  border: none;
  border-radius: 0.25rem;
  height: 1.5rem;
  flex-shrink: 0;
  width: 36px;
  cursor: pointer;
  transition: box-shadow 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    box-shadow: ${styles.shadows[2]};
  }
  background-color: ${props => props.selected ? styles.colors.action : styles.colors.gray[70]};
  &:disabled {
    box-shadow: none;
    cursor: default;
    background-color: ${styles.colors.gray[30]};
  }
  ${props => props.taken ? `background-color: ${styles.colors.busy} !important;` : ''}
`;

const SectionWrap = styled.div`
  display: flex;
  background-color: ${styles.colors.primary_background};
  gap: 2px;
  padding: 0.5rem 2rem 0.5rem 0;
  &:last-of-type {
    padding-bottom: 1.6rem;
  }
  padding-left: 2.375rem;
`;

const Title = styled.p`
  text-align: end;
  position: sticky;
  left: -30%;
  padding: 0.5rem 1rem;
  align-self: stretch;
  margin: 0;
  font-weight: 500;
  &:last-of-type {
    padding-bottom: 1.6rem;
  }
  background-color: ${styles.colors.gray[5]};
`;

const CannotReserve = styled.div`
  margin: 0;
  font-weight: 500;
  font-size: 0.8rem;
  height: 1.5rem;
`;


interface ReservableSectionProps {
  reservable: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  });
  date: Date;
  openingTime: OpeningTime;
  startName: string;
  endName: string;
  reservableIdName: string;
  defaultReservationGroup?: ReservationGroupForEdit;
  reservationIdName: string;
  backup?: boolean;
  reservationBackupName: string;
  setResList: React.Dispatch<React.SetStateAction<Res[]>>;
}

const ReservableSection: React.FC<ReservableSectionProps> = ({ defaultReservationGroup, setResList, reservationBackupName, backup, reservationIdName, reservableIdName, reservable, date, openingTime, startName, endName }: ReservableSectionProps) => {

  const openMinutes = getDiffBetweenTwoDates(openingTime.close, openingTime.open);
  const openSinceMinutes = new Date(openingTime.open).getMinutes() + new Date(openingTime.open).getHours() * 60;
  const minMin = reservable.minimumReservationTime;
  const sections = Math.floor(openMinutes / Math.max(1, minMin));
  const timeSections = [...Array(sections).keys()].map(s => ({
    start: { minute: Math.round((s * minMin + openSinceMinutes) % 60), hour: Math.floor((s * minMin + openSinceMinutes) / 60) },
    end: { minute: Math.round(((s + 1) * minMin + openSinceMinutes) % 60), hour: Math.floor(((s + 1) * minMin + openSinceMinutes) / 60) }
  }));

  const defaultReservation = defaultReservationGroup?.reservations.find(r => r.backup == backup && r.reservableId == reservable.id);

  const [ selectedRange, setSelectedRange ] = React.useState<TimeSection | null>(defaultReservation ? getTimeSectionOfReservation(defaultReservation) : null);
  const [ selectedDate, setSelectedDate ] = React.useState<Date | null>(defaultReservation ? new Date(defaultReservation?.start) : null);

  const maxReservableDate = new Date();
  maxReservableDate.setDate(maxReservableDate.getDate() + reservable.reservableDaysAhead);

  return <>
    <Title>{reservable.name}</Title>
    <SectionWrap>
      { date.getTime() > maxReservableDate.getTime() ? <CannotReserve>You cannot yet reserve this far ahead.</CannotReserve> : timeSections.map(s => (
        <Section
          taken={reservable.reservations.filter(
            r => (
              doDaysMatch(date, r.start, r.end) &&                                  // Is the reservation on the same?
              doSectionsOverlap(getTimeSectionOfReservation(r), s) &&               // Is the reservation during the same time?
              !defaultReservationGroup?.reservations.find(dr => dr.id == r.id) &&   // Is it done by someone else?
              r.status != ReservationStatus.Cancelled                               // Is it active?
            )
          ).length >= reservable.reservationsPerSlot}
          key={getTotalMinutes(s.start)}
          disabled={(() => {
            const inTwoHours = new Date();
            inTwoHours.setHours(inTwoHours.getHours() + 2);
            return !!(new Date(date.getFullYear(), date.getMonth(), date.getDate(), s.start.hour, s.start.minute).getTime() < inTwoHours.getTime());
          })()}
          selected={selectedRange != null && selectedDate != null && areDatesEqual(date, selectedDate) && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.start) && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.end)}
          onClick={(e) => {
            let newRange: TimeSection | null = null;
            if (selectedRange == null || date != selectedDate) {
              newRange = s;
            }
            else if (getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.end)) {
              newRange = { start: selectedRange.start, end: s.end };
            }
            else if (getTotalMinutes(s.start) < getTotalMinutes(selectedRange.start)) {
              newRange = { start: s.start, end: getTimeOfTotalMinutes(getTotalMinutes(selectedRange.start) + minMin) };
            }
            else if (getTotalMinutes(selectedRange.start) == getTotalMinutes(s.start) && getTotalMinutes(s.end) == getTotalMinutes(selectedRange.end)) {
              newRange = null;
            }
            else if (getTotalMinutes(selectedRange.start) <= getTotalMinutes(s.start) && getTotalMinutes(s.start) <= getTotalMinutes(selectedRange.end)) {
              newRange = { start: selectedRange.start, end: s.end };
            }
            const overlap = reservable.reservations.filter(
              r => (doDaysMatch(date, r.start, r.end) &&    // Is the reservation on the same date? 
                newRange != null &&                         
                doSectionsOverlap(getTimeSectionOfReservation(r), getTimeSectionOfDates(
                  new Date(date.getFullYear(), date.getMonth(), date.getDate(), newRange.start.hour, newRange.start.minute),
                  new Date(date.getFullYear(), date.getMonth(), date.getDate(), newRange.end.hour, newRange.end.minute)
                )) &&                                                                 // Is the reservation during the same time?
                !defaultReservationGroup?.reservations.find(dr => dr.id == r.id) &&   // Is it done by someone else?
                r.status != ReservationStatus.Cancelled                               // Is it active?
              )                                                                       
            ).length >= reservable.reservationsPerSlot;
            setSelectedRange(overlap ? selectedRange : newRange);
            setSelectedDate(overlap ? selectedDate : date);
            setResList(resList => {
              const r = overlap ? selectedRange: newRange;
              const d = overlap ? selectedDate: date;
              const startDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.start.hour, r.start.minute) : null;
              const endDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.end.hour, r.end.minute) : null;
              const obj = (startDate?.getTime() ?? 0) < (endDate?.getTime() ?? 0) ? { reservableId: reservable.id, startTime: startDate, endTime: endDate, isBackup: backup ?? false } : null;
              const arr =  resList.filter(rx => rx.reservableId != reservable.id || rx.isBackup != backup);
              if (obj != null) arr.push(obj);
              return arr;
            })
            e.preventDefault();
          }}
        ></Section>
      )) }
      {selectedRange && <IdInput name={reservationBackupName} value={backup ? '1' : '0'} />}
      {selectedRange && <IdInput name={reservationIdName} value={defaultReservation ? defaultReservation.id : '-1'} /> }
      {selectedRange && <input hidden={true} readOnly={true} name={startName} type='datetime-local' value={selectedDate && selectedRange ?
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.start.hour, selectedRange.start.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
      } /> }
      {selectedRange && <input hidden={true} readOnly={true} name={endName} type='datetime-local' value={selectedDate && selectedRange ?
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.end.hour, selectedRange.end.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
      } /> }
      {selectedRange && <IdInput name={reservableIdName} value={reservable.id} />}
    </SectionWrap>
  </>
}