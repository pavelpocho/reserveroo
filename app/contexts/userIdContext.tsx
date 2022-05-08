import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

interface UserIdContextType {
  userId: string | null,
  setUserId: Dispatch<SetStateAction<string | null>>
  admin: boolean | null,
  setAdmin: Dispatch<SetStateAction<boolean | null>>
}

export const userIdContext = React.createContext<UserIdContextType | null>(null);

export const useUserId = () => {
  const value = useContext(userIdContext);
  if (!value)
    throw new Error('Ilegal use of context');

  return value;
};
