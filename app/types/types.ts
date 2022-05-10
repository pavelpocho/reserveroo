import { OpeningTime } from "~/models/openingTime.server";
import { Place } from "~/models/place.server";
import { Reservable } from "~/models/reservable.server";
import { Reservation } from "~/models/reservation.server";
import { ReservationGroup } from "~/models/reservationGroup.server";

export type FreeOrBusy = 'free' | 'busy';
export type ImageShape = 'square' | 'circle';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type ReservableWithReservations = Reservable & {
  reservations: Reservation[];
}

export type Time = {
  hour: number,
  minute: number
}

export type TimeSection = {
  start: Time,
  end: Time
}

export type ReservationGroupForEdit = (ReservationGroup & {
  reservations: (Reservation & {
      reservable: (Reservable & {
          place: (Place & {
              openingTimes: OpeningTime[];
              reservables: ReservableWithReservations[];
          }) | null;
      }) | null;
  })[];
}) | null;

export enum ReservationStatus {
  AwaitingConfirmation,
  Confirmed,
  Rejected,
  Cancelled,
  Paid,
  NothingReserved,
  Past
}
