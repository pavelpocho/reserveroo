import React, { Dispatch, SetStateAction, useContext } from 'react';


interface UserIdContextType {
  signingIn: boolean | null,
  setSigningIn: Dispatch<SetStateAction<boolean>>
}


export const signingInContext = React.createContext<UserIdContextType | null>(null);

export const useSigningIn = () => {
  const value = useContext(signingInContext);
  if (!value)
    throw new Error('Ilegal use of context');

  return value;
};
