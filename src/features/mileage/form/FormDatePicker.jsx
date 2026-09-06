import { CalendarFold } from 'lucide-react';
import cn from '../../../utils/cn';
import FieldLabel from '../../../ui/FieldLabel';
import DatePicker from '../../../ui/DatePicker';
import Calendar from '../../../ui/Calendar';

const FormDatePicker = () => {
  return (
    <div className='flex flex-col gap-0.5'>
      <FieldLabel className='text-md text-center'>Date</FieldLabel>

      <DatePicker
        label='Date'
        classNames={{
          label: cn('sr-only'),
          group: cn(
            'mx-auto flex w-40 gap-1.5 rounded-sm border border-gray-200 bg-white p-1 text-sm text-gray-500',
          ),
          input: cn(
            'flex justify-center focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
          ),
          segment: cn(
            'rounded-xs transition-all duration-100 outline-none focus-visible:ring-3 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
          ),
          placeholder: cn(
            'rounded-xs text-gray-400 transition-all duration-100 outline-none focus-visible:ring-3 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
          ),
        }}
      >
        {/* DATE PICKER */}
        <DatePicker.Popover
          placement='start'
          offset={85}
          crossOffset={20}
          buttonClassName={cn(
            'rounded-xs transition-all duration-100 outline-none focus-visible:ring-3 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
          )}
          trigger={
            <CalendarFold
              className='ml-0.5 cursor-pointer text-gray-400/80 transition-all duration-100 hover:scale-105 hover:text-gray-500 active:scale-95 active:text-gray-400'
              size={19}
            />
          }
          content={
            <Calendar
              classNames={{
                container:
                  'flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-slate-50 py-2.5 shadow-md',
                headerGroup: 'flex items-center justify-evenly gap-1.5',
                calendarHeader: 'text-lg font-semibold text-gray-500',
                calendarHeaderCell: cn('font-medium text-gray-500'),
                arrowLeft:
                  'cursor-pointer outline-none focus-visible:ring-3 rounded-sm focus-visible:ring-emerald-500 text-gray-500 active:text-slate-400',
                arrowRight:
                  'cursor-pointer outline-none focus-visible:ring-3 rounded-sm focus-visible:ring-emerald-500 text-slate-500 active:text-slate-400',
                calendarCell:
                  'grid size-9 cursor-pointer place-items-center rounded-full text-sm text-gray-500 data-hovered:rounded-full data-hovered:bg-slate-300 data-hovered:font-medium data-hovered:text-slate-600 data-outside-month:cursor-default data-outside-month:opacity-0 data-today:rounded-full data-today:bg-blue-200/70 data-today:font-medium data-today:text-slate-600 data-pressed:bg-slate-200 data-selected:bg-green-300 data-selected:text-slate-600 data-today:data-hovered:bg-slate-300 data-today:data-pressed:bg-slate-200 data-today:data-selected:bg-green-300 data-selected:data-pressed:bg-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
              }}
            />
          }
        />
      </DatePicker>
    </div>
  );
};

export default FormDatePicker;
