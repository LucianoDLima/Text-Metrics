import { useCheckFilters, useTextMetrics } from '@features/textArea/provider';
import { AproxTime } from '../aproxTime/aproxTime';
import { CheckBox } from '../checkBox/checkBox';
import './areaInformation.scss';

export function AreaInformation() {
  const { readingTime } = useTextMetrics();

  const {
    spaceChecked,
    limitChecked,
    charLimit,
    toggleSpace,
    toggleLimit,
    handleCharLimit,
  } = useCheckFilters();

  return (
    <div className='area-info text-clr--secondary'>
      <form>
        <CheckBox
          id='space-check'
          checked={spaceChecked}
          checkboxHandler={toggleSpace}
          label='Exclude Spaces'
        />

        <CheckBox
          id='limit-check'
          checked={limitChecked}
          checkboxHandler={toggleLimit}
          label='Set Charater Limit'
        >
          <div
            className='area-info__filter'
            data-testid='limit-filter-input'
          >
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
  );
}
