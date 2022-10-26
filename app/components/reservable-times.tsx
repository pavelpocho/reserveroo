import { ConfigurationSetAlreadyExistsException } from "@aws-sdk/client-ses"
import type { OpeningTime, Reservation } from "@prisma/client"
import type { bool } from "aws-sdk/clients/redshiftdata"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { styles } from "~/constants/styles"
import { useLangs } from "~/contexts/langsContext"
import type { Res } from "~/routes/$placeId/reserve"
import type { ReservableTypeWithTexts, ReservableWithReservations, ReservationGroupForEdit, Time, TimeSection } from "~/types/types";
import { ReservationStatus } from "~/types/types"
import { areDatesEqual, getDayOfWeek, getStringDateValue, getStringTimeValue } from "~/utils/forms"
import { IdInput } from "./inputs/ObjectInput"

interface ReservableTimesProps {
  reservables: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  })[],
  openingTimes: OpeningTime[],
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

interface ReservableSelected {
  isSelected: Boolean,
  reservableId: string
}

export const ReservableTimes: React.FC<ReservableTimesProps> = ({ reservationBackupName, setResList, backup = false, reservationIdName, defaultReservationGroup, reservableIdName, reservables, openingTimes, startName, endName }: ReservableTimesProps) => {

  const { lang } = useLangs();
  
  const [ selected, setSelected ] = useState<ReservableSelected[]>(reservables.map(r => ({ reservableId: r.id, isSelected: !!defaultReservationGroup?.reservations.find(rx => rx.backup == backup && rx.reservable?.id == r.id) })));

  const [ selectedRange, setSelectedRange ] = React.useState<TimeSection | null>(defaultReservationGroup && selected.filter(s => s.isSelected).length > 0 ? getTimeSectionOfReservation(defaultReservationGroup.reservations[0]) : null);
  console.log(selectedRange);
  const [ selectedDate, setSelectedDate ] = React.useState<Date | null>(defaultReservationGroup && selected.filter(s => s.isSelected).length > 0 ? new Date(defaultReservationGroup.reservations[0].start) : null);
  console.log(selectedDate);

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

  const reduction = (new Date(openingTimes[getDayOfWeek(new Date())].close).getTime() < new Date().getTime() ? 1 : 0);
  const upcomingDates = [...Array(reservableGroups[0].reservables[0].reservableDaysAhead - reduction).keys()].map(i => {
    const d = new Date();
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    d.setDate(d.getDate() + i + reduction);
    return d;
  });

  const openMinutesForDaysOfWeek = openingTimes.map(ot => getDiffBetweenTwoDates(ot.close, ot.open));
  const openSinceMinutesForDaysOfWeek = openingTimes.map(ot => new Date(ot.open).getMinutes() + new Date(ot.open).getHours() * 60);
  const minMin = reservableGroups[0].reservables[0].minimumReservationTime;
  const sectionsForDaysOfWeek = openMinutesForDaysOfWeek.map(om => Math.floor(om / Math.max(1, minMin)));
  const timeTitleListsForDaysOfWeek = sectionsForDaysOfWeek.map((sections, i) => [...Array(Math.floor(sections / 2 + 1)).keys()].map(s => {
    const currentMins = openSinceMinutesForDaysOfWeek[i] + openMinutesForDaysOfWeek[i] / sections * s * 2;
    return getStringTimeValue(new Date(0, 0, 0, Math.floor(currentMins / 60), currentMins % 60));
  }));

  return <GroupWrap days={reservableGroups[0].reservables[0].reservableDaysAhead + 1 - reduction /*the +1 is for input elements at end of each row*/}>
    <DateTimeName>
      <DateName>
        Date
      </DateName>
      <TimeName>
        Time
      </TimeName>
    </DateTimeName>
    {
      upcomingDates.map((date, i) => <TimeDateWrap key={i}>
        <DateEl>
          {getStringDateValue(date)}
        </DateEl>
        <Times>
          { timeTitleListsForDaysOfWeek[getDayOfWeek(date)].map((t, i) => <p key={i}>{t}</p>) }
        </Times>
      </TimeDateWrap>)
    }
    <div>{/* This is here because in ReservableSection, there are input elements which take up one grid element, so we need it filled here too */}</div>
    {reservableGroups.map((rg, i) => <ReservableGroupSection
      key={rg.typeId}
      indexInList={i}
      reservableGroup={rg}
      openingTimes={openingTimes}
      startName={startName}
      upcomingDates={upcomingDates}
      sectionsForDaysOfWeek={sectionsForDaysOfWeek}
      openSinceMinutesForDaysOfWeek={openSinceMinutesForDaysOfWeek}
      endName={endName}
      backup={backup}
      reservableIdName={reservableIdName}
      defaultReservationGroup={defaultReservationGroup}
      reservationIdName={reservationIdName}
      reservationBackupName={reservationBackupName}
      setResList={setResList}
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selected={selected}
      setSelected={setSelected}
      reservables={reservables}
      />
    )}
  </GroupWrap>
}

