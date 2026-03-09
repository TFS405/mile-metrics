import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import AddMilesPage from './pages/AddMilesPage';
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
				path: '/add-miles',
				element: <AddMilesPage />,
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
