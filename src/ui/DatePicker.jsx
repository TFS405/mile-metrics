import { createContext, useContext } from 'react';
import {
  DatePicker as AriaDatePicker,
  Button as AriaButton,
  DateInput,
  DateSegment,
  FieldError,
  Group,
  Label,
  OverlayArrow,
} from 'react-aria-components';

import {
  Popover as AriaPopOver,
  DialogTrigger,
} from 'react-aria-components/Popover';
import handleError from '../utils/handleError';

// Create context
const datePickerContext = createContext(null);
function useDatePickerContext() {
  const context = useContext(datePickerContext);

  if (context === null) handleError('Must be used inside <DatePicker>');

  return context;
}

const DatePicker = ({
  labelValue,
  classNames: {
    label: labelClassName,
    inputGroup,
    input: dateInputClassName,
  } = {},
  children,
}) => {
  return (
    <AriaDatePicker>
      <Label className={labelClassName}>{labelValue}</Label>
      <Group className={inputGroup}>
        <DateInput className={dateInputClassName}>
          {(segment) => (
            <DateSegment
              segment={segment}
              className={segment.type === 'literal' ? 'px-px' : ''}
            />
          )}
        </DateInput>
        <datePickerContext.Provider value={{ useDatePickerContext }}>
          {/* POPOVER GOES ⬇️ */}
          {children}
        </datePickerContext.Provider>
      </Group>
      <FieldError />
    </AriaDatePicker>
  );
};

const Popover = ({
  trigger,
  content,
  placement,
  offset,
  crossOffset,
  showArrow = false,
}) => (
  <DialogTrigger>
    <AriaButton>{trigger}</AriaButton>
    <AriaPopOver
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...(showArrow ? { showArrow } : {})}
    >
      <OverlayArrow />
      {content}
    </AriaPopOver>
  </DialogTrigger>
);

DatePicker.Popover = Popover;

export default DatePicker;
