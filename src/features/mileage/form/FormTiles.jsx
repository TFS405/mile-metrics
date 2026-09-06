import { Controller } from 'react-hook-form';
import cn from '../../../utils/cn';
import RadioTile from '../../../ui/RadioTile';
import { BriefcaseBusinessIcon, HeartHandshakeIcon, User } from 'lucide-react';

const FormTiles = ({ control, index }) => {
  return (
    <div>
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
                    <BriefcaseBusinessIcon
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
                    <HeartHandshakeIcon
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
                'group flex cursor-pointer place-items-center gap-2 rounded-sm border border-gray-300 px-1.5 py-0.5 text-sm tracking-tighter text-gray-500 transition-all duration-90 hover:scale-105 active:scale-90 active:text-gray-400 data-focus-visible:ring-2 data-focus-visible:ring-emerald-500 data-hovered:scale-105 data-hovered:text-gray-600 data-selected:border-emerald-600 data-selected:font-medium data-selected:text-emerald-700',
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
  );
};

export default FormTiles;
