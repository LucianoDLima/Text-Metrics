import { ComponentPropsWithoutRef } from 'react';

export function CheckIcon({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='13'
      fill='none'
      viewBox='0 0 12 13'
      {...props}
    >
      <path
        stroke='inherit'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.667'
        d='M10 3.5 4.5 9 2 6.5'
      />
    </svg>
  );
}
