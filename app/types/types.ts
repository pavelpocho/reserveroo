import { Reservable } from "~/models/reservable.server";
import { Reservation } from "~/models/reservation.server";

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

export enum ReservationStatus {
  AwaitingConfirmation,
  Confirmed,
  Rejected,
  Cancelled,
  Paid,
  Past
}
