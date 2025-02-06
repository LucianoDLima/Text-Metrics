import { useCheckBox, useTextMetric } from '@features/textArea/hooks';
import { CheckBox } from '../checkBox/checkBox';
import { ExceedError } from '../exceedError/exceedError';
import { AproxTime } from '../aproxTime/aproxTime';
import './textArea.scss';

export function TextArea() {
  const { countWords, readingTime, letterCount } = useTextMetric();

  const {
    spaceChecked,
    limitChecked,
    charLimit,
    toggleSpace,
    toggleLimit,
    handleCharLimit,
  } = useCheckBox();

  return (
    <div className='text-area'>
      <div className='text-area__input-wrapper'>
        <textarea
          data-testid='text-area-input'
          className='text-area__input fs-body--md text-clr--secondary bg-clr--primary border-clr--primary'
          onChange={countWords}
        />

        {letterCount > Number(charLimit) && charLimit && (
          <ExceedError charAmount={charLimit} exceedAmount={charLimit - letterCount} />
        )}
      </div>

      <div className='text-area__filter'>
        <form className='text-area__filter text-clr--secondary'>
          <CheckBox
            id='space'
            checked={spaceChecked}
            checkboxHandler={toggleSpace}
            label='Exclude Spaces'
          />

          <CheckBox
            id='limit'
            checked={limitChecked}
            checkboxHandler={toggleLimit}
            label='Set Charater Limit'
          >
            <div className='text-area__filter__limit-input'>
              <label
                className='screen-reader'
                htmlFor='limit-input'
              >
                Type the character limit
              </label>

              <input
                className='filter__ch-limit  border-clr--primary fs-body--sm'
                id='limit-input'
                type='text'
                min={1}
                value={charLimit}
                onChange={handleCharLimit}
              />
            </div>
          </CheckBox>
        </form>

        <AproxTime readingTime={readingTime} />
      </div>
    </div>
  );
}
