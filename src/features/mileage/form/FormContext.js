import { createContext, useContext } from 'react';

const FormContext = createContext(null);

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used inside FormContext.Provider');
  }

  return context;
};

export { FormContext, useFormContext };
