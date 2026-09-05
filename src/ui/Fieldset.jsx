import { Field, Fieldset as HeadlessFieldset, Legend } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { twMerge } from 'tailwind-merge';

const Fieldset = ({
  legend,
  options = [],
  classNames: { container: containerClassName, field: fieldClassName } = {},
  renderAsCol = true,
}) => (
  <HeadlessFieldset>
    {legend}

    <div className={containerClassName}>
      {options.map(({ id, label, description, input }) => (
        <Field
          className={twMerge(
            clsx('relative flex', renderAsCol && 'flex-col'),
            fieldClassName,
          )}
          key={id}
        >
          {label}
          {description}
          <div className="flex place-content-center">{input}</div>
        </Field>
      ))}
    </div>
  </HeadlessFieldset>
);

export default Fieldset;
