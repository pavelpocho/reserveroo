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
  where: { name: { contains: nameFragment, mode: 'insensitive' }, hidden: false },
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

export const createPlace = async ({ name, companyId }: Pick<Place, 'name' | 'companyId'>) => (await prisma.place.create({
  data: {
    name,
    companyId
  },
}));

export const updatePlace = async ({ id, name, companyId, hidden }: Pick<Place, 'id' | 'name' | 'companyId' | 'hidden'>) => (await prisma.place.update({
  where: {
    id
  },
  data: {
    name, companyId, hidden
  }
}));

export const deletePlace = ({ id }: Pick<Place, 'id'>) => (prisma.place.deleteMany({
    where: { id },
}));
