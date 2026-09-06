import { createContext, useContext } from 'react';

const LocationEntryContext = createContext(null);

const useLocationContext = () => {
  const context = useContext(LocationEntryContext);

  if (!context) {
    throw new Error(
      'useLocationContext must be used inside LocationContext.Provider',
    );
  }

  return context;
};

export { LocationEntryContext, useLocationContext };
