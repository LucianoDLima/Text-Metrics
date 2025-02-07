import { ChangeEvent, ReactNode } from 'react';
import './checkBox.scss';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  checkboxHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  children?: ReactNode;
}

/**
 * Toggle additional content when the checkbox is checked
 *
 * @param id - The id to connect label with input
 * @param checked - The state of the checkbox
 * @param checkboxHandler - The function to handle the checkbox change
 * @param label - The text to display next to the checkbox
 * @param children - The additional, optional content to display when the checkbox is checked
 * */
export function CheckBox({
  id,
  checked,
  checkboxHandler,
  label,
  children,
}: CheckBoxProps) {
  return (
    <div className='checkbox'>
      <div>
        <input
          id={id}
          type='checkbox'
          checked={checked}
          onChange={checkboxHandler}
        />

        <label htmlFor={id}>{label}</label>
      </div>

      {checked && children}
    </div>
  );
}
