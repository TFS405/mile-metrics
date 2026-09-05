import { NavLink } from 'react-router';
import logo from '../../assets/mileMetricsLogo.png';
import cn from '../../utils/cn';

export default function Navbar() {
  const navLinkStyling = (isActive) =>
    cn(
      `relative flex h-full items-center font-semibold tracking-tight text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-emerald-500 after:transition-transform after:duration-150`,

      isActive && 'after:scale-x-100',
    );

  return (
    <div className='mb-6 flex h-13 items-center justify-between gap-2 border-b border-b-gray-300 bg-gray-200/75 px-3 text-xs shadow-xs'>
      <div className='flex h-full place-items-center'>
        <NavLink className={({ isActive }) => navLinkStyling(isActive)} to='/'>
          <img src={logo} alt='MileMetrics' className='h-8 w-auto' />
        </NavLink>
      </div>

      <div className='flex h-full gap-3 pr-2'>
        <NavLink
          className={({ isActive }) => navLinkStyling(isActive)}
          to={'/add-miles'}
        >
          Add Miles
        </NavLink>

        <NavLink
          className={({ isActive }) => navLinkStyling(isActive)}
          to={'view-miles'}
        >
          View miles
        </NavLink>
      </div>
    </div>
  );
}
