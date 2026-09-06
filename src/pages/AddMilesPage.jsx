import { Form } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import SubmitButton from '../features/mileage/form/SubmitButton';

import FormHeader from '../features/mileage/form/FormHeader';
import FormDatePicker from '../features/mileage/form/FormDatePicker';
import FormMilesInput from '../features/mileage/form/FormMilesInput';
import FormNotes from '../features/mileage/form/FormNotes';
import AddLocationButton from '../features/mileage/form/AddLocationButton';
import { useRef } from 'react';
import LocationEntry from '../features/mileage/form/LocationEntry';
import { LocationEntryContext } from '../features/mileage/form/LocationEntryContext';

export default function AddMilesPage() {
  const queryClient = useQueryClient();

  // Refs
  const radioGroupRef = useRef(null);
  const addLocationRef = useRef(null);

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
    console.log({ onSubmit: 'SUBMITTED' });
    // try {
    //   const payload = {
    //     date: data.date,
    //     notes: data.notes,
    //     initialMiles: Number(data.initialMiles),
    //     endingMiles: Number(data.endingMiles),
    //     locations: [...data.locations].flat(),
    //   };

    //   await insertMileageEntry(payload);
    //   queryClient.invalidateQueries({ queryKey: ['miles'] });

    //   toast.success('Mileage entry successfully saved');
    //   reset();
    // } catch (err) {
    //   toast.error('Could not save your entry, try again');
    //   console.log(err);
    // }
  };
  const onError = (errors) => {
    console.log({ onError: 'ATTEMPTED TO SUBMIT' });
    //   if (errors.date) {
    //     toast.error(errors.date.message);
    //   }
    //   if (errors.initialMiles) {
    //     toast.error(errors.initialMiles.message);
    //   }
    //   if (errors.endingMiles) {
    //     toast.error(errors.endingMiles.message);
    //   }
    //   if (errors.locations) {
    //     toast.error(errors.locations.message);
    //   }
    //   return;
    // };
  };

  const handleKeyDownCapture = (e) => {
    if (radioGroupRef.current.contains(e.target))
      if (e.key === 'Enter') {
        (e) => console.log('FORM:', e.key, e.target);
        e.preventDefault();
        addLocationRef.current?.focus();
      }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className='flex w-full justify-center'
    >
      <div>
        <div className='flex items-center justify-center pb-5'>
          <FormHeader />
        </div>

        {/* Main form content */}
        <div className='flex w-4xl flex-col justify-center divide-y-2 divide-gray-200'>
          <div className='mb-4 flex justify-evenly pb-6'>
            {/* Date input */}
            <FormDatePicker />

            {/* Initial Miles input */}
            <FormMilesInput
              control={control}
              mode='initial'
              getValues={getValues}
            />

            {/* Ending Miles input */}
            <FormMilesInput
              control={control}
              mode='ending'
              getValues={getValues}
            />
          </div>

          {/* Location Selection & tags */}
          <div
            onKeyDownCapture={handleKeyDownCapture}
            className='mb-5 flex flex-col pb-4'
          >
            <LocationEntryContext.Provider value={radioGroupRef}>
              <LocationEntry
                fields={fields}
                control={control}
                resetField={resetField}
              />
            </LocationEntryContext.Provider>

            <AddLocationButton ref={addLocationRef} append={append} />
          </div>

          {/* Notes */}
          <div className='mb-5 flex flex-col gap-1.5 pb-10'>
            <FormNotes register={register} />
          </div>

          {/* Submit */}
          <SubmitButton isSubmitting={isSubmitting} />
        </div>
      </div>
    </Form>
  );
}
