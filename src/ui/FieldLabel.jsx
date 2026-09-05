import { twMerge } from 'tailwind-merge';

export default function sectionTitle({
  children,
  htmlFor = '',
  className = '',
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        `text-sm font-medium tracking-tight text-gray-600/90 capitalize`,
        className,
      )}
    >
      {children}
    </label>
  );
}
