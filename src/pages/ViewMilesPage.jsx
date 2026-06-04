import MileageDisplay from '../features/mileage/MileageDisplay';
import { useQuery } from '@tanstack/react-query';
import { getMileageEntries } from '../services/apiMileage';
import { mileageStats } from '../utils/mileageUtils';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router';

export default function ViewMilesPage() {
	const { data: mileageEntries, isLoading } = useQuery({
		queryKey: ['miles'],
		queryFn: getMileageEntries,
	});

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoaderCircle
					size={45}
					className="animate-[spin_1.5s_ease-in-out_infinite]"
				/>
			</div>
		);
	}

	const { today, previousWeek, previousMonth, lifetime } = mileageStats(
		mileageEntries ?? [],
	);

	return (
		<main className="flex min-h-screen max-w-14/16 flex-1 flex-col gap-10 p-2">
			<MileageDisplay stats={today} to="/view-miles/daily" />
			<MileageDisplay stats={previousWeek} to="/view-miles/weekly" />

			<MileageDisplay stats={previousMonth} to="/view-miles/monthly" />
			<MileageDisplay stats={lifetime} to="/view-miles/lifetime" />
		</main>
	);
}
