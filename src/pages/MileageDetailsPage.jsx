import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getMileageEntries } from '../features/mileage/mileageApi';
import {
	getDateStringFromOffset,
	getTodayDateString,
} from '../utils/dateUtils';
import Loader from '../ui/Loader';
import { MileageTable } from '../features/mileage/table/MileageTable';
import Button from '../ui/Button';
import ButtonLink from '../ui/ButtonLink';
import { TableOperations } from '../ui/TableOperations';

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

	if (isLoading) return <Loader size={45} containerClassName="min-h-screen" />;

	return (
		<main className="bg-athens-gray-50 flex min-h-dvh min-w-dvw justify-center py-5.5">
			<div className="w-14/16 text-slate-700">
				<div className="grid grid-cols-[1fr_1fr_1fr]">
					<div className="flex items-center justify-start pl-2">
						<TableOperations />
					</div>

					<div className="col-start-2 flex flex-col items-center justify-center pb-2">
						<h1 className="text-center text-3xl font-medium text-gray-600 capitalize">{`${timeFrame} Miles`}</h1>
						<p className="font-data text-sm tracking-wide text-slate-500">
							Every mile logged with the details that{' '}
							<em className="italic">matter</em>.
						</p>
					</div>

					<div className="col-start-3 flex items-center justify-end">
						<ButtonLink to={-1} className="duration-100 active:scale-90">
							Go Back
						</ButtonLink>
					</div>
				</div>
				<MileageTable data={mileageEntries} />
			</div>
		</main>
	);
}
