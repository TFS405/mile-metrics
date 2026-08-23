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
  options,
  value,
  onChange,
  optionsMessage,
  inputPlaceholder,
  label,
  toggleIndicator = <ChevronDown />,
  classNames: {
    optionsMessage: optionsMessageClassName,
    container: containerClassName,
    label: labelClassName,
    input: inputClassName,
    optionsPanel: optionsPanelClassName,
    option: optionClassName,
    selectedInput: selectedInputClassName,
  } = {},
}) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options?.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <div className={twMerge('w-36', containerClassName)}>
      <Combobox
        immediate
        value={value}
        onChange={onChange}
        onClose={() => setQuery('')}
      >
        <div className="relative flex flex-col">
          {label && <label className={labelClassName}>{label}</label>}

          <div className="relative">
            <ComboboxInput
              spellCheck={false}
              autoCorrect="off"
              className={twMerge(
                `w-full rounded-sm bg-white ${toggleIndicator ? 'pr-8' : ''}`,
                inputClassName,
                value && selectedInputClassName,
              )}
              displayValue={(option) => option ?? ''}
              placeholder={inputPlaceholder || '...select an option...'}
              onChange={(event) => setQuery(event.target.value)}
            />

            {toggleIndicator && (
              <ComboboxButton className="group absolute inset-y-0 -right-9 flex items-center px-2">
                {toggleIndicator}
              </ComboboxButton>
            )}
          </div>

          <ComboboxOptions
            className={twMerge(
              'absolute top-full left-0 z-10 w-full border bg-white',
              optionsPanelClassName,
            )}
          >
            {optionsMessage && (
              <div
                className={twMerge('w-full bg-white', optionsMessageClassName)}
              >
                {optionsMessage}
              </div>
            )}

            {filteredOptions?.length ? (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option}
                  value={option}
                  className={twMerge('cursor-pointer', optionClassName)}
                >
                  {option}
                </ComboboxOption>
              ))
            ) : (
              <div className={twMerge('text-sm text-pretty', optionClassName)}>
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
