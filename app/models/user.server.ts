import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export const getUser = async ({ id }: Pick<User, 'id'>) => (await prisma.user.findUnique({
  where: { id },
}));

export const getUserByName = async ({ username }: Pick<User, 'username'>) => (await prisma.user.findUnique({
  where: { username },
  select: { id: true, passwordHash: true }
}));

export const getUserById = async ({ id }: Pick<User, 'id'>) => (await prisma.user.findUnique({
  where: { id },
  include: { reservations: {
    include: {
      Place: {
        include: {
          Company: true
        }
      }
    }
  } }
}));

export const createUser = async ({ username, passwordHash, email }: Pick<User, 'username' | 'passwordHash' | 'email'>) => (await prisma.user.create({
  data: { username, passwordHash, email },
  select: { id: true, passwordHash: true }
}));

export const updateUser = async ({ id, username, email, passwordHash }: Pick<User, 'id' | 'email' | 'username' | 'passwordHash'>) => (await prisma.user.update({
  where: {
    id
  },
  data: {
    username, email, passwordHash
  }
}));

export const deleteUser = async ({ id }: Pick<User, 'id'>) => (await prisma.user.deleteMany({
    where: { id },
}));
