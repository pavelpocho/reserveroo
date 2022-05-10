import { OpeningTime, Reservation } from "@prisma/client"
import React from "react"
import styled from "styled-components"
import { ReservableWithReservations, Time, TimeSection } from "~/types/types"
import { areDatesEqual, getInputDateFromString, getStringTimeValue } from "~/utils/forms"

interface ReservableTimesProps {
  reservables: ReservableWithReservations[],
  date: Date,
  openingTime: OpeningTime,
  startName: string,
  endName: string,
  reservableIdName: string
}

export const ReservableTimes: React.FC<ReservableTimesProps> = ({ reservableIdName, reservables, date, openingTime, startName, endName }: ReservableTimesProps) => {
  return <>{
    reservables.map(r => <ReservableSection reservableIdName={reservableIdName} startName={startName} endName={endName} key={r.id} reservable={r} date={date} openingTime={openingTime} />)
  }</>
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

const getTimeSectionOfReservation = (reservation: Reservation) => {
  return {
    start: {
      hour: new Date(reservation.start).getHours(),
      minute: new Date(reservation.start).getMinutes(),
    },
    end: {
      hour: new Date(reservation.end).getHours(),
      minute: new Date(reservation.end).getMinutes(),
    }
  }
}

const doDaysMatch = (date1: Date | string, date2: Date | string, date3: Date | string) => {
  return (
    new Date(date1).getFullYear() === new Date(date2).getFullYear() && new Date(date1).getFullYear() === new Date(date3).getFullYear() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getMonth() === new Date(date3).getMonth() &&
    new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getDate() === new Date(date3).getDate()
  );
}

const Section = styled.button<{taken: boolean, selected: boolean}>`
  height: 20px;
  width: 20px;
  border: 1px solid black;
  background-color: ${props => props.taken ? 'red' : props.selected ? 'green' : 'blue'};
`;

const SectionWrap = styled.div`
  display: flex;
`;


interface ReservableSectionProps {
  reservable: ReservableWithReservations,
  date: Date,
  openingTime: OpeningTime,
  startName: string,
  endName: string,
  reservableIdName: string
}

const ReservableSection: React.FC<ReservableSectionProps> = ({ reservableIdName, reservable, date, openingTime, startName, endName }: ReservableSectionProps) => {

  const openMinutes = getDiffBetweenTwoDates(openingTime.close, openingTime.open);
  const openSinceMinutes = new Date(openingTime.open).getMinutes() + new Date(openingTime.open).getHours() * 60;
  const minMin = reservable.minimumReservationTime;
  // Not used right now, might be in the future
  const slotCapacity = reservable.reservationsPerSlot;
  const sections = Math.floor(openMinutes / Math.max(1, minMin));
  const timeSections = [...Array(sections).keys()].map(s => ({
    start: { minute: Math.round((s * minMin + openSinceMinutes) % 60), hour: Math.floor((s * minMin + openSinceMinutes) / 60) },
    end: { minute: Math.round(((s + 1) * minMin + openSinceMinutes) % 60), hour: Math.floor(((s + 1) * minMin + openSinceMinutes) / 60) }
  }));

  const [ selectedRange, setSelectedRange ] = React.useState<TimeSection | null>(null);
  const [ selectedDate, setSelectedDate ] = React.useState<Date>(date);

  return <div>
    <p>{reservable.name}</p>
    <SectionWrap key={reservable.id}>
      { timeSections.map(s => (
        <Section
          taken={!!reservable.reservations.find(r => doDaysMatch(date, r.start, r.end) && doSectionsOverlap(getTimeSectionOfReservation(r), s))}
          key={getTotalMinutes(s.start)}
          selected={selectedRange != null && areDatesEqual(date, selectedDate) && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.start) && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.end)}
          onClick={(e) => {
            let newRange: TimeSection | null = null;
            if (selectedRange == null) {
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
            const overlap = reservable.reservations.find(r => doDaysMatch(date, r.start, r.end) && doSectionsOverlap(getTimeSectionOfReservation(r), newRange))
            setSelectedRange(overlap ? selectedRange : newRange);
            setSelectedDate(overlap ? selectedDate : date);
            e.preventDefault();
          }}
        ></Section>
      )) }
    </SectionWrap>
    {/* Combine these into just start and end dateTime inputs*/}
    {selectedRange && <input readOnly={true} name={startName} type='datetime-local' value={selectedRange ?
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.start.hour, selectedRange.start.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
    } /> }
    {selectedRange && <input readOnly={true} name={endName} type='datetime-local' value={selectedRange ?
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.end.hour, selectedRange.end.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ''
    } /> }
    {selectedRange && <input readOnly={true} name={reservableIdName} type='text' value={reservable.id} />}
    {/* <input readOnly={true} name={startName} type='time' value={getStringTimeValue(new Date(0, 0, 0, selectedRange?.start.hour, selectedRange?.start.minute))} />
    <input readOnly={true} name={endName} type='time' value={getStringTimeValue(new Date(0, 0, 0, selectedRange?.end.hour, selectedRange?.end.minute))} />
    <input readOnly={true} type='date' value={getInputDateFromString(selectedDate)} /> */}
  </div>
}