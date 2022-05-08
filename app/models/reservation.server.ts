import type { Reservation } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Reservation } from "@prisma/client";

export const getReservation = async ({ id }: Pick<Reservation, 'id'>) => (await prisma.reservation.findFirst({
  where: { id },
}));

export const getReservationList = async () => (await prisma.reservation.findMany({
}));

export const createReservation = async ({ reservationGroupId, reservableId }: Pick<Reservation, 'reservationGroupId' | 'reservableId'>) => (await prisma.reservation.create({
  data: {
    reservableId, reservationGroupId
  },
}));

export const updateReservation = async ({ id, reservationGroupId, reservableId }: Pick<Reservation, 'id' | 'reservationGroupId' | 'reservableId'>) => (await prisma.reservation.update({
  where: {
    id
  },
  data: {
    reservableId, reservationGroupId
  }
}));

export const deleteReservation = ({ id }: Pick<Reservation, 'id'>) => (prisma.reservation.deleteMany({
    where: { id },
}));
