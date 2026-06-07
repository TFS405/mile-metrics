import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { getMileageEntries } from '../../services/apiMileage';
import {
	getDateStringFromOffset,
	getTodayDateString,
} from '../../utils/dateUtils';
import { LoaderCircle } from 'lucide-react';
import ButtonLink from '../../ui/ButtonLink';
import Button from '../../ui/Button';

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

	console.log(mileageEntries);

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
			<div className="mb-4 grid grid-cols-[1fr_2fr_1fr] items-center">
				<div></div>
				<h1 className="text-center text-2xl font-medium tracking-tight text-slate-700 capitalize">
					{timeFrame} miles
				</h1>

				<ButtonLink
					to={'/view-miles'}
					className="rounded-full border-2 border-slate-500 bg-slate-50 px-4 py-3 text-center text-sm font-bold tracking-wider text-slate-600 transition-all duration-150 hover:cursor-pointer hover:border-slate-300 hover:bg-slate-500 hover:text-white hover:shadow active:scale-95 active:border-slate-400/75 active:bg-slate-600 active:text-white"
				>
					Go Back
				</ButtonLink>
			</div>

			<table className="table-fixed">
				<thead>
					<tr className="border-b-2 border-slate-400">
						<th className="border-b-2 border-slate-400 p-2">Date</th>
						<th className="border-b-2 border-slate-400 p-2">
							Starting odometer
						</th>
						<th className="border-b-2 border-slate-400 p-2">Ending odometer</th>
						<th className="border-b-2 border-slate-400 p-2">Total miles</th>
						<th className="border-b-2 border-slate-400 p-2">Location</th>
						<th className="border-b-2 border-slate-400 p-2">Notes</th>
					</tr>
				</thead>

				<tbody className="">
					{mileageEntries?.map((entry) => {
						return (
							<tr className="border-b-2 border-b-slate-400 text-center">
								<td className="p-2">{entry.date}</td>
								<td className="p-2 text-right">{entry.initialMiles}</td>
								<td className="p-2 text-right">{entry.endingMiles}</td>
								<td className="p-2 text-right">{entry.totalMiles}</td>
								<td className="p-3">
									<ul className="flex flex-col text-sm font-semibold text-slate-600 hover:cursor-pointer">
										{/* {entry.locations?.map((location) => {
											return (
												<li className="list-inside py-0.5 capitalize">
													{location}
												</li>
											);
										})} */}
										{entry.locations.length > 1 ? (
											<li>
												<Button>{`${entry.locations.length} locations`}</Button>
											</li>
										) : (
											<>{entry.locations}</>
										)}
									</ul>
								</td>
								<td className="p-2">...</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
