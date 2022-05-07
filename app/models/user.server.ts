import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export const getUser = ({ id }: Pick<User, 'id'>) => (prisma.user.findUnique({
  where: { id },
}));

export const getUserByName = ({ username }: Pick<User, 'username'>) => (prisma.user.findUnique({
  where: { username },
  select: { id: true, passwordHash: true }
}));

export const createUser = ({ username, passwordHash, email }: Pick<User, 'username' | 'passwordHash' | 'email'>) => (prisma.user.create({
  data: { username, passwordHash, email },
  select: { id: true, passwordHash: true }
}));

export const updateUser = ({ id, username, email, passwordHash }: Pick<User, 'id' | 'email' | 'username' | 'passwordHash'>) => (prisma.user.update({
  where: {
    id
  },
  data: {
    username, email, passwordHash
  }
}));

export const deleteUser = ({ id }: Pick<User, 'id'>) => (prisma.user.deleteMany({
    where: { id },
}));
