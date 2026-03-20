import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
	return (
		<div className="h-screen overflow-hidden sm:flex">
			<Sidebar />

			<main className="flex h-full flex-col">
				<Outlet />
			</main>
		</div>
	);
}
