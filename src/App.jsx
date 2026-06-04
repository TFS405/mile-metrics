import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HomePage from './pages/HomePage';
import AppLayout from './ui/AppLayout';
import AddMilesPage from './pages/AddMilesPage';
import ViewMilesPage from './pages/ViewMilesPage';
import { MileageProvider } from './features/mileage/MileageProvider';
import { Toaster } from 'react-hot-toast';
import MileageDetails from './features/mileage/MileageDetails';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

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
			{
				path: '/view-miles/:timeFrame',
				element: <MileageDetails />,
			},
		],
	},
]);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-center" />
			<ReactQueryDevtools initialIsOpen={false} />

			<MileageProvider>
				<RouterProvider router={router} />
			</MileageProvider>
		</QueryClientProvider>
	);
}
