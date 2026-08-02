import Sidebar from '../features/mileage/MileageNavbar';
import { Outlet } from 'react-router';

export default function AppLayout() {
	return (
		<div className="flex h-screen flex-col">
			<Sidebar />

			<main className="flex h-screen justify-center align-middle">
				<Outlet />
			</main>
		</div>
	);
}
