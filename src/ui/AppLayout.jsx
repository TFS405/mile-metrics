import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
	return (
		<div className="h-screen sm:flex">
			<Sidebar />

			<main className="flex h-full justify-center align-middle">
				<Outlet />
			</main>
		</div>
	);
}
