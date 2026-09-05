import Navbar from '../features/mileage/MileageNavbar';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className='flex min-h-0 flex-col'>
      <Navbar />

      <main className='flex min-h-0 w-full flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
