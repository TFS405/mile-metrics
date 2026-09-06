import {
  Label,
  RadioButton,
  RadioField,
  RadioGroup,
  TextArea,
  TextField,
} from 'react-aria-components';
import { Pencil } from 'lucide-react';
import { useRef, useState } from 'react';
import cn from '../utils/cn';
import { useLocationContext } from '../features/mileage/form/LocationEntryContext';

const RadioTile = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  includeCustomTile = true,
  maxLength = 21,
  classNames = {},
}) => {
  // Remembers what was typed in the custom field so it isn't lost if the
  // user taps a preset tile and then comes back to "custom". Seeded from
  // `value` in case we're mounting with an existing custom value already set
  // (e.g. editing an entry whose category isn't one of the presets).
  const [customValue, setCustomValue] = useState(() =>
    value && !options.some((opt) => opt.value === value) ? value : '',
  );

  // Refs
  const radioGroupRef = useLocationContext();
  const lastRadioTileRef = useRef(null);
  const customRadioFieldRef = useRef(null);
  const textInputRef = useRef(null);

  // Handlers
  const handleCustomChange = (text) => {
    setCustomValue(text);
  };
  const selectCustomValue = (e) => {
    if (e.target?.value.length != 0) {
      console.log('value changed');
      onChange(customValue);
    }
  };
  const handleCustomBlur = (e) => {
    selectCustomValue(e);
    onBlur?.(e);
  };

  return (
    <RadioGroup
      ref={radioGroupRef}
      className={classNames.radioGroup}
      value={value}
      onChange={onChange}
    >
      <Label className={classNames.radioLabel}>{label}</Label>

      {options.map((option, index) => (
        <RadioField
          inputRef={index === options.length - 1 ? lastRadioTileRef : undefined}
          key={option.value}
          value={option.value}
          className={classNames.radioField}
          onFocus={() => {
            onChange(option.value);
          }}
        >
          <RadioButton className={classNames.radioButton}>
            {option.content}
          </RadioButton>
        </RadioField>
      ))}

      {/* Custom input */}
      {includeCustomTile && (
        <RadioField
          value={customValue}
          inputRef={customRadioFieldRef}
          // Move focus to text input
          onFocus={(e) => {
            if (e.target === customRadioFieldRef.current) {
              textInputRef.current?.focus();
            }
          }}
          className={cn(
            'flex place-items-center justify-evenly gap-1',
            classNames.textInputContainer,
          )}
        >
          <RadioButton>
            <Pencil size={17} className={classNames.textInputSVG} />
          </RadioButton>

          <TextField
            value={customValue}
            onFocus={(e) => selectCustomValue(e)}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            className={cn('flex items-center gap-2 px-1', classNames.textField)}
          >
            <Label className='sr-only'>Custom tag</Label>

            <TextArea
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
                  e.preventDefault();
                  e.stopPropagation();

                  lastRadioTileRef.current?.focus();
                }
              }}
              ref={textInputRef}
              placeholder='Custom tag'
              maxLength={maxLength}
              className={cn(
                'field-sizing-content min-h-6 max-w-25 resize-none pt-0.5 pr-1 text-sm tracking-tighter outline-none',
                classNames.textInput,
              )}
            />
          </TextField>
        </RadioField>
      )}
    </RadioGroup>
  );
};

export default RadioTile;
