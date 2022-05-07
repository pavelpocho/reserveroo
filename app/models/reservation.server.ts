import type { Reservation } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Reservation } from "@prisma/client";

export const getReservation = async ({ id }: Pick<Reservation, 'id'>) => (await prisma.reservation.findFirst({
  where: { id },
}));

export const getReservationList = async () => (await prisma.reservation.findMany());

export const createReservation = async ({ note, placeId, userId }: Pick<Reservation, 'note' | 'placeId' | 'userId'>) => (await prisma.reservation.create({
  data: {
    note, placeId, userId
  },
}));

export const updateReservation = async ({ id, note, placeId, userId }: Pick<Reservation, 'id' | 'note' | 'placeId' | 'userId'>) => (await prisma.reservation.update({
  where: {
    id
  },
  data: {
    note, placeId, userId
  }
}));

export const deleteReservation = ({ id }: Pick<Reservation, 'id'>) => (prisma.reservation.deleteMany({
    where: { id },
}));
