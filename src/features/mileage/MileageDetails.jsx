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
		<div className="bg-athens-gray-50 flex min-h-dvh min-w-dvw justify-center py-5.5">
			<div className="w-14/16 text-slate-700">
				<div className="mb-5 grid grid-cols-3 place-items-center">
					<div></div>
					<div className="flex flex-col gap-1">
						<h1 className="text-center text-2xl font-semibold tracking-wide text-slate-700 capitalize italic">{`${timeFrame} Miles`}</h1>
						<p className="text-sm font-medium">
							Every mile you've tracked so far.
						</p>
					</div>
					<div className="flex w-full justify-end">
						<ButtonLink to={-1} className="h-10 w-48 place-self-end">
							Go Back
						</ButtonLink>
					</div>
				</div>
				{/* ⬇️⬇️⬇️ HEADER COLUMN ⬇️⬇️⬇️ */}
				<div className="grid h-fit grid-cols-5">
					<GridRow
						className={`b flex items-center justify-center border-slate-700 bg-slate-500 font-bold text-slate-50`}
						headerCol={true}
						data={{
							col1: <p className="">Date</p>,
							col2: <p className="">Initial Miles</p>,
							col3: <p className="">Ending Miles</p>,
							col4: <p className="">Total Miles</p>,
							col5: <p className="">Locations</p>,
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
								className="b flex items-center justify-center border-slate-700 bg-stone-100/50 font-semibold text-slate-600 shadow-md"
								key={entry.id}
								data={{
									col1: (
										<p className="flex h-full w-full items-center justify-center bg-stone-100/50">
											{entry.date}
										</p>
									),
									col2: (
										<p className="flex h-full w-full items-center justify-center bg-white">
											{entry.initialMiles}
										</p>
									),
									col3: (
										<p className="flex h-full w-full items-center justify-center bg-stone-100/50">
											{entry.endingMiles}
										</p>
									),
									col4: (
										<p className="flex h-full w-full items-center justify-center bg-white">
											{entry.totalMiles}
										</p>
									),
									col5: hasMultipleLocations ? (
										<div
											className={`flex h-full w-full flex-col items-center justify-center bg-stone-100/50 ${isLocationsExpanded ? 'pt-2' : ''}`}
										>
											<Button
												onClick={handleToggleLocations}
												className="flex h-9 items-center justify-center"
											>
												{`${entry.locations.length} Locations`}
											</Button>

											<div
												className={`grid w-full bg-stone-100/50 transition-all duration-350 ${
													isLocationsExpanded
														? 'grid-rows-[1fr]'
														: 'grid-rows-[0fr]'
												}`}
											>
												<div className="overflow-hidden">
													<ul className="mt-2 flex flex-col items-center capitalize">
														{entry.locations.map((location) => (
															<li key={location}>{location}</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									) : (
										<p className="text-center capitalize">{entry.locations}</p>
									),
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
