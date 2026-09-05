import { NavLink } from 'react-router';
// import logo from '../../assets/mile-metrics-logo-v7.svg';

export default function Navbar() {
  return (
    <div className='mb-6 flex items-center justify-between gap-2 border-b border-b-gray-300 bg-gray-200/75 px-3 py-2 shadow-xs'>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? 'text-emerald-700' : 'text-slate-600'} font-semibold tracking-tight`
        }
        to='/'
      >
        {/* <img src={logo} alt='MileMetrics' className='h-8 w-auto' /> */}
      </NavLink>

      <ul className='mr-1 flex gap-5 text-xs font-semibold text-slate-600'>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive && 'text-emerald-700'} 'text-slate-600'} font-semibold tracking-tight`
            }
            to={'/add-miles'}
          >
            Add Miles
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive && 'text-emerald-700'} 'text-slate-600'} font-semibold tracking-tight`
            }
            to={'view-miles'}
          >
            View miles
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
