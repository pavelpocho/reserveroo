import type { Place } from "@prisma/client";
import { Note } from "esbuild";

import { prisma } from "~/db.server";

export type { Place } from "@prisma/client";

export const getPlace = ({ id }: Pick<Place, 'id'>) => (prisma.place.findFirst({
  where: { id },
}));

export const getPlaceList = async () => {return await prisma.place.findMany({
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

export const deleteNote = ({ id }: Pick<Place, 'id'>) => (prisma.place.deleteMany({
    where: { id },
}));
