import { ComponentPropsWithoutRef } from 'react';

export function DarkModeIcon({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      fill='none'
      viewBox='0 0 22 22'
      {...props}
    >
      <g clip-path='url(#a)'>
        <path
          stroke='#12131A'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.98'
          d='M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10 10.002Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M0 0h22v22H0z'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
