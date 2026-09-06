import { Button } from 'react-aria-components';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <Button
      type='submit'
      disabled={isSubmitting}
      className='text-md mx-auto w-100 rounded-lg border border-gray-300 bg-emerald-600 p-2.5 text-center font-bold tracking-wider text-white ring-offset-2 transition-all duration-150 hover:cursor-pointer hover:bg-emerald-700 focus:ring-3 focus:ring-emerald-600 focus:outline-none active:scale-95 active:bg-emerald-500'
    >
      {isSubmitting ? <span>...Submitting</span> : 'Submit'}
    </Button>
  );
};

export default SubmitButton;
