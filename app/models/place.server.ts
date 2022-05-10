import type { Place } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Place } from "@prisma/client";

export const getPlace = async ({ id }: Pick<Place, 'id'>) => (await prisma.place.findFirst({
  where: { id },
  include: {
    reservables: true,
    openingTimes: true
  }
}));

export const getPlaceWithReservations = async ({ id }: Pick<Place, 'id'>) => (await prisma.place.findFirst({
  where: { id },
  include: {
    reservables: {
      include: {
        reservations: true
      }
    },
    openingTimes: true
  }
}));

export const getPlaceList = async ({ name: nameFragment }: Pick<Place, 'name'>) => (await prisma.place.findMany({
  where: { name: { contains: nameFragment, mode: 'insensitive' } },
  include: {
    company: true,
    reservables: true
  }
}));

export const getAllPlaces = async () => (await prisma.place.findMany({
  include: {
    company: true,
    reservables: true
  }
}));

export const createPlace = async ({ name }: Pick<Place, 'name'>) => (await prisma.place.create({
  data: {
    name
  },
}));

export const updatePlace = async ({ id, name }: Pick<Place, 'id' | 'name'>) => (await prisma.place.update({
  where: {
    id
  },
  data: {
    name
  }
}));

export const deletePlace = ({ id }: Pick<Place, 'id'>) => (prisma.place.deleteMany({
    where: { id },
}));
