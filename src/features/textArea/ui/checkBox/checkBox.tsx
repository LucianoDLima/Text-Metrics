import { ChangeEvent, ReactNode } from 'react';
import './checkBox.scss';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  checkboxHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  children?: ReactNode;
}

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
