import type { Place } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Place } from "@prisma/client";

export const getPlace = async ({ id }: Pick<Place, 'id'>) => (await prisma.place.findFirst({
  where: { id },
  include: {
    reservables: true,
    openingTimes: true,
    tags: true,
    categories: true,
    Location: true
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

export const getPlaceList = async ({ name: nameFragment, cityCountry, tagNames, catNames }: Pick<Place, 'name'> & { cityCountry: string | undefined, tagNames: string[], catNames: string[] }) => (await prisma.place.findMany({
  where: { 
    AND: [{
      name: {
        contains: nameFragment, mode: 'insensitive',
      }
    }, {
      hidden: false,
    }, {
      Location: {
        cityCountry
      }
    }, {
      OR: tagNames?.map(t => ({
        tags: {
          some: {
            name: t
          }
        }
      }))
    }, {
      OR: catNames?.map(c => ({
        categories: {
          some: {
            name: c
          }
        }
      }))
    }]
  },
  include: {
    company: true,
    reservables: true,
    tags: true,
    categories: true,
    Location: true
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

export const updatePlace = async ({
  id, name, companyId, hidden, addedTagIds, removedTagIds, addedCategoryIds, removedCategoryIds, locationId
}: Pick<Place, 'id' | 'name' | 'companyId' | 'hidden'> & {
  addedTagIds: string[],
  removedTagIds: string[],
  addedCategoryIds: string[],
  removedCategoryIds: string[],
  locationId: string
}) => (await prisma.place.update({
  where: {
    id
  },
  data: {
    tags: {
      connect: addedTagIds.map(t => ({ id: t })),
      disconnect: removedTagIds.map(t => ({ id: t }))
    },
    categories: {
      connect: addedCategoryIds.map(c => ({ id: c })),
      disconnect: removedCategoryIds.map(c => ({ id: c }))
    },
    locationId, name, companyId, hidden
  }
}));

export const deletePlace = ({ id }: Pick<Place, 'id'>) => (prisma.place.deleteMany({
    where: { id },
}));
