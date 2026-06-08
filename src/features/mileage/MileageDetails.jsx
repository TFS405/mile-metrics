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
import { useState } from 'react';

export default function MileageDetails() {
	const { timeFrame } = useParams();
	const [openLocationIds, setOpenLocationIds] = useState([]);

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
	console.log(openLocationIds);

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
						const isOpen = openLocationIds.includes(entry.id);
						const hasMultipleLocations = entry.locations.length > 1;

						return (
							<tr className="border-b-2 border-b-slate-400 text-center font-medium text-slate-700">
								<td className="px-2 py-3">{entry.date}</td>
								<td className="px-6 py-3">{entry.initialMiles}</td>
								<td className="px-6 py-3">{entry.endingMiles}</td>
								<td className="px-6 py-3 font-semibold">{entry.totalMiles}</td>
								<td className="px-5 py-3">
									<ul className="flex flex-col text-sm font-semibold text-slate-600 hover:cursor-pointer">
										<li>
											{hasMultipleLocations ? (
												<Button
													className="w-48"
													onClick={() => {
														isOpen
															? setOpenLocationIds(
																	openLocationIds.filter(
																		(id) => entry.id != id,
																	),
																)
															: setOpenLocationIds([
																	...openLocationIds,
																	entry.id,
																]);
													}}
												>
													{
														<p className="mb-0.5 font-bold">{`${entry.locations.length} locations`}</p>
													}
													<div
														className={`mt-1.5 space-y-1 overflow-hidden font-semibold capitalize transition-all duration-400 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
													>
														{entry.locations.map((locationString) => (
															<p className="wrap-break-word">
																{locationString}
															</p>
														))}
													</div>
												</Button>
											) : (
												<p className="capitalize">{entry.locations}</p>
											)}
										</li>
									</ul>
								</td>
								<td className="px-5 py-3">...</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

// ONCLICK HANDLER

// TERNARY

// {
// 	hasMultipleLocations ? (
// 		isOpen ? (
// 			entry.locations.map((locationString) => <p>{locationString}</p>)
// 		) : (
// 			<p>{`${entry.locations.length} locations`}</p>
// 		)
// 	) : (
// 		<p>{entry.locations}</p>
// 	);
// }
