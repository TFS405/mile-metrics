import { BoltIcon } from '@heroicons/react/24/outline';

const FormHeader = () => {
  return (
    <div className='flex w-max flex-col gap-2.75'>
      <h1 className='flex items-center gap-1.5 text-5xl font-bold tracking-wide text-nowrap text-gray-600'>
        Mileage Tracking Made Faster
        <BoltIcon
          aria-hidden='true'
          className='mt-1.5 size-4.5 shrink-0 text-emerald-700'
        />
      </h1>

      <p className='text-center text-sm tracking-tight text-gray-400'>
        Create clear, dependable mileage records—IRS-aligned and tax-ready.
      </p>
    </div>
  );
};

export default FormHeader;
