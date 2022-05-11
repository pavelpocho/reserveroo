import type { Location } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Location } from "@prisma/client";

export const createLocation = async ({ country, city }: Pick<Location, 'country' | 'city'>) => (await prisma.location.create({
  data: {
    city, country, cityCountry: city + country
  },
}));

export const updateLocation = async ({ id, country, city }: Pick<Location, 'id' | 'country' | 'city'>) => (await prisma.location.update({
  where: {
    id
  },
  data: {
    city, country, cityCountry: city + country
  }
}));

export const getLocation = async ({ id }: Pick<Location, 'id'>) => (await prisma.location.findFirst({
  where: { id },
  include: {
    places: true
  }
}));

export const getLocationList = async ({ cityCountry: nameFragment }: Pick<Location, 'cityCountry'>) => (await prisma.location.findMany({
  where: { cityCountry: { contains: nameFragment, mode: 'insensitive' } },
  include: {
    places: true
  }
}));

export const getAllLocations = async () => (await prisma.location.findMany({
  include: {
    places: true
  }
}));



export const deleteLocation = ({ id }: Pick<Location, 'id'>) => (prisma.location.deleteMany({
    where: { id },
}));
