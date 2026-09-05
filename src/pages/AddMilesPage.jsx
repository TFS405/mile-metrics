import { Form } from 'react-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { insertMileageEntry } from '../features/mileage/mileageApi';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FieldLabel from '../ui/FieldLabel';
import DatePicker from '../ui/DatePicker';
import { Button } from '@base-ui/react';
import Calendar from '../ui/Calendar';
import ControlledNumericField from '../ui/ControlledNumericField';
import cn from '../utils/cn';

import {
  BriefcaseBusiness,
  CalendarFold,
  HeartHandshake,
  User,
} from 'lucide-react';
import { BoltIcon } from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';
import RadioTile from '../ui/RadioTile';
import MileageLocationFields from '../features/mileage/MileageLocationFields';

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
          category: null,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'locations',
  });

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

      await insertMileageEntry(payload);
      queryClient.invalidateQueries({ queryKey: ['miles'] });

      toast.success('Mileage entry successfully saved');
      reset();
    } catch (err) {
      toast.error('Could not save your entry, try again');
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
    return;
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className='flex w-full justify-center'
    >
      {/* FORM CONTENT */}
      <div className=''>
        {/* HEADER */}
        <div className='flex w-max flex-col gap-2.75 pt-2 pb-6'>
          <h1 className='flex items-center gap-1.5 text-5xl font-bold tracking-wide text-nowrap text-gray-600'>
            Mileage Tracking Made Faster
            <BoltIcon
              aria-hidden='true'
              className='mt-1.5 size-4.5 shrink-0 text-emerald-700'
            />
          </h1>
          <p className='text-center text-sm tracking-tight text-gray-400'>
            Create clear, dependable mileage records—IRS-aligned and tax-ready.
          </p>
        </div>

        {/* CONTAINER */}
        <div className='flex w-3xl max-w-full flex-col justify-center divide-y-2 divide-gray-200'>
          {/* Date & mile inputs container */}
          <div className='mb-4 flex justify-evenly pb-6'>
            {/* Date */}
            <div className='flex flex-col gap-0.5'>
              <FieldLabel className='text-md text-center'>Date</FieldLabel>
              {/* DATE INPUT */}
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

            {/* INITIAL MILES */}
            <div className='flex flex-col gap-0.5 text-center'>
              <FieldLabel
                className='text-md text-center'
                htmlFor='initial-odometer'
              >
                Initial Miles
              </FieldLabel>

              <ControlledNumericField
                control={control}
                name='initialMiles'
                rules={{
                  required: 'Please provide the starting odometer value',
                }}
                id='initial-odometer'
                placeholder='Starting miles...'
                svg={
                  <Icon
                    icon='solar:spedometer-low-broken'
                    className='text-gray-400'
                  />
                }
                className={cn(
                  'w-40 rounded-sm border border-gray-200 bg-white py-0.5 text-center text-sm text-gray-600 transition-all duration-100 focus:ring-3 focus:ring-emerald-500 focus:outline-none focus-visible:ring-offset-2',
                )}
              />
            </div>

            {/* ENDING MILES */}
            <div className='flex flex-col'>
              <FieldLabel
                className='text-md pb-1 text-center'
                htmlFor='odometer-end'
              >
                Ending Miles
              </FieldLabel>

              <ControlledNumericField
                control={control}
                name='endingMiles'
                rules={{
                  required: 'Please provide the ending odometer value',
                  validate: (value) =>
                    Number(value) > Number(getValues('initialMiles')) ||
                    'Ending miles must be greater than starting miles',
                }}
                id='odometer-end'
                placeholder='Ending miles...'
                svg={
                  <Icon
                    icon='solar:spedometer-max-broken'
                    className='text-gray-400'
                  />
                }
                className='w-40 rounded-sm border border-gray-200 bg-white py-0.5 text-center text-sm text-gray-600 transition-all duration-100 focus:ring-3 focus:ring-emerald-500 focus:outline-none focus-visible:ring-offset-2'
              />
            </div>
          </div>

          {/* Location Selection & tags container */}
          <div className='mb-5 flex flex-col pb-4'>
            <div className='relative mb-7 h-35 snap-y snap-mandatory scrollbar-gutter-stable overflow-y-auto'>
              {fields.map((field, index) => (
                <div key={field.id} className='h-full shrink-0 snap-start'>
                  {/* LOCATION COUNTER */}
                  <div>
                    <p className='px-1 py-px text-sm font-semibold tracking-tight text-gray-400'>
                      {`Location ${index + 1}`}
                    </p>
                  </div>

                  {/* LOCATION SELECTORS */}
                  <div className='flex justify-evenly pb-6'>
                    <MileageLocationFields
                      control={control}
                      index={index}
                      resetField={resetField}
                    />
                  </div>

                  {/* TILES */}
                  <div className='mb-5'>
                    <Controller
                      control={control}
                      name={`locations.${index}.category`}
                      rules={{
                        required: 'Please select a category for all locations',
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <RadioTile
                          value={value}
                          onChange={onChange}
                          onBlur={(e) => {
                            onChange(e.target.value);
                            onBlur(e);
                          }}

                          label='category'
                          options={[
                            {
                              value: 'personal',
                              content: (
                                <>
                                  <User
                                    size={19}
                                    className='mr-auto group-data-selected:text-emerald-600'
                                  />
                                  <p className='ml-auto'>Personal</p>
                                </>
                              ),
                            },
                            {
                              value: 'business',
                              content: (
                                <>
                                  <BriefcaseBusiness
                                    size={19}
                                    className='mr-auto group-data-selected:text-emerald-600'
                                  />
                                  <p className='ml-auto'>Business</p>
                                </>
                              ),
                            },

                            {
                              value: 'charity',
                              content: (
                                <>
                                  <HeartHandshake
                                    size={19}
                                    className='mr-auto group-data-selected:text-emerald-600'
                                  />
                                  <p className='ml-auto'>Charity</p>
                                </>
                              ),
                            },
                          ]}
                          classNames={{
                            radioLabel: cn('sr-only'),
                            radioGroup: cn('flex justify-evenly'),
                            radioField: cn(''),
                            radioButton: cn(
                              'group flex cursor-pointer place-items-center gap-2 rounded-sm border border-gray-300 px-1.5 py-0.5 text-sm tracking-tighter text-gray-500 transition-all duration-90 hover:scale-105 active:scale-90 active:text-gray-400 data-focus-visible:ring-2 data-focus-visible:ring-emerald-500 data-focus-visible:ring-offset-3 data-hovered:scale-105 data-hovered:text-gray-600 data-selected:border-emerald-600 data-selected:font-medium data-selected:text-emerald-700',
                            ),

                            textInputContainer: cn(
                              'group rounded-sm border border-gray-300 px-1 py-px focus-within:border-emerald-600 data-selected:border-emerald-600',
                            ),
                            textInput: cn(
                              'group font-medium text-gray-500 group-data-selected:text-emerald-700 focus-within:text-emerald-700 data-selected:placeholder:text-gray-400',
                            ),
                            textInputSVG: cn(
                              'text-gray-500 transition-all duration-90 group-focus-within:text-emerald-700 group-data-selected:text-emerald-700',
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add location */}
            <Button
              type='button'
              className='mx-auto w-fit cursor-pointer rounded-xs text-sm font-semibold text-gray-400 transition-all duration-100 outline-none hover:scale-105 hover:text-gray-500 focus-visible:ring-3 focus-visible:ring-emerald-500 focus-visible:ring-offset-3 active:scale-95 active:text-slate-400'
              onClick={() => {
                append({
                  country: null,
                  region: null,
                  locality: null,
                  category: null,
                });
              }}
            >
              Add location
            </Button>
          </div>

          {/* NOTES */}
          <div className='mb-5 flex flex-col gap-1.5 pb-10'>
            <FieldLabel className='text-center' htmlFor='notes'>
              Notes
            </FieldLabel>

            <textarea
              {...register('notes')}
              id='notes'
              placeholder='Notes...'
              className='h-full w-15/16 resize-none self-center rounded-xl border border-gray-300 bg-slate-50 p-3 text-gray-600 transition-all duration-100 outline-none placeholder:text-gray-300 focus:ring-4 focus:ring-emerald-500 focus-visible:ring-offset-3'
            ></textarea>
          </div>

          {/* SUBMIT */}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='text-md mx-auto w-100 rounded-lg border border-gray-300 bg-emerald-600 p-2.5 text-center font-bold tracking-wider text-white ring-offset-2 transition-all duration-150 hover:cursor-pointer hover:bg-emerald-700 focus:ring-3 focus:ring-emerald-600 focus:outline-none active:scale-95 active:bg-emerald-500'
          >
            {isSubmitting ? <span>...Submitting</span> : 'Submit'}
          </Button>
        </div>
      </div>
    </Form>
  );
}
