import { twMerge } from 'tailwind-merge';
import { Button as BaseUIButton } from '@base-ui/react/button';

export default function Button({
  type = 'button',
  disabled = false,
  className = '',
  children = '',
  onClick = undefined,
}) {
  return (
    <BaseUIButton
      type={type}
      disabled={disabled}
      className={twMerge(className)}
      onClick={onClick}
    >
      {children}
    </BaseUIButton>
  );
}
