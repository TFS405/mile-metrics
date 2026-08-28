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
import { twMerge } from 'tailwind-merge';

const DatePicker = ({
  labelValue,
  classNames: {
    label: labelClassName,
    inputGroup,
    input: dateInputClassName,
    segment: segmentClassName,
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
              className={twMerge(
                segment.type === 'literal' ? 'px-px' : '',
                segmentClassName,
              )}
            />
          )}
        </DateInput>
        {/* POPOVER GOES ⬇️ */}
        {children}
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
  buttonClassName,
}) => (
  <DialogTrigger>
    <AriaButton className={buttonClassName}>{trigger}</AriaButton>
    <AriaPopOver
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
    >
      <OverlayArrow />
      {content}
    </AriaPopOver>
  </DialogTrigger>
);

DatePicker.Popover = Popover;

export default DatePicker;
