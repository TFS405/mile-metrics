import { Form } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { insertMileageEntry } from '../mileage/mileageApi';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FieldLabel from '../../ui/FieldLabel';
import Button from '../../ui/Button';
import { NumericFormat } from 'react-number-format';

import MileageFormDateInput from './MileageFormDateInput';
import { useState } from 'react';

export default function AddMilesForm() {
  const queryClient = useQueryClient();

  const [tripIndex, setTripIndex] = useState(0);
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
    return;
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex max-w-4xl flex-col rounded-xl border-2 border-slate-300/75 p-3 shadow-sm"
    >
      {/* Date  */}
      <div className="flex flex-1 flex-col pb-5">
        <FieldLabel className="self-center pb-1" htmlFor="form-date">
          Trip Date
        </FieldLabel>
        <input
          id="form-date"
          type="date"
          className="rounded-xl border-2 border-slate-200/80 bg-white p-1 placeholder-slate-500/0 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          {...register('date', {
            required: 'Please provide the date',
            validate: (value) => {
              // value is already "YYYY-MM-DD" from the date input
              const todayString = new Date().toLocaleDateString('en-CA'); // gives "YYYY-MM-DD" in LOCAL time

              if (value > todayString) {
                return 'Please enter a trip date that is today or earlier';
              }

              const year = Number(value.slice(0, 4));
              if (year < 1900 || year > 9999) {
                return 'Please enter a realistic year';
              }

              return true;
            },
          })}
        />
      </div>

      {/* Mileage */}
      <div className="flex justify-evenly gap-7 pb-8">
        {/* Initial Miles */}
        <div className="flex flex-1 flex-col">
          <FieldLabel className="self-center pb-1" htmlFor="initial-odometer">
            Starting Odometer
          </FieldLabel>
          <Controller
            name="initialMiles"
            control={control}
            rules={{
              required: 'Please provide the starting miles',
            }}
            render={({ field }) => (
              <NumericFormat
                value={field.value ?? ''}
                thousandSeparator=","
                id="initial-odometer"
                className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Starting Miles..."
                onValueChange={(values) => field.onChange(values.floatValue)}
              />
            )}
          />
        </div>

        {/* Ending Miles */}
        <div className="flex flex-1 flex-col">
          <FieldLabel className="self-center pb-1" htmlFor="odometer-end">
            Ending Odometer
          </FieldLabel>

          <Controller
            control={control}
            name="endingMiles"
            rules={{
              required: 'Please provide the ending miles',
              validate: (value) =>
                Number(value) > Number(getValues('initialMiles')) ||
                'Ending miles must be greater than starting miles',
            }}
            render={({ field }) => (
              <NumericFormat
                id="odometer-end"
                thousandSeparator=","
                value={field.value ?? ''}
                placeholder="Ending miles..."
                className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                onValueChange={(values) => field.onChange(values.floatValue)}
              />
            )}
          />
        </div>
      </div>

      {/* Location selection */}
      <div className="flex justify-around pb-10">
        <MileageFormDateInput
          control={control}
          index={tripIndex}
          resetField={resetField}
        />
      </div>

      {/* Notes */}

      <div className="flex flex-col pb-7">
        <FieldLabel className="mb-1 text-center" htmlFor="notes">
          Notes
        </FieldLabel>
        <textarea
          {...register('notes')}
          id="notes"
          placeholder="Notes..."
          className="h-full w-15/16 self-center rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500 focus:outline-none"
        ></textarea>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75"
      >
        {isSubmitting ? <span>...Submitting</span> : 'Submit'}
      </Button>
    </Form>
  );
}
