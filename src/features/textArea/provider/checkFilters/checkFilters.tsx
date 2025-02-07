import { createContext, useContext, useState, ReactNode } from 'react';

interface ICheckFilters {
  limitChecked: boolean;
  spaceChecked: boolean;
  charLimit: number | '';
  toggleSpace: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCharLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CheckFiltersProviderProps {
  children: ReactNode;
}

const CheckFilters = createContext<ICheckFilters | undefined>(undefined);

export function CheckFiltersProvider({ children }: CheckFiltersProviderProps) {
  const [spaceChecked, setSpaceChecked] = useState(false);
  const [limitChecked, setLimitChecked] = useState(false);
  const [charLimit, setCharLimit] = useState<number | ''>('');

  function toggleSpace(e: React.ChangeEvent<HTMLInputElement>) {
    setSpaceChecked(e.target.checked);
  }

  function toggleLimit(e: React.ChangeEvent<HTMLInputElement>) {
    setLimitChecked(e.target.checked);
  }

  function handleCharLimit(e: React.ChangeEvent<HTMLInputElement>) {
    // Only accepts numbers and limits the input to 5 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setCharLimit(value === '' ? '' : Number(value));
  }
  return (
    <CheckFilters.Provider
      value={{
        limitChecked,
        spaceChecked,
        charLimit,
        toggleSpace,
        toggleLimit,
        handleCharLimit,
      }}
    >
      {children}
    </CheckFilters.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckFilters() {
  const context = useContext(CheckFilters);

  if (!context)
    throw new Error(
      'useCheckFilters must be used within a CheckFiltersProvider'
    );
  return context;
}
