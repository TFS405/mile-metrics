import { useEffect } from 'react';
import { supabase } from '../App';
import MileageDisplay from '../features/mileage/MileageDisplay';
import { useQuery } from '@tanstack/react-query';

export default function ViewMilesPage() {
	async function getMiles() {
		const { data, error } = await supabase.from('Miles').select('*');

		if (error) {
			console.log('A error has occured attempting to fetch Miles data.');
			throw new Error('An error has occured');
		}

		return data;
	}

	useQuery({
		queryKey: ['miles'],
		queryFn: getMiles,
	});

	return (
		<main className="flex min-h-screen max-w-14/16 flex-1 flex-col gap-10 p-2">
			<MileageDisplay config="day" />
			<MileageDisplay config="week" />

			<MileageDisplay config="month" />
			<MileageDisplay config="lifetime" />
		</main>
	);
}
