import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getMileageEntries } from '../../services/apiMileage';
import {
	getDateStringFromOffset,
	getTodayDateString,
} from '../../utils/dateUtils';
import { LoaderCircle } from 'lucide-react';
import Button from '../../ui/Button';
import { useState } from 'react';
import GridRow from '../../ui/GridRow';
import ButtonLink from '../../ui/ButtonLink';

export default function MileageDetails() {
	const [expandedLocationsIds, setExpandedLocationsIds] = useState([]);
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
		<div className="w-14/16 text-slate-800">
			<div className="mb-2 grid grid-cols-3 place-items-center">
				<div></div>
				<h1 className="text-center text-xl font-semibold capitalize">{`${timeFrame} Miles`}</h1>
				<ButtonLink to={-1} className="h-10 w-48 place-self-end">
					Go Back
				</ButtonLink>
			</div>
			<div className="grid h-fit grid-cols-5">
				<GridRow
					headerCol={true}
					data={{
						col1: <p className="text-center">Date</p>,
						col2: <p className="text-center">Initial Miles</p>,
						col3: <p className="text-center">Ending Miles</p>,
						col4: <p className="text-center">Total Miles</p>,
						col5: <p className="text-center">Locations</p>,
					}}
				/>

				{mileageEntries.map((entry) => {
					const hasMultipleLocations = entry.locations.length > 1;
					const isLocationsExpanded = expandedLocationsIds.includes(entry.id);

					function handleToggleLocations() {
						setExpandedLocationsIds((ids) =>
							ids.includes(entry.id)
								? ids.filter((id) => id !== entry.id)
								: [...ids, entry.id],
						);
					}

					return (
						<GridRow
							className="flex items-center justify-center"
							key={entry.id}
							data={{
								col1: (
									<p className="flex items-center justify-center">
										{entry.date}
									</p>
								),
								col2: (
									<p className="flex items-center justify-center">
										{entry.initialMiles}
									</p>
								),
								col3: (
									<p className="flex items-center justify-center">
										{entry.endingMiles}
									</p>
								),
								col4: (
									<p className="flex items-center justify-center">
										{entry.totalMiles}
									</p>
								),
								col5: hasMultipleLocations ? (
									<div className="flex flex-col justify-center">
										<Button
											onClick={handleToggleLocations}
											className="flex h-9 items-center justify-center"
										>
											{`${entry.locations.length} Locations`}
										</Button>

										<div
											className={`grid transition-all duration-350 ${
												isLocationsExpanded
													? 'grid-rows-[1fr]'
													: 'grid-rows-[0fr]'
											}`}
										>
											<div className="overflow-hidden">
												<ul className="mt-2 capitalize">
													{entry.locations.map((location) => (
														<li key={location}>{location}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								) : (
									<p className="w-full text-left capitalize">
										{entry.locations}
									</p>
								),
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
