import { ChangeEvent } from 'react';
import './charLimitInput.scss';
import { TCharLimit } from '@features/textMetrics/model/types';

interface CharLimitInputProps {
  charLimit: TCharLimit;
  handleCharLimit: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CharLimitInput({
  charLimit,
  handleCharLimit,
}: CharLimitInputProps) {
  return (
    <div
      className='limit-input'
      data-testid='limit-filter-input'
    >
      <label
        data-testid='limit-filter-label'
        className='screen-reader'
        htmlFor='limit-input'
      >
        Type the character limit
      </label>

      <input
        className='filter__ch-limit fs-body--sm'
        id='limit-input'
        type='text'
        value={charLimit}
        onChange={handleCharLimit}
      />
    </div>
  );
}
