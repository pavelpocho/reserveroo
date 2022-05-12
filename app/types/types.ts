import { Location, User } from "@prisma/client";
import { Category } from "~/models/category.server";
import { OpeningTime } from "~/models/openingTime.server";
import { Place } from "~/models/place.server";
import { Reservable } from "~/models/reservable.server";
import { Reservation } from "~/models/reservation.server";
import { ReservationGroup } from "~/models/reservationGroup.server";
import { Tag } from "~/models/tag.server";

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

export type PlaceForEdit = (Place & {
  reservables: Reservable[];
  openingTimes: OpeningTime[];
  tags: Tag[];
  categories: Category[];
  Location: Location | null;
})

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

export type ReservationGroupForEmail = (ReservationGroup & {
  user: User | null;
  reservations: (Reservation & {
      reservable: (Reservable & {
          place: Place | null;
      }) | null;
  })[];
}) | null

export enum ReservationStatus {
  AwaitingConfirmation,
  Confirmed,
  Rejected,
  Cancelled,
  Paid,
  NothingReserved,
  Past
}