interface ReservableGroupSectionProps {
  reservableGroup: ReservableGroup;
  openingTimes: OpeningTime[];
  startName: string;
  endName: string;
  openSinceMinutesForDaysOfWeek: number[];
  reservableIdName: string;
  indexInList: number;
  sectionsForDaysOfWeek: number[];
  defaultReservationGroup?: ReservationGroupForEdit;
  reservationIdName: string;
  upcomingDates: Date[];
  backup?: boolean;
  reservationBackupName: string;
  selectedRange: TimeSection | null;
  setSelectedRange: React.Dispatch<React.SetStateAction<TimeSection | null>>;
  selectedDate: Date | null;
  selected: ReservableSelected[];
  setSelected: React.Dispatch<React.SetStateAction<ReservableSelected[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setResList: React.Dispatch<React.SetStateAction<Res[]>>;
  reservables: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  })[];
}

const TypeName = styled.h3<{ noTopPad: boolean }>`
  align-self: end;
  text-align: end;
  position: sticky;
  left: 0;
  font-weight: 600;
  padding: ${props => props.noTopPad ? '0.0' : '1.2'}rem 1rem ${props => props.noTopPad ? '0.0' : '1.2'}rem;
  font-size: 1rem;
  margin-bottom: 0;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 0;
  background-color: ${styles.colors.gray[20]}90;
`;

const DateTimeName = styled.div`
  height: 3.9rem;
  position: sticky;
  padding-right: 1rem;
  left: 0;
  background-color: ${styles.colors.gray[20]}90;
`;

const DateName = styled.h3`
  padding: 0;
  font-weight: 600;
  margin: 0;
  align-self: flex-start;
  box-sizing: border-box;
  height: unset;
  font-size: 1rem;
  padding: 0.8rem 0rem 0.4rem;
  text-align: right;
  line-height: unset;
  position: unset;
`;

const TimeName = styled.h5`
  padding: 0;
  font-weight: 600;
  margin: 0;
  align-self: flex-start;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-align: right;
  line-height: unset;
  font-size: 0.8rem;
  color: ${styles.colors.gray[90]};
`;

const TimeDateWrap = styled.div`
  background-color: ${styles.colors.primary_background};
`;

const DateEl = styled.p`
  margin: 0px;
  display: flex;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.8rem 1.15rem 0.4rem;
`;

const Times = styled.div`
  display: flex;
  align-items: center;
  gap: 2.28rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${styles.colors.gray[90]};
  padding: 0rem 1.1rem 0rem;
  & p {
    width: 44px;
    text-align: center;
    margin: 0;
  }
`;

const GroupWrap = styled.div<{ days: number }>`
  display: grid;
  width: 100%;
  overflow-x: auto;
  grid-template-columns: max-content repeat(${props => props.days}, max-content);
  position: relative;
`;

