import { Button as HeadlessButton } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

export default function Button({
  type = 'button',
  disabled = false,
  className = '',
  children = '',
  onClick = undefined,
}) {
  return (
    <HeadlessButton
      type={type}
      disabled={disabled}
      className={twMerge(
        `rounded-xl border-2 border-slate-500 bg-slate-50 p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-300 hover:text-slate-600 focus:outline-none focus-visible:border-emerald-500 focus-visible:shadow focus-visible:ring-3 focus-visible:ring-emerald-500 active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </HeadlessButton>
  );
}
