import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-1 justify-center">
				<Outlet />
			</main>
		</div>
	);
}
