import { useState } from 'react';

export function useCheckBox() {
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

  return {
    limitChecked,
    spaceChecked,
    charLimit,
    toggleSpace,
    toggleLimit,
    handleCharLimit,
  };
}
