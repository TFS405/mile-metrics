import { createClient } from '@supabase/supabase-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HomePage from './pages/HomePage';
import AppLayout from './ui/AppLayout';
import AddMilesPage from './pages/AddMilesPage';
import ViewMilesPage from './pages/ViewMilesPage';
import { MileageProvider } from './features/mileage/MileageProvider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

const supabaseUrl = 'https://macmdcpgaktssvkcqujc.supabase.co';
const supabaseKey = 'sb_publishable_kX2tYN5PQBirzRPylMpKnQ_pk_IVCc6';
const supabase = createClient(supabaseUrl, supabaseKey);

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
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<MileageProvider>
				<RouterProvider router={router} />
			</MileageProvider>
		</QueryClientProvider>
	);
}

export { supabase };
