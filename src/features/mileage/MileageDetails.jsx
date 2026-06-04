import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getMileageEntries } from '../../services/apiMileage';

export default function MileageDetails({ milesData }) {
	const { timeFrame } = useParams();

	const { data: mileageEntries, isLoading } = useQuery({
		queryKey: ['miles'],
		queryFn: () =>
			getMileageEntries({
				targetedDate: '1999-02-10',
			}),
	});

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
					{mileageEntries.map((entry) => {
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
