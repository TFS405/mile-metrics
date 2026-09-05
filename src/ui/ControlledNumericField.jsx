import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const ControlledNumericField = ({
  control,
  name,
  rules,
  id,
  className,
  placeholder,
  svg,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <div className='relative flex flex-col'>
          <div className='absolute top-1/2 left-1 -translate-y-2'>{svg}</div>

          <NumericFormat
            id={id}
            name={field.name}
            value={field.value ?? ''}
            onBlur={field.onBlur}
            thousandSeparator=','
            className={className}
            placeholder={placeholder}
            onValueChange={(values) => field.onChange(values.floatValue)}
          />
        </div>
      )}
    />
  );
};

export default ControlledNumericField;
