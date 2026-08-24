import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Checkbox = ({
  className,
  classNames: {
    container: containerClassName,
    checkbox: checkboxClassName,
    checkmark: checkmarkClassName,
  } = {},
  value,
  id,
  validation: { register, registeredName, validationMessage } = {},
  ...inputProps
}) => {
  const registration =
    typeof register === 'function' && registeredName
      ? register(
          registeredName,
          validationMessage ? { required: validationMessage } : undefined,
        )
      : {};

  return (
    <span
      className={twMerge(
        'inline-grid size-4 shrink-0 place-items-center align-middle',
        containerClassName,
      )}
    >
      <input
        {...inputProps}
        {...registration}
        id={id}
        value={value}
        type="checkbox"
        className={twMerge(
          `peer col-start-1 row-start-1 m-0 size-full cursor-pointer appearance-none border border-black bg-transparent checked:bg-black`,
          className,
          checkboxClassName,
        )}
      />

      <Check
        aria-hidden="true"
        className={twMerge(
          `pointer-events-none col-start-1 row-start-1 hidden size-full stroke-3 text-white peer-checked:block`,
          checkmarkClassName,
        )}
      />
    </span>
  );
};

export default Checkbox;
