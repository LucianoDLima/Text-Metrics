import { InfoIcon } from '@shared/icons';
import './exceedError.scss';

interface ExceedErrorProps {
  charAmount: number | '';
  exceedAmount: number;
}

/**
 * Render an error message when the character limit is exceeded
 *
 * @param charAmount - The character limit
 * @param exceedAmount - The amount of characters that exceed the limit
 */
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
      Limit reached! Your text exceeds {charAmount} characters. ({exceedAmount})
    </span>
  );
}
