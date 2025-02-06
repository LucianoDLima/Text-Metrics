import { InfoIcon } from '@shared/icons';
import './exceedError.scss';

interface ExceedErrorProps {
  charAmount: number | '';
  exceedAmount: number;
}

export function ExceedError({ charAmount, exceedAmount }: ExceedErrorProps) {
  return (
    <span
      data-testid='exceed-error'
      className='exceed clr-accent--error'
    >
      <InfoIcon
        aria-hidden
        data-testid='exceed-error-icon'
      />{' '}
      Limit reached! Your text exceeds {charAmount} characters. ({exceedAmount}
      )
    </span>
  );
}
