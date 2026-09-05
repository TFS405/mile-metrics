import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Select = ({
  portal,
  anchor,
  options,
  value,
  onChange,
  optionsMessage,
  inputPlaceholder,
  label,
  toggleIndicator = <ChevronDown />,
  classNames = {},
}) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options?.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <div className={twMerge('w-36', classNames.container)}>
      <Combobox
        immediate
        value={value}
        onChange={onChange}
        onClose={() => setQuery('')}
      >
        <div className='relative flex flex-col'>
          {label && <label className={classNames.label}>{label}</label>}

          <div className='relative'>
            <ComboboxInput
              spellCheck={false}
              autoCorrect='off'
              className={twMerge(
                `w-full rounded-sm bg-white ${toggleIndicator ? 'pr-8' : ''}`,
                classNames.input,
                value && classNames.selectedInput,
              )}
              displayValue={(option) => option ?? ''}
              placeholder={inputPlaceholder || '...select an option...'}
              onChange={(event) => setQuery(event.target.value)}
            />

            {toggleIndicator && (
              <ComboboxButton className='group absolute inset-y-0 -right-9 flex items-center px-2'>
                {toggleIndicator}
              </ComboboxButton>
            )}
          </div>

          <ComboboxOptions
            portal={portal}
            anchor={anchor}
            className={twMerge('z-50 border bg-white', classNames.optionsPanel)}
          >
            {optionsMessage && (
              <div
                className={twMerge(
                  'w-full bg-white',
                  classNames.optionsMessage,
                )}
              >
                {optionsMessage}
              </div>
            )}

            {filteredOptions?.length ? (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option}
                  value={option}
                  className={twMerge('cursor-pointer', classNames.option)}
                >
                  {option}
                </ComboboxOption>
              ))
            ) : (
              <div
                className={twMerge('text-sm text-pretty', classNames.option)}
              >
                No options available
              </div>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default Select;
