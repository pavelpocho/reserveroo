import type { Tag } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Tag } from "@prisma/client";

export const createTag = async ({ name, description }: Pick<Tag, 'name' | 'description'>) => (await prisma.tag.create({
  data: {
    name, description
  },
}));

export const updateTag = async ({ id, name, description }: Pick<Tag, 'id' | 'name' | 'description'>) => (await prisma.tag.update({
  where: {
    id
  },
  data: {
    name
  }
}));

export const getTag = async ({ id }: Pick<Tag, 'id'>) => (await prisma.tag.findFirst({
  where: { id },
  include: {
    places: true
  }
}));

export const getTagList = async ({ name: nameFragment }: Pick<Tag, 'name'>) => (await prisma.tag.findMany({
  where: { name: { contains: nameFragment, mode: 'insensitive' } },
  include: {
    places: true
  }
}));

export const getAllTags = async () => (await prisma.tag.findMany({
  include: {
    places: true
  }
}));



export const deleteTag = ({ id }: Pick<Tag, 'id'>) => (prisma.tag.deleteMany({
    where: { id },
}));
