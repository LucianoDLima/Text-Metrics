import {
  useCheckFilters,
  useTextMetrics,
} from '@features/textMetrics/provider';
import { InfoIcon } from '@shared/icons';
import './textArea.scss';

/**
 * Provides a text input area with character limit error message.
 * It uses the `useTextMetrics` and `useCheckFilters` hooks to manage character limit error message.
 */
export function TextArea() {
  const { countWords, letterCount } = useTextMetrics();

  const { charLimit, limitChecked } = useCheckFilters();

  const exceedErrorChecks =
    limitChecked && charLimit && letterCount > Number(charLimit);

  return (
    <div className='text-area'>
      <textarea
        data-testid='text-area-input'
        className='text-area__input fs-body--md'
        onChange={countWords}
      />

      {exceedErrorChecks && (
        <span
          data-testid='exceed-error'
          className='text-area__error'
        >
          <InfoIcon
            aria-hidden
            data-testid='exceed-error-icon'
          />{' '}
          Limit reached! Your text exceeds {charLimit} characters. (
          {charLimit - letterCount})
        </span>
      )}
    </div>
  );
}
