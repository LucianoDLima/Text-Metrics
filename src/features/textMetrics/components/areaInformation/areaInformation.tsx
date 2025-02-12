import {
  useCheckFilters,
  useTextMetrics,
} from '@features/textMetrics/provider';
import { AproxTime } from '../aproxTime/aproxTime';
import { CheckBox } from '../checkBox/checkBox';
import './areaInformation.scss';
import { CharLimitInput } from '../charLimitInput/charLimitInput';

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
    <div className='area-info'>
      <form>
        <CheckBox
          id='space-check'
          checked={spaceChecked}
          checkboxHandler={toggleSpace}
          label='Exclude Spaces'
        />

        <div className='area-info__limit'>
          <CheckBox
            id='limit-check'
            checked={limitChecked}
            checkboxHandler={toggleLimit}
            label='Set Charater Limit'
          />

          {limitChecked && (
            <CharLimitInput
              charLimit={charLimit}
              handleCharLimit={handleCharLimit}
            />
          )}
        </div>
      </form>

      <AproxTime readingTime={readingTime} />
    </div>
  );
}
