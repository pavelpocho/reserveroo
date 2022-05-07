import React, { useContext } from 'react';

export const translations = {
  availability: {
    mostlyFree: 'Mostly free',
    fairlyBusy: 'Fairly busy'
  },
  searchPlaceholder: 'Search'
};

const Context = React.createContext<typeof translations | null>(null);

export const useLangs = () => {
  const value = useContext(Context);
  if (!value)
    throw new Error('Ilegal use of context');

  return value;
};

export const LangsContextProvider = ({ children }: React.PropsWithChildren<any>) => (
  <Context.Provider value={translations}>
    {children}
  </Context.Provider>
);
