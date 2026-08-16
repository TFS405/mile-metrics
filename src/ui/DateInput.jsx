import { DayPicker } from '@daypicker/react';
import 'react-day-picker/style.css';
import '@daypicker/react/style.css';
import * as Popover from '@radix-ui/react-popover';
import { InputMask } from '@react-input/mask';
import { ArrowDown, CalendarDays } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useSearchParams } from 'react-router';
import { formatDate } from '../utils/dateUtils';
import { useRef, useState } from 'react';
import { validateDate } from '../utils/validationUtils';
import { getLocaleDateFormat, parseDate } from '../utils/formattingUtils';

const DateInput = ({
  className = '',
  searchParamName = '',
  popover: { side, align, sideOffset } = {},
}) => {
  // State ~ Refs ~ Search Params
  const [validationResponse, setValidationResponse] = useState({
    hasError: false,
    payload: '',
  });
  const timerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const hasValidationResponse = validationResponse.hasError;
  // const hasFilterVal = Boolean(filterVal);

  const filterVal = searchParams.get(searchParamName) ?? '';

  const dateFormatFull = getLocaleDateFormat({
    formatStyle: 'full',
    includeSpaces: true,
  });

  const dateFormatLong = getLocaleDateFormat({
    formatStyle: 'long',
    includeSpaces: false,
    uppercase: {
      day: true,
      month: true,
      year: true,
    },
  });
  const dateFormatStandard = getLocaleDateFormat({
    formatStyle: 'long',
    includeSpaces: false,
    uppercase: {
      day: false,
      month: true,
      year: false,
    },
  });

  const mask = dateFormatLong.replace(/[ymd]/gi, '_');

  function setTimer(fn, timeout) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(fn, timeout);
  }

  function handleChange({ date, searchParamName, e }) {
    const givenDate = date ?? e?.target.value ?? '';

    if (!givenDate) {
      setValidationResponse({ ...validationResponse, hasError: false });
      searchParams.set(searchParamName, givenDate);
      setSearchParams(searchParams);
      return;
    }

    const parsedDate = parseDate(givenDate, dateFormatStandard, new Date());

    setValidationResponse({ ...validationResponse, hasError: false });
    searchParams.set(searchParamName, givenDate);
    setSearchParams(searchParams);

    setTimer(() => {
      const formattedDate = formatDate(parsedDate, 'yyyy-MM-dd');

      const validationResults = validateDate(formattedDate, dateFormatLong);
      const { hasError, payload } = validationResults;

      setValidationResponse({ hasError, payload });
    }, 3000);
  }

  return (
    <div>
      <p className="font-data flex items-center justify-center pb-0.5 tracking-tighter text-slate-500/60 capitalize italic">
        {dateFormatFull}
      </p>

      <Popover.Root open={hasValidationResponse}>
        <Popover.Anchor>
          <div
            className={twMerge(
              `px-1s flex items-center justify-center rounded-full border border-slate-400 bg-white py-1`,
              className,
            )}
          >
            <InputMask
              className="rounded-full text-center font-medium tracking-wider text-slate-700 outline-0"
              mask={mask}
              replacement={{ _: /\d/ }}
              value={filterVal}
              onChange={(e) => handleChange({ searchParamName, e })}
            />

            <Popover.Root>
              <Popover.Trigger>
                <div className="pr-2">
                  <CalendarDays
                    className="cursor-pointer text-slate-600 transition-all duration-100 hover:text-slate-700 active:scale-90"
                    size={20}
                  />
                </div>
              </Popover.Trigger>

              <Popover.Content
                side={side}
                align={align}
                sideOffset={sideOffset}
              >
                <DayPicker
                  mode="single"
                  className="rounded-4xl bg-white p-5 text-slate-800"
                  onSelect={(date) =>
                    handleChange({ date, searchParamName: searchParamName })
                  }
                />
              </Popover.Content>
            </Popover.Root>
          </div>
        </Popover.Anchor>
        <Popover.Content className="outline-none" side="top" sideOffset={5}>
          <div className="font-data bg-slate-50 font-medium text-red-600 outline-none">
            <p className="font-data text-xs tracking-tight">
              {hasValidationResponse &&
                Object.values(validationResponse.payload)[0]}
            </p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default DateInput;
