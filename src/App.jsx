import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomePage from './pages/HomePage';
import AppLayout from './ui/AppLayout';
import AddMilesPage from './pages/AddMilesPage';
import { MileageProvider } from './features/mileage/MileageProvider';
import ViewMilesPage from './pages/ViewMilesPage';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/add-miles',
				element: <AddMilesPage />,
			},
			{
				path: '/view-miles',
				element: <ViewMilesPage />,
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
