import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import MileagePage from './pages/MileagePage';
import { MileageProvider } from './features/mileage/MileageProvider';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/my-miles',
				element: <MileagePage />,
			},
		],
	},
]);

export default function App() {
	return (
		<MileageProvider>
			<RouterProvider router={router} />
		</MileageProvider>
	);
}
