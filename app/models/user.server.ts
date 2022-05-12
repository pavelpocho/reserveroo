import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export const getUser = async ({ id }: Pick<User, 'id'>) => (await prisma.user.findUnique({
  where: { id },
}));

export const getUserId = async ({ username }: Pick<User, 'username'>) => (await prisma.user.findUnique({
  where: { username },
  select: {
    id: true
  }
}));

export const checkForUserByUsername = async ({ username }: Pick<User, 'username'>) => (await prisma.user.findUnique({
  where: { username },
  select: { id: true, passwordHash: true, admin: true, verifiedEmail: true, email: true }
}));

export const checkForUserByEmail = async ({ email }: Pick<User, 'email'>) => (await prisma.user.findUnique({
  where: { email },
  select: { id: true, passwordHash: true, admin: true }
}));

export const getUserEmailToResend = async ({ username }: Pick<User, 'username'>) => (await prisma.user.findUnique({
  where: {
    username
  },
  select: { email: true, verifyEmailTriesLeft: true }
}));

export const subtractResendTries = async ({ email }: Pick<User, 'email'>) => ({
  where: { email },
  data: {
    verifyEmailTriesLeft: {
      decrement: 1
    }
  }
});

export const getUserByUsername = async ({ username }: Pick<User, 'username'>) => (await prisma.user.findUnique({
  where: { username },
  include: {
    reservationGroups: {
      include: {
        reservations: {
          include: {
            reservable: {
              include: {
                place: true
              }
            }
          }
        }
      }
    }
  }
}));

export const createUser = async ({
  username, passwordHash, email, phone, firstName, lastName
}: Pick<User, 
  'username' | 'passwordHash' | 'email' | 'firstName' | 'lastName' | 'phone'
>) => (await prisma.user.create({
  data: { username, passwordHash, email, phone, firstName, lastName },
  select: { id: true, passwordHash: true }
}));

export const updateUser = async ({ id, firstName, lastName, /*username, email,*/ phone }: Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'/* | 'email' | 'username'*/>) => (await prisma.user.update({
  where: {
    id
  },
  data: {
    /*username, email, */firstName, lastName, phone
  }
}));

export const deleteUser = async ({ id }: Pick<User, 'id'>) => (await prisma.user.deleteMany({
    where: { id },
}));
