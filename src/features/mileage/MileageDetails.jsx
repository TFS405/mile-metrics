import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
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

	console.log(mileageEntries);
	return (
		<div>
			<h1 className="mb-3 text-center text-lg font-bold">
				Your {timeFrame} miles
			</h1>

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
