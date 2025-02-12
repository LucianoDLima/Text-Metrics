import { ExceedError } from '../exceedError/exceedError';
import { useCheckFilters, useTextMetrics } from '@features/textArea/provider';
import './textArea.scss';
import { AreaInformation } from '../areaInformation/areaInformation';

export function TextArea() {
  const { countWords, letterCount } = useTextMetrics();

  const { charLimit, limitChecked } = useCheckFilters();

  const exceedErrorChecks =
    limitChecked && charLimit && letterCount.letters > Number(charLimit);

  return (
    <div className='text-area'>
      <div className='text-area__input-wrapper'>
        <textarea
          data-testid='text-area-input'
          className='text-area__input fs-body--md text-clr--secondary bg-clr--primary border-clr--primary'
          onChange={countWords}
        />

        {exceedErrorChecks && (
          <ExceedError
            charAmount={charLimit}
            exceedAmount={charLimit - letterCount.letters}
          />
        )}
      </div>

      <AreaInformation />
    </div>
  );
}
