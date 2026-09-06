import { Button } from 'react-aria-components';

const AddLocationButton = ({ append, ref }) => {
  return (
    <Button
      type='button'
      ref={ref}
      className='mx-auto w-fit cursor-pointer rounded-xs p-0.5 text-sm font-semibold text-gray-400 transition-all duration-100 outline-none hover:scale-105 hover:text-gray-500 focus-visible:ring-3 focus-visible:ring-emerald-500 active:scale-95 active:text-slate-400'
      onClick={() => {
        append({
          country: null,
          region: null,
          locality: null,
          category: null,
        });
      }}
    >
      Add location
    </Button>
  );
};

export default AddLocationButton;
