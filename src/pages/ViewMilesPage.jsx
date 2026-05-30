import MileageDisplay from '../features/mileage/MileageDisplay';
import { useQuery } from '@tanstack/react-query';
import { getMileageEntries } from '../services/apiMileage';
import { mileageStats } from '../utils/mileageUtils';

export default function ViewMilesPage() {
	const { data: mileageEntries, isLoading } = useQuery({
		queryKey: ['miles'],
		queryFn: getMileageEntries,
	});

	if (isLoading) return <p>'...loading'</p>;

	const { today, previousWeek, previousMonth, lifetime } = mileageStats(
		mileageEntries ?? [],

		console.log(mileageEntries),
	);

	return (
		<main className="flex min-h-screen max-w-14/16 flex-1 flex-col gap-10 p-2">
			<MileageDisplay stats={today} />
			<MileageDisplay stats={previousWeek} />

			<MileageDisplay stats={previousMonth} />
			<MileageDisplay stats={lifetime} />
		</main>
	);
}
