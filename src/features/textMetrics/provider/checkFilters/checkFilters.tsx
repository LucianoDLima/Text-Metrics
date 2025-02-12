import { TCharLimit } from '@features/textMetrics/model/types';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
} from 'react';

interface ICheckFilters {
  limitChecked: boolean;
  spaceChecked: boolean;
  charLimit: TCharLimit;
  toggleSpace: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleLimit: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCharLimit: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface CheckFiltersProviderProps {
  children: ReactNode;
}

const CheckFilters = createContext<ICheckFilters | undefined>(undefined);

export function CheckFiltersProvider({ children }: CheckFiltersProviderProps) {
  const [spaceChecked, setSpaceChecked] = useState(false);
  const [limitChecked, setLimitChecked] = useState(false);
  const [charLimit, setCharLimit] = useState<TCharLimit>('');

  function toggleSpace(e: ChangeEvent<HTMLInputElement>) {
    setSpaceChecked(e.target.checked);
  }

  function toggleLimit(e: ChangeEvent<HTMLInputElement>) {
    setLimitChecked(e.target.checked);
  }

  function handleCharLimit(e: ChangeEvent<HTMLInputElement>) {
    // Limits the input to 5 characters
    const value = e.target.value.slice(0, 5);

    // Can't start with 0
    if (value === '0') return;

    // Accept nothing but numbers
    if (isNaN(+value)) return;

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

export function useCheckFilters() {
  const context = useContext(CheckFilters);

  if (!context)
    throw new Error(
      'useCheckFilters must be used within a CheckFiltersProvider'
    );
  return context;
}
