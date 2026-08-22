import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
  Label,
} from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
// import handleError from '../utils/handleError';

const Select = ({
  options,
  selectedOptionState,
  stateSetter,
  placeholder,
  buttonLabel,
  label,
  listStatusIndicator = <ChevronDown />,
  classNames: {
    placeholder: placeholderClassName,
    container: containerClassName,
    label: labelClassName,
    listboxButton: listboxButtonClassName,
    listboxOptions: listboxOptionsClassName,
    listboxOption: listboxOptionClassName,
    selectedOption: selectedOptionClassName,
  } = {},
}) => {
  return (
    <div className={twMerge('w-36', containerClassName)}>
      <Listbox value={selectedOptionState} onChange={stateSetter}>
        <div className="relative flex flex-col">
          {label && <label className={labelClassName}>{label}</label>}

          <ListboxButton
            className={twMerge(
              `w-full rounded-sm bg-white ${listStatusIndicator ? 'relative' : ''} `,
              listboxButtonClassName,
              selectedOptionState && selectedOptionClassName,
            )}
          >
            {selectedOptionState || buttonLabel || '...select an option...'}

            {listStatusIndicator}
          </ListboxButton>

          <ListboxOptions
            className={twMerge(
              'absolute top-full left-0 w-full border bg-white',
              listboxOptionsClassName,
            )}
          >
            <ListboxOption
              className={twMerge('w-full bg-white', placeholderClassName)}
              disabled={true}
            >
              {placeholder || 'Select an option'}
            </ListboxOption>
            {/* rendering options */}
            {options ? (
              options.map((option) => (
                <ListboxOption
                  key={option}
                  value={option}
                  className={twMerge('cursor-pointer', listboxOptionClassName)}
                >
                  {option}
                </ListboxOption>
              ))
            ) : (
              <ListboxOption className="text-pretty">
                No options provided
              </ListboxOption>
            )}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
