import { Form } from 'react-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { insertMileageEntry } from '../mileage/mileageApi';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FieldLabel from '../../ui/FieldLabel';
import { NumericFormat } from 'react-number-format';
import MileageFormDateInput from './MileageFormDateInput';
import { ArrowDown, CalendarDays, Group } from 'lucide-react';
import Checkbox from '../../ui/Checkbox';
import Fieldset from '../../ui/Fieldset';
import { nanoid } from 'nanoid';
import { Input, Label } from '@headlessui/react';
import DatePicker from '../../ui/DatePicker';
import { Button } from '@base-ui/react';
import Calendar from '../../ui/Calendar';

export default function AddMilesForm() {
  const queryClient = useQueryClient();

  // Form instance
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      locations: [
        {
          country: null,
          region: null,
          locality: null,
        },
      ],
    },
  });

  const checkboxStyling = {
    container: '',
    checkbox: `
      rounded-sm border-slate-400 bg-white
      transition-colors
      hover:border-emerald-600
      checked:border-emerald-600
      checked:bg-emerald-600
      focus-visible:outline-none
      focus-visible:ring-3
      focus-visible:ring-emerald-500`,
    checkmark: 'stroke-2 text-white',
  };

  const options = (index) => {
    const registeredName = `locations.${index}.category`;

    const checkboxValidation = {
      register: register,
      registeredName,
      validationMessage: 'Please select a category',
    };

    return [
      {
        id: nanoid(),
        label: <Label className='italic'>Personal</Label>,
        input: (
          <Checkbox
            value='personal'
            classNames={checkboxStyling}
            validation={checkboxValidation}
          />
        ),
      },

      {
        id: nanoid(),
        label: <Label className='italic'>Business</Label>,
        input: (
          <Checkbox
            value='business'
            validation={checkboxValidation}
            classNames={checkboxStyling}
          />
        ),
      },
      {
        id: nanoid(),
        label: <Label className='italic'>Commute</Label>,
        input: (
          <Checkbox
            value='commute'
            validation={checkboxValidation}
            classNames={checkboxStyling}
          />
        ),
      },
      {
        id: nanoid(),
        label: (
          <Input
            type='text'
            placeholder='Custom tag...'
            className='b-1 mt-1 mb-1 h-6 w-30 rounded-full border border-slate-400 bg-white text-center text-sm italic outline-none focus-visible:ring-3 focus-visible:ring-emerald-500'
          />
        ),
        input: <Checkbox classNames={checkboxStyling} />,
      },
    ];
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locations',
  });
  // Props & ClassNames
  const datePickerProps = {
    labelValue: 'Date',

    classNames: {
      inputGroup:
        'flex gap-1.5 rounded-sm border border-slate-400 bg-white p-1 text-slate-600',

      label: 'flex justify-center font-medium text-slate-600',

      segment:
        'rounded-xs outline-none focus-visible:ring-3 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
    },
  };
  const popoverProps = {
    placement: 'start',
    offset: 120,
    crossOffset: 80,
    buttonClassName:
      'outline-none focus-visible:ring-3 rounded-sm focus-visible:ring-emerald-500 focus-visible:-ring-offset-10',
    trigger: (
      <CalendarDays
        className='mt-1 ml-0.5 -translate-x-px cursor-pointer text-slate-500 transition-all duration-100 hover:scale-105 hover:text-slate-600 active:scale-95 active:text-slate-500'
        size={19}
      />
    ),
    content: (
      <Calendar
        classNames={{
          container:
            'flex flex-col gap-1.5 rounded-xl border border-slate-300 bg-slate-50 py-2.5 shadow-md',

          calendarHeader: 'text-lg font-semibold text-slate-500',

          calendarHeaderCell: 'font-medium text-slate-500',

          group: 'flex items-center justify-evenly gap-1.5',

          arrowLeft:
            'cursor-pointer outline-none focus-visible:ring-3 rounded-sm focus-visible:ring-emerald-500 text-slate-500 active:text-slate-400',

          arrowRight:
            'cursor-pointer outline-none focus-visible:ring-3 rounded-sm focus-visible:ring-emerald-500 text-slate-500 active:text-slate-400',

          calendarCell:
            'grid size-9 cursor-pointer place-items-center rounded-full text-sm text-slate-500 data-hovered:rounded-full data-hovered:bg-slate-300 data-hovered:font-medium data-hovered:text-slate-600 data-outside-month:cursor-default data-outside-month:opacity-0 data-today:rounded-full data-today:bg-blue-200/70 data-today:font-medium data-today:text-slate-600 data-pressed:bg-slate-200 data-selected:bg-green-300  data-selected:text-slate-600 data-today:data-hovered:bg-slate-300 data-today:data-pressed:bg-slate-200 data-today:data-selected:bg-green-300 data-selected:data-pressed:bg-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ',
        }}
      />
    ),
  };

  // Handlers
  const onSubmit = async (data) => {
    try {
      const payload = {
        date: data.date,
        notes: data.notes,
        initialMiles: Number(data.initialMiles),
        endingMiles: Number(data.endingMiles),
        locations: [...data.locations].flat(),
      };

      console.log({ data, payload });
      return;
      await insertMileageEntry(payload);
      queryClient.invalidateQueries({ queryKey: ['miles'] });

      toast.success('Mileage entry successfully saved');
      reset();
    } catch (err) {
      toast.error('Could not save your entry, try again`');
      console.log(err);
    }
  };

  const onError = (errors) => {
    if (errors.date) {
      toast.error(errors.date.message);
    }
    if (errors.initialMiles) {
      toast.error(errors.initialMiles.message);
    }
    if (errors.endingMiles) {
      toast.error(errors.endingMiles.message);
    }
    if (errors.locations) {
      toast.error(errors.locations.message);
    }
    if (errors.locations) {
      toast.error(errors.locations.message);
    }
    return;
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className='font-data flex max-w-4xl flex-col rounded-xl border-2 border-slate-300 p-3 shadow-sm'
    >
      <div className='grid grid-cols-[auto_1fr] pt-0.5 pb-5 pl-1'>
        {/* DATE  */}
        <div className='flex pl-0.5'>
          <DatePicker {...datePickerProps}>
            <DatePicker.Popover {...popoverProps} />
          </DatePicker>
        </div>

        {/* INITIAL MILES */}
        <div className='flex items-end justify-center gap-15'>
          <div className='flex flex-col'>
            <FieldLabel
              className='self-center pb-1 text-lg font-medium'
              htmlFor='initial-odometer'
            >
              Initial Miles
            </FieldLabel>

            <Controller
              name='initialMiles'
              control={control}
              rules={{
                required: 'Please provide the starting miles',
              }}
              render={({ field }) => (
                <NumericFormat
                  value={field.value ?? ''}
                  thousandSeparator=','
                  id='initial-odometer'
                  className='rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none'
                  placeholder='Starting Miles...'
                  onValueChange={(values) => field.onChange(values.floatValue)}
                />
              )}
            />
          </div>

          {/* ENDING MILES */}
          <div className='flex flex-col'>
            <FieldLabel className='self-center pb-1' htmlFor='odometer-end'>
              Ending Odometer
            </FieldLabel>

            <Controller
              control={control}
              name='endingMiles'
              rules={{
                required: 'Please provide the ending miles',
                validate: (value) =>
                  Number(value) > Number(getValues('initialMiles')) ||
                  'Ending miles must be greater than starting miles',
              }}
              render={({ field }) => (
                <NumericFormat
                  id='odometer-end'
                  thousandSeparator=','
                  value={field.value ?? ''}
                  placeholder='Ending miles...'
                  className='rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none'
                  onValueChange={(values) => field.onChange(values.floatValue)}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col pb-6'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='mb-3 flex flex-col justify-around pb-2'
          >
            {/* Location Selectors */}
            <div className='flex justify-around pb-5'>
              <MileageFormDateInput
                control={control}
                index={index}
                resetField={resetField}
              />
            </div>
            {/* Checkboxes */}
            <Fieldset
              options={options(index)}
              classNames={{
                container:
                  'grid pr-3 w-full grid-cols-4 text-slate-600 font-data',
                field: 'gap-1 items-center',
              }}
            />

            {fields.length > 1 && (
              <ArrowDown
                size={20}
                className='absolute right-1/2 bottom-1.5 translate-x-1/2 text-slate-500'
              />
            )}
          </div>
        ))}

        {/* Remove & Add location */}
        <div className='flex justify-center gap-30'>
          {/* Remove location */}
          <Button
            type='button'
            className='hover:bg-slate-white border-slate-300 text-xs text-slate-400 shadow-xs hover:border-slate-400 hover:text-slate-500'
            onClick={() => {
              remove(-1);
            }}
          >
            Remove location
          </Button>
          {/* Add another location */}
          <Button
            type='button'
            className='hover:bg-slate-white border-slate-300 text-xs text-slate-400 shadow-xs hover:border-slate-400 hover:text-slate-500'
            onClick={() => {
              append({
                country: null,
                region: null,
                locality: null,
              });
            }}
          >
            Add location
          </Button>
        </div>
      </div>

      {/* Notes */}
      <div className='flex flex-col pb-7'>
        <FieldLabel className='mb-1 text-center' htmlFor='notes'>
          Notes
        </FieldLabel>
        <textarea
          {...register('notes')}
          id='notes'
          placeholder='Notes...'
          className='h-full w-15/16 self-center rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500 focus:outline-none'
        ></textarea>
      </div>

      <Button
        type='submit'
        disabled={isSubmitting}
        className='rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75'
      >
        {isSubmitting ? <span>...Submitting</span> : 'Submit'}
      </Button>
    </Form>
  );
}
