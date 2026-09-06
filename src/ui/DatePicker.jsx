import {
  DatePicker as AriaDatePicker,
  Button as AriaButton,
  DateInput,
  DateSegment,
  FieldError,
  Group,
  Label,
} from 'react-aria-components';

import {
  Popover as AriaPopover,
  DialogTrigger,
} from 'react-aria-components/Popover';

import { twMerge } from 'tailwind-merge';

const DatePicker = ({
  value,
  onChange,
  onBlur,
  label,
  classNames = {},
  children,
}) => {
  return (
    <AriaDatePicker value={value} onChange={onChange} onBlur={onBlur}>
      <Label className={classNames.label}>{label}</Label>
      <Group
        className={twMerge('relative flex items-center', classNames.group)}
      >
        {children}
        <DateInput className={twMerge('flex w-full', classNames.input)}>
          {(segment) => (
            <DateSegment
              onChange={() => console.log('changed')}

              segment={segment}
              className={({ isPlaceholder }) =>
                twMerge(
                  segment.type === 'literal' ? 'px-px' : '',
                  isPlaceholder ? classNames.placeholder : classNames.segment,
                )
              }
            />
          )}
        </DateInput>
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
}) => {
  return (
    <DialogTrigger>
      <AriaButton
        className={twMerge('absolute bottom-1 left-1', buttonClassName)}
      >
        {trigger}
      </AriaButton>

      <AriaPopover
        className='absolute'
        placement={placement}
        offset={offset}
        crossOffset={crossOffset}
      >
        {content}

        <div className='absolute -bottom-12 left-2 flex flex-col gap-1.5 text-xs text-nowrap text-gray-600'>
          <p className='flex gap-1.5'>
            <span className='size-4 rounded-full bg-blue-300' />
            <span className='font-medium'>Today</span>
          </p>

          <p className='flex gap-1.5'>
            <span className='size-4 rounded-full bg-emerald-400/85' />
            <span className='font-medium capitalize'>selected date</span>
          </p>
        </div>
      </AriaPopover>
    </DialogTrigger>
  );
};

DatePicker.Popover = Popover;

export default DatePicker;
