import { ChangeEvent } from 'react';
import { CheckIcon } from '@shared/icons';
import './checkBox.scss';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  checkboxHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

/**
 * Checkbox input with label
 *
 * @param id - The id to connect label with input
 * @param checked - The state of the checkbox
 * @param checkboxHandler - The function to handle the checkbox change
 * @param label - The text to display next to the checkbox
 * */
export function CheckBox({
  id,
  checked,
  checkboxHandler,
  label,
}: CheckBoxProps) {
  return (
    <div
      data-testid={id}
      className='checkbox'
    >
      <div className='checkbox__check'>
        <input
          id={id}
          data-testid='check-input'
          type='checkbox'
          checked={checked}
          onChange={checkboxHandler}
        />

        {checked && (
          <CheckIcon
            className='checkbox__check-icon'
            data-testid='check-icon'
            aria-hidden
          />
        )}
      </div>

      <label
        data-testid='check-label'
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
