import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getMileageEntries } from '../services/apiMileage';
import {
	getDateStringFromOffset,
	getTodayDateString,
} from '../utils/dateUtils';
import { Loader } from '../ui/Loader';
import { MileageMaterialTable } from '../features/mileage/MileageMaterialTable';

export default function MileageDetails() {
	const { timeFrame } = useParams();

	let query = {
		queryKey: ['miles'],
		queryFn: () => getMileageEntries(),
	};

	if (timeFrame === 'daily') {
		query.queryKey = ['miles', 'daily'];
		query.queryFn = () =>
			getMileageEntries({ targetedDate: getTodayDateString() });
	}

	if (timeFrame === 'weekly') {
		query.queryKey = ['miles', 'weekly'];
		query.queryFn = () =>
			getMileageEntries({
				startDate: getDateStringFromOffset(-6),
				endDate: getTodayDateString(),
			});
	}

	if (timeFrame === 'monthly') {
		query.queryKey = ['miles', 'monthly'];
		query.queryFn = () =>
			getMileageEntries({
				startDate: getDateStringFromOffset(-29),
				endDate: getTodayDateString(),
			});
	}

	const { data: mileageEntries, isLoading } = useQuery(query);
	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className="bg-athens-gray-50 flex min-h-dvh min-w-dvw justify-center py-5.5">
			<div className="w-14/16 text-slate-700">
				<MileageMaterialTable tableData={mileageEntries} />
			</div>
		</main>
	);
}
