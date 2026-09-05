import { Controller, useWatch } from 'react-hook-form';
import Select from '../../ui/Select';
import useGetGeoOptions from '../../hooks/useGetGeoOptions';
import { ChevronUp } from 'lucide-react';
import cn from '../../utils/cn';

const MileageLocationFields = ({ control, index, resetField }) => {
  const { countries, regions, localities } = useGetGeoOptions(control, index);

  const selectedCountry = useWatch({
    control,
    name: `locations.${index}.country`,
  });

  const selectedRegion = useWatch({
    control,
    name: `locations.${index}.region`,
  });

  const sharedSelectProps = {
    portal: true,
    anchor: 'bottom-start',
    toggleIndicator: (
      <ChevronUp
        size={23}
        className='text-gray-500 transition-all group-data-open:rotate-540'
      />
    ),
    classNames: {
      container: cn('font-data w-40'),
      optionsMessage: cn('px-1 py-0.5 text-sm text-gray-400'),
      label: cn(
        'text-md relative pb-0.5 text-center font-medium text-nowrap text-gray-600/90',
      ),
      input: cn(
        'group cursor-pointer border border-gray-200 p-1 text-center text-sm text-slate-400 outline-none placeholder:text-gray-400 hover:bg-slate-100',
      ),
      optionsPanel: cn(
        'z-50 !max-h-65 w-40 overflow-y-auto rounded-md border-gray-400 py-0.5 text-center outline-none',
      ),
      option: cn(
        'px-1 py-0.5 text-gray-600 capitalize hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200 data-focus:bg-slate-200',
      ),
      selectedInput: cn('text-gray-700'),
    },
  };

  return (
    <>
      {/* COUNTRY */}
      <Controller
        control={control}
        name={`locations.${index}.country`}
        rules={{
          required: 'Please select the country...',
        }}
        render={({ field }) => (
          <Select
            {...sharedSelectProps}
            options={countries.map((country) => country.name)}
            optionsMessage='Select a country...'
            label='Country'
            inputPlaceholder='Select a country...'
            value={field.value}
            onChange={(value) => {
              resetField(`locations.${index}.region`);
              resetField(`locations.${index}.locality`);
              field.onChange(value);
            }}
          />
        )}
      />
      {/* REGION */}
      <Controller
        control={control}
        name={`locations.${index}.region`}
        rules={{ required: 'Please select the region...' }}
        render={({ field }) => {
          return (
            <Select
              {...sharedSelectProps}
              options={regions.map((region) => region.name)}
              label={'Region'}
              optionsMessage={
                !selectedCountry
                  ? 'Select a country...'
                  : regions.length < 1
                    ? 'No regions found...'
                    : 'Select a region...'
              }
              inputPlaceholder={'Select a region...'}
              value={field.value}
              onChange={(value) => {
                resetField(`locations.${index}.locality`);

                field.onChange(value);
              }}
            />
          );
        }}
      />
      {/* LOCALITY */}
      <Controller
        control={control}
        name={`locations.${index}.locality`}
        rules={{ required: 'Please select the locality' }}
        render={({ field }) => (
          <Select
            {...sharedSelectProps}
            options={localities.map((locality) => locality.name)}
            label={'Locality'}
            optionsMessage={
              !selectedCountry
                ? 'Select a country...'
                : !selectedRegion
                  ? 'Select a region...'
                  : localities.length < 1
                    ? 'No localities found...'
                    : 'Select a locality...'
            }
            inputPlaceholder={'Select a locality...'}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
};

export default MileageLocationFields;
