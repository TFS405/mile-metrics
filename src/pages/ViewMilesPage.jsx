import MileageDisplay from '../features/mileage/MileageDisplay';
import { useQuery } from '@tanstack/react-query';
import { getMileageEntries } from '../services/apiMileage';

export default function ViewMilesPage() {
	useQuery({
		queryKey: ['miles'],
		queryFn: getMileageEntries,
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
