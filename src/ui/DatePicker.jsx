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
      className='absolute'
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
    >
      {content}
      <div className='absolute -bottom-12 left-2 flex flex-col gap-1.5 text-xs text-nowrap text-slate-600'>
        <p className='flex gap-1.5'>
          <span className='size-4 rounded-full bg-blue-300' />
          <span className='font-medium'>Today</span>
        </p>
        <p className='flex gap-1.5'>
          <span className='size-4 rounded-full bg-emerald-400/85' />
          <span className='font-medium capitalize'>selected date</span>
        </p>
      </div>
    </AriaPopOver>
  </DialogTrigger>
);

DatePicker.Popover = Popover;

export default DatePicker;
