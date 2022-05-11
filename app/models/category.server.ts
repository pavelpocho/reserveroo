import type { Category } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Category } from "@prisma/client";

export const getCategory = async ({ id }: Pick<Category, 'id'>) => (await prisma.category.findFirst({
  where: { id },
  include: {
    places: true
  }
}));

export const getCategoryList = async ({ name: nameFragment }: Pick<Category, 'name'>) => (await prisma.category.findMany({
  where: { name: { contains: nameFragment, mode: 'insensitive' } },
  include: {
    places: true
  }
}));

export const getAllCategorys = async () => (await prisma.category.findMany({
  include: {
    places: true
  }
}));

export const createCategory = async ({ name }: Pick<Category, 'name'>) => (await prisma.category.create({
  data: {
    name
  },
}));

export const updateCategory = async ({ id, name }: Pick<Category, 'id' | 'name'>) => (await prisma.category.update({
  where: {
    id
  },
  data: {
    name
  }
}));

export const deleteCategory = ({ id }: Pick<Category, 'id'>) => (prisma.category.deleteMany({
    where: { id },
}));