const ReservableGroupSection: React.FC<ReservableGroupSectionProps> = ({
  reservableGroup, openingTimes, startName, endName, reservableIdName, indexInList, sectionsForDaysOfWeek, openSinceMinutesForDaysOfWeek,
  defaultReservationGroup, reservationIdName, backup, reservationBackupName, setResList, upcomingDates, selectedRange, setSelectedRange, selectedDate, setSelectedDate, selected, setSelected, reservables
}) => {

  const minMin = reservableGroup.reservables[0].minimumReservationTime;
  const timeSectionListsForDaysOfWeek = sectionsForDaysOfWeek.map((sc, i) => ([...Array(sc).keys()].map(s => ({
    start: { minute: Math.round((s * minMin + openSinceMinutesForDaysOfWeek[i]) % 60), hour: Math.floor((s * minMin + openSinceMinutesForDaysOfWeek[i]) / 60) },
    end: { minute: Math.round(((s + 1) * minMin + openSinceMinutesForDaysOfWeek[i]) % 60), hour: Math.floor(((s + 1) * minMin + openSinceMinutesForDaysOfWeek[i]) / 60) }
  }))));

  // Not used right now, might be in the future
  const slotCapacity = reservableGroup.reservables[0].reservationsPerSlot;

  return <>
    <TypeName noTopPad={true}>{reservableGroup.typeName}</TypeName>
    {
      upcomingDates.map((date, i) => <SectionWrap key={i}>
        { timeSectionListsForDaysOfWeek[getDayOfWeek(date)].map((_, j) => (
        <Section first={j == 0} last={false} transparent={true} key={j} taken={false} selected={false} disabled={true} />
        )) }
      </SectionWrap>)
    }
    <div>{/* This is here because in ReservableSection, there are input elements which take up one grid element, so we need it filled here too */}</div>
    {reservableGroup.reservables.map((r, h) => <ReservableSection
      key={r.id}
      firstSection={h == 0}
      lastSection={h == reservableGroup.reservables.length - 1}
      reservable={r}
      timeSectionListsForDaysOfWeek={timeSectionListsForDaysOfWeek}
      openingTimes={openingTimes}
      upcomingDates={upcomingDates}
      startName={startName}
      endName={endName}
      backup={backup}
      reservableIdName={reservableIdName}
      reservationIdName={reservationIdName}
      defaultReservationGroup={defaultReservationGroup}
      reservationBackupName={reservationBackupName}
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      setResList={setResList}
      selected={selected}
      reservables={reservables}
      setSelected={setSelected}
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
  // @ts-ignore
  return getTimeSectionOfDates(new Date(reservation.start.slice(0, 16)), new Date(reservation.end.slice(0, 16)));
}

export const doDaysMatch = (date1: Date, date2: Date | string, date3: Date | string) => {
  // TODO: Fix this mess
  // date1 is usually the date we have selected or are showing, so it's a date object
  // date2 and date3 come from reservations from db, which means they are strings
  // if they don't get sliced, they get interpreted as UTC time and if the user is not in GMT, it generates the wrong time...
  return (
    // @ts-ignore
    new Date(date1).getFullYear() === new Date(typeof date2 == 'string' ? date2.slice(0, 16) : date2).getFullYear() && new Date(date1).getFullYear() === new Date(typeof date3 == 'string' ? date3.slice(0, 16) : date3).getFullYear() &&
    // @ts-ignore
    new Date(date1).getMonth() === new Date(typeof date2 == 'string' ? date2.slice(0, 16) : date2).getMonth() && new Date(date1).getMonth() === new Date(typeof date3 == 'string' ? date3.slice(0, 16) : date3).getMonth() &&
    // @ts-ignore
    new Date(date1).getDate() === new Date(typeof date2 == 'string' ? date2.slice(0, 16) : date2).getDate() && new Date(date1).getDate() === new Date(typeof date3 == 'string' ? date3.slice(0, 16) : date3).getDate()
  );
}

const SectionOuter = styled.div<{first: boolean, last: boolean, taken: boolean, selected: boolean}>`
  height: 1.5rem;
  flex-shrink: 0;
  width: 38px;
  cursor: pointer;
  padding: 0;
  padding-left: ${props => props.first ? '0.15rem' : '0'};
  padding-right: ${props => props.last ? '0.15rem' : '0'};
  border: none;
  &:nth-child(even) {
    border-right: 2px solid ${styles.colors.gray[90]};
  }
  &:nth-child(odd) {
    border-right: 2px solid ${styles.colors.primary_background};
  }
  &:last-child {
    border-right: none;
  }
  &:first-child {
    border-left: 2px solid ${styles.colors.gray[90]};
  }
`;

const SectionInner = styled.button<{ firstSection: boolean, lastSection: boolean, first: boolean, last: boolean, taken: boolean, selected: boolean}>`
  height: 1.5rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0;
  transition: box-shadow 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  border-top: 1px solid ${styles.colors.primary_background};
  border-bottom: 1px solid ${styles.colors.primary_background};
  &:hover {
    box-shadow: ${styles.shadows[2]};
  }
  border-top-left-radius: ${props => props.first && props.firstSection ? '0.75rem' : ''};
  border-bottom-left-radius: ${props => props.first && props.lastSection ? '0.75rem' : ''};
  border-top-right-radius: ${props => props.last && props.firstSection ? '0.75rem' : ''};
  border-bottom-right-radius: ${props => props.last && props.lastSection ? '0.75rem' : ''};
  background-color: ${props => props.selected ? styles.colors.action : styles.colors.gray[40]};
  &:disabled {
    box-shadow: none;
    cursor: default;
    background-color: ${styles.colors.gray[40]}40;
  }
  ${props => props.taken ? `background-color: ${styles.colors.busy} !important;` : ''}
`;

const Section = (props: { firstSection?: boolean, lastSection?: boolean, transparent?: boolean, first: boolean, last: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, taken: boolean, selected: boolean, disabled: bool }) => <SectionOuter first={props.first} last={props.last} taken={props.taken} selected={props.selected}>
  <SectionInner style={props.transparent ? {
    backgroundColor: 'transparent'
  } : {}} first={props.first} last={props.last} firstSection={props.firstSection ?? false} lastSection={props.lastSection ?? false} taken={props.taken} selected={props.selected} disabled={props.disabled} onClick={props.onClick}></SectionInner>
</SectionOuter>

const SectionWrap = styled.div`
  display: flex;
  background-color: ${styles.colors.primary_background};
  padding: 0rem 2rem 0rem 0;
  &:last-of-type {
    padding-bottom: 1.6rem;
  }
  padding-left: 2.375rem;
`;

const Title = styled.p`
  text-align: end;
  position: sticky;
  left: 0px;
  padding: 0.0rem 1rem;
  align-self: stretch;
  margin: 0;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.8rem;
  color: ${styles.colors.gray[90]};
  font-weight: 600;
  &:last-of-type {
    padding-bottom: 1.6rem;
  }
  background-color: ${styles.colors.gray[20]}90;
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
  openingTimes: OpeningTime[];
  startName: string;
  firstSection: boolean;
  lastSection: boolean;
  upcomingDates: Date[];
  endName: string;
  timeSectionListsForDaysOfWeek: {
    start: {
        minute: number;
        hour: number;
    };
    end: {
        minute: number;
        hour: number;
    };
  }[][]
  reservableIdName: string;
  defaultReservationGroup?: ReservationGroupForEdit;
  reservationIdName: string;
  backup?: boolean;
  reservationBackupName: string;
  selectedRange: TimeSection | null;
  setSelectedRange: React.Dispatch<React.SetStateAction<TimeSection | null>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setResList: React.Dispatch<React.SetStateAction<Res[]>>;
  selected: ReservableSelected[];
  setSelected: React.Dispatch<React.SetStateAction<ReservableSelected[]>>;
  reservables: (ReservableWithReservations & {
    ReservableType: ReservableTypeWithTexts
  })[];
}

const ReservableSection: React.FC<ReservableSectionProps> = ({ timeSectionListsForDaysOfWeek, firstSection, lastSection, upcomingDates, defaultReservationGroup, setResList, reservationBackupName, backup, reservationIdName, reservableIdName, reservable, openingTimes, startName, endName, selectedRange, setSelectedRange, selectedDate, setSelectedDate, selected, setSelected, reservables }: ReservableSectionProps) => {

  const minMin = reservable.minimumReservationTime;
  const defaultReservation = defaultReservationGroup?.reservations.find(r => r.backup == backup && r.reservableId == reservable.id);

  const maxReservableDate = new Date();
  maxReservableDate.setDate(maxReservableDate.getDate() + reservable.reservableDaysAhead);

  useEffect(() => {
    if (selectedRange == null) {
      setSelected(sAr => {
        const sArNew = sAr.map(s => s.reservableId == reservable.id ? { reservableId: s.reservableId, isSelected: false } : s);
        return sArNew;
      })
      setResList(s => s.filter(sx => sx.isBackup != backup));
    }
    if (selectedRange && selected.find(s => s.reservableId == reservable.id)?.isSelected) setResList(resList => {
      const r = selectedRange;
      const d = selectedDate;
      const startDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.start.hour, r.start.minute) : null;
      const endDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.end.hour, r.end.minute) : null;
      const obj = (startDate?.getTime() ?? 0) < (endDate?.getTime() ?? 0) ? { reservableId: reservable.id, startTime: startDate, endTime: endDate, isBackup: backup ?? false } : null;
      const arr = resList.filter(rx => rx.reservableId != reservable.id || rx.isBackup != backup);
      if (obj != null) arr.push(obj);
      return arr;
    })
  }, [selectedRange, selectedDate]);

  return <>
    <Title>{reservable.name}</Title>
      { upcomingDates.map((date, x) => (
        <SectionWrap key={x}>{
        date.getTime() > maxReservableDate.getTime() ? <CannotReserve>You cannot yet reserve this far ahead.</CannotReserve> : timeSectionListsForDaysOfWeek[getDayOfWeek(date)].map((s, z) => (
          <Section
            first={z == 0}
            firstSection={firstSection}
            lastSection={lastSection}
            last={z == timeSectionListsForDaysOfWeek[getDayOfWeek(date)].length - 1}
            taken={reservable.reservations.filter(
              r => (
                doDaysMatch(date, r.start, r.end) &&                                  // Is the reservation on the same date?
                doSectionsOverlap(getTimeSectionOfReservation(r), s) &&               // Is the reservation during the same time?
                !defaultReservationGroup?.reservations.find(dr => dr.id == r.id) &&   // Is it done by someone else?
                r.status != ReservationStatus.Cancelled                               // Is it active?
              )
            ).length >= reservable.reservationsPerSlot}
            key={getTotalMinutes(s.start)}
            disabled={(() => {
              const inTwoHours = new Date();
              inTwoHours.setHours(inTwoHours.getHours() + 2);
              return (
                (
                  !(selectedRange != null && selectedDate != null && areDatesEqual(date, selectedDate) && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.start) && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.end)) &&
                  !selected.find(s => s.reservableId == reservable.id)?.isSelected &&
                  selectedRange != null && selectedDate != null
                ) || 
                !!(new Date(date.getFullYear(), date.getMonth(), date.getDate(), s.start.hour, s.start.minute).getTime() < inTwoHours.getTime())
              );
            })()}
            selected={(selected.find(s => s.reservableId == reservable.id)?.isSelected ?? false) && selectedRange != null && selectedDate != null && areDatesEqual(date, selectedDate) && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.start) && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.end)}
            onClick={(e) => {
              let newRange: TimeSection | null = null;
              let newSelected = true;
              const lSelected = selected.find(s => s.reservableId == reservable.id)?.isSelected;
              if (selectedRange == null || date.getTime() != selectedDate?.getTime()) {
                newRange = s;
              }
              else if (lSelected && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.end)) {
                newRange = { start: selectedRange.start, end: s.end };
              }
              else if (lSelected && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.start)) {
                newRange = { start: s.start, end: getTimeOfTotalMinutes(getTotalMinutes(selectedRange.start) + minMin) };
              }
              else if (lSelected && selected.filter(s => s.isSelected).length == 1 && getTotalMinutes(selectedRange.start) == getTotalMinutes(s.start) && getTotalMinutes(s.end) == getTotalMinutes(selectedRange.end)) {
                newRange = null;
                newSelected = false;
              }
              else if (lSelected && getTotalMinutes(selectedRange.start) == getTotalMinutes(s.start) && getTotalMinutes(s.end) == getTotalMinutes(selectedRange.end)) {
                newRange = selectedRange;
                newSelected = false;
              }
              else if (lSelected && getTotalMinutes(selectedRange.start) < getTotalMinutes(s.start) && getTotalMinutes(selectedRange.end) == getTotalMinutes(s.end)) {
                newRange = { start: s.start, end: s.end };
              }
              else if (lSelected && getTotalMinutes(selectedRange.start) <= getTotalMinutes(s.start) && getTotalMinutes(s.start) <= getTotalMinutes(selectedRange.end)) {
                newRange = { start: selectedRange.start, end: s.end };
              }
              else if (!lSelected) {
                newRange = selectedRange;
              }
              const overlap = reservables.filter(rx => selected.find(s => s.reservableId == rx.id)?.isSelected || rx.id == reservable.id).find(ry => ry.reservations.filter(
                r => (doDaysMatch(date, r.start, r.end) &&    // Is the reservation on the same date? 
                  newRange != null &&                         
                  doSectionsOverlap(getTimeSectionOfReservation(r), getTimeSectionOfDates(
                    new Date(date.getFullYear(), date.getMonth(), date.getDate(), newRange.start.hour, newRange.start.minute),
                    new Date(date.getFullYear(), date.getMonth(), date.getDate(), newRange.end.hour, newRange.end.minute)
                  )) &&                                                                 // Is the reservation during the same time?
                  !defaultReservationGroup?.reservations.find(dr => dr.id == r.id) &&   // Is it done by someone else?
                  r.status != ReservationStatus.Cancelled                               // Is it active?
                )                                                                       
              ).length >= ry.reservationsPerSlot);
              setSelectedRange(overlap ? selectedRange : newRange);
              setSelectedDate(overlap ? selectedDate : date);
              setSelected(overlap ? selected : selected.map(s => s.reservableId == reservable.id ? { reservableId: reservable.id, isSelected: newSelected } : s));
              setResList(resList => {
                const r = overlap ? selectedRange : newRange;
                const d = overlap ? selectedDate : date;
                const startDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.start.hour, r.start.minute) : null;
                const endDate = r && d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.end.hour, r.end.minute) : null;
                const obj = (startDate?.getTime() ?? 0) < (endDate?.getTime() ?? 0) && (overlap ? lSelected : newSelected) ? { reservableId: reservable.id, startTime: startDate, endTime: endDate, isBackup: backup ?? false } : null;
                const arr =  resList.filter(rx => rx.reservableId != reservable.id || rx.isBackup != backup);
                if (obj != null) arr.push(obj);
                return arr;
              })
              e.preventDefault();
            }}
          ></Section>
        ))
      }</SectionWrap>
      )) }
      <div>
        {selected.find(s => s.reservableId == reservable.id)?.isSelected && selectedRange && <IdInput name={reservationBackupName} value={backup ? '1' : '0'} />}
        {selected.find(s => s.reservableId == reservable.id)?.isSelected && selectedRange && <IdInput name={reservationIdName} value={defaultReservation ? defaultReservation.id : '-1'} /> }
        {selected.find(s => s.reservableId == reservable.id)?.isSelected && selectedRange && <input hidden={true} readOnly={true} name={startName} type={'datetime-local'} value={selectedDate && selectedRange ?
          new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.start.hour, selectedRange.start.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
        } /> }
        {selected.find(s => s.reservableId == reservable.id)?.isSelected && selectedRange && <input hidden={true} readOnly={true} name={endName} type='datetime-local' value={selectedDate && selectedRange ?
          new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.end.hour, selectedRange.end.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
        } /> }
        {selected.find(s => s.reservableId == reservable.id)?.isSelected && selectedRange && <IdInput name={reservableIdName} value={reservable.id} />}
      </div>
  </>
}