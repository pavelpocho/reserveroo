import type { Place } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Place } from "@prisma/client";

export const getPlace = ({ id }: Pick<Place, 'id'>) => (prisma.place.findFirst({
  where: { id },
}));

export const getPlaceList = async ({ name: nameFragment }: Pick<Place, 'name'>) => {return await prisma.place.findMany({
  where: { name: { contains: nameFragment, mode: 'insensitive' } },
  select: { id: true, name: true },
  orderBy: { name: 'desc' },
})};

export const createPlace = ({ name }: Pick<Place, 'name'>) => (prisma.place.create({
  data: {
    name
  },
}));

export const updatePlace = ({ id, name }: Pick<Place, 'id' | 'name'>) => (prisma.place.update({
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
