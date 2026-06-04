import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { getMileageEntries } from '../../services/apiMileage';
import {
	getDateStringFromOffset,
	getTodayDateString,
} from '../../utils/dateUtils';
import { LoaderCircle } from 'lucide-react';

export default function MileageDetails() {
	const { timeFrame } = useParams();

	let query = {
		queryKey: ['miles'],
		queryFn: () => getMileageEntries(),
	};

	if (timeFrame === 'daily') {
		query.queryKey = ['miles', 'daily'];
		query.queryFn = () =>
			getMileageEntries({
				targetedDate: getTodayDateString(),
			});
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
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoaderCircle
					size={45}
					className="animate-[spin_1.5s_ease-in-out_infinite]"
				/>
			</div>
		);
	}

	return (
		<div>
			<div className="space mb-5 flex justify-between">
				<h1 className="mb-3 text-center text-lg font-bold">
					Your {timeFrame} miles
				</h1>

				<Link
					to={'/view-miles'}
					className="rounded-xl border-2 border-slate-300 bg-slate-500 p-3 text-center text-sm font-bold tracking-wider text-white transition-all duration-150 hover:scale-105 hover:cursor-pointer hover:border-slate-500 hover:bg-slate-50 hover:text-slate-600 hover:shadow active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75"
				>
					Go Back
				</Link>
			</div>

			<table>
				<thead>
					<tr className="border-2">
						<th className="border-2 p-2">Date</th>
						<th className="border-2 p-2">Starting odometer</th>
						<th className="border-2 p-2">Ending odometer</th>
						<th className="border-2 p-2">Total miles</th>
						<th className="border-2 p-2">Location</th>
						<th className="border-2 p-2">Notes</th>
					</tr>
				</thead>

				<tbody className="border-2">
					{mileageEntries?.map((entry) => {
						return (
							<tr>
								<td className="border-2 p-2">{entry.date}</td>
								<td className="border-2 p-2">{entry.initialMiles}</td>
								<td className="border-2 p-2">{entry.endingMiles}</td>
								<td className="border-2 p-2">{entry.totalMiles}</td>
								<td className="border-2 p-3">
									<ul className="flex flex-col">
										{entry.locations?.map((location) => {
											return (
												<li className="list-inside py-0.5 capitalize">
													{location}
												</li>
											);
										})}
									</ul>
								</td>
								<td className="border p-2">NOTES</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
