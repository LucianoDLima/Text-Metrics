import { ComponentPropsWithoutRef } from 'react';

export function LightModeIcon({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      fill='none'
      viewBox='0 0 22 22'
      {...props}
    >
      <g>
        <path
          stroke='#fff'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.98'
          d='M11 1.833v1.834m0 14.666v1.834M3.666 11H1.833m3.955-5.212L4.49 4.492m11.72 1.296 1.297-1.296M5.788 16.215 4.49 17.512m11.72-1.296 1.297 1.296M20.166 11h-1.833m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z'
        />
      </g>
      <defs>
        <path
          fill='#fff'
          d='M0 0h22v22H0z'
        />
      </defs>
    </svg>
  );
}
