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

  const customRadioRef = useRef(null);
  const customInputRef = useRef(null);

  const handleCustomChange = (text) => {
    setCustomValue(text);
  };

  const selectCustomValue = () => {
    onChange(customValue);
  };

  const handleCustomBlur = (e) => {
    selectCustomValue();
    onBlur?.(e);
  };

  return (
    <RadioGroup
      className={classNames.radioGroup}
      value={value}
      onChange={onChange}
    >
      <Label className={classNames.radioLabel}>{label}</Label>

      {options.map((option, index) => (
        <RadioField
          key={option.value}
          value={option.value}
          className={classNames.radioField}
          onFocus={() => {
            if (index === 0 && !value) {
              onChange(option.value);
            }
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
          inputRef={customRadioRef}
          onFocus={(e) => {
            if (e.target === customRadioRef.current) {
              customInputRef.current?.focus();
            }
          }}
          className={cn(
            'flex cursor-pointer place-items-center items-center justify-evenly gap-1',
            classNames.textInputContainer,
          )}
        >
          <RadioButton>
            <Pencil size={17} className={classNames.textInputSVG} />
          </RadioButton>

          <TextField
            value={customValue}
            onFocus={selectCustomValue}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            className={cn('flex items-center gap-2 px-1', classNames.textField)}
          >
            <Label className='sr-only'>Custom tag</Label>

            <TextArea
              ref={customInputRef}
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
