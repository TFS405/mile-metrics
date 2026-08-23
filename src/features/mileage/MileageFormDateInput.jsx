import { ChevronUp } from 'lucide-react';
import { Controller, useWatch } from 'react-hook-form';
import Select from '../../ui/Select';
import useGetGeoOptions from '../../hooks/useGetGeoOptions';

const MileageFormDateInput = ({ control, index, resetField }) => {
  const { countries, regions, localities } = useGetGeoOptions(control, index);

  const selectedCountry = useWatch({
    control,
    name: `locations.${index}.country`,
  });

  const selectedRegion = useWatch({
    control,
    name: `locations.${index}.region`,
  });

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
            options={countries.map((country) => country.name)}
            optionsMessage={'Select a country...'}
            label={'Country'}
            inputPlaceholder={'Select a country...'}
            toggleIndicator={
              <ChevronUp
                size={23}
                className="text-slate-500 transition-all group-data-open:rotate-540"
              />
            }
            value={field.value}
            onChange={(value) => {
              resetField(`locations.${index}.region`);
              resetField(`locations.${index}.locality`);

              field.onChange(value);
            }}
            classNames={{
              container: 'font-data w-40',
              optionsMessage: 'px-1 py-0.5 text-sm text-slate-400',
              label: ' pb-0.5 text-center text-nowrap text-sm text-slate-500',
              input: `group outline-none cursor-pointer border p-1 shadow-sm text-slate-400 border-slate-400 hover:bg-slate-100`,
              optionsPanel:
                'outline-none z-50 overflow-auto max-h-100 py-0.5 shadow-sm border-slate-400 text-center rounded-md',
              option:
                'px-1 active:bg-slate-200 capitalize py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-700 data-focus:bg-slate-200',
              selectedInput: 'text-slate-700',
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
              toggleIndicator={
                <ChevronUp
                  size={23}
                  className="text-slate-500 transition-all group-data-open:rotate-540"
                />
              }
              value={field.value}
              onChange={(value) => {
                resetField(`locations.${index}.locality`);

                field.onChange(value);
              }}
              classNames={{
                container: 'font-data w-40',
                optionsMessage: 'px-1 py-0.5 text-sm text-slate-400',
                label:
                  'relative pb-0.5 text-center text-nowrap text-sm text-slate-500',
                input:
                  'group outline-none cursor-pointer border p-1 shadow-sm text-slate-400 border-slate-400 hover:bg-slate-100',
                optionsPanel:
                  'outline-none z-60 overflow-auto max-h-100 py-0.5 shadow-sm border-slate-400 text-center rounded-md',
                option:
                  'px-1 active:bg-slate-200 capitalize py-0.5 text-slate-600 hover:bg-slate-100 hover:text-slate-700 data-focus:bg-slate-200',
                selectedInput: 'text-slate-700',
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
            toggleIndicator={
              <ChevronUp
                size={23}
                className="text-slate-500 transition-all group-data-open:rotate-540"
              />
            }
            value={field.value}
            onChange={field.onChange}
            classNames={{
              container: 'font-data w-40  ',
              optionsMessage: 'px-1 py-0.5 text-sm text-slate-400',
              label:
                'relative pb-0.5 text-center text-nowrap text-sm text-slate-500',
              input:
                'group outline-none cursor-pointer border p-1 shadow-sm text-slate-400 border-slate-400 hover:bg-slate-100',
              optionsPanel:
                'outline-none overflow-auto z-70 max-h-100 py-0.5 shadow-sm border-slate-400 text-center rounded-md',
              option:
                'px-1 active:bg-slate-200 capitalize py-0.5 text-slate-600 hover:bg-slate-100 hover:text-slate-700 data-focus:bg-slate-200',
              selectedInput: 'text-slate-700',
            }}
          />
        )}
      />
    </>
  );
};

export default MileageFormDateInput;
