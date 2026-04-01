import {
	getDateStringFromOffset,
	isWithinDateRange,
} from '../../utils/dateUtils';
import {
	getAreasInDateRange,
	getAreasOnDate,
	totalAllMileage,
} from '../../utils/mileageUtils';
import { useMileage } from './useMileage';

export default function MileageDisplay({ config }) {
	const { entries } = useMileage();
	const todaysDateString = getDateStringFromOffset(0);
	const oneWeekAgoDateString = getDateStringFromOffset(-6);
	const oneMonthAgoDateString = getDateStringFromOffset(-29);

	const selectedConfig = {
		day: {
			timeFrame: 'Daily',
			totalMiles: totalAllMileage(entries, todaysDateString),
			areas: getAreasOnDate(entries, todaysDateString),
		},
		week: {
			timeFrame: 'Weekly',
			totalMiles: entries.reduce((acc: number, val) => {
				if (
					!isWithinDateRange(oneWeekAgoDateString, todaysDateString, val.date)
				)
					return acc;
				return acc + val.totalMiles;
			}, 0),
			areas: getAreasInDateRange(
				entries,
				oneWeekAgoDateString,
				todaysDateString,
			),
		},
		month: {
			timeFrame: 'Monthly',
			totalMiles: entries.reduce((acc: number, val) => {
				if (
					!isWithinDateRange(oneMonthAgoDateString, todaysDateString, val.date)
				)
					return acc;
				return acc + val.totalMiles;
			}, 0),
			areas: getAreasInDateRange(
				entries,
				oneMonthAgoDateString,
				todaysDateString,
			),
		},
		lifetime: {
			timeFrame: 'Lifetime',
			totalMiles: totalAllMileage(entries),
			areas: [
				...entries.reduce((acc, val) => {
					val.areas.forEach((area) => acc.add(area));
					return acc;
				}, new Set<string>()),
			],
		},
	};

	const mode = selectedConfig[config];

	return (
		<section className="rounded-xl border-2 border-slate-400 p-2 text-sm tracking-tight text-slate-700 shadow-sm">
			<dl className="flex max-h-full shrink-0 flex-col space-y-2">
				<div className="flex gap-2">
					<dt className="tracking font-light">{mode.timeFrame} Miles : </dt>
					<dd>{mode.totalMiles}</dd>
				</div>

				<div className="mt-2 min-h-0 overflow-y-auto">
					<dt className="tracking font-light">Area Worked :</dt>
					<dd className="flex text-sm font-light">
						{<RenderAreaItems areas={mode.areas} />}
					</dd>
				</div>
			</dl>
		</section>
	);
}
function RenderAreaItems({ areas }) {
	return (
		<ul className="mt-2 grid grid-cols-2 gap-2">
			{areas?.map((item, index) => (
				<li className="break-inside-avoid capitalize" key={index}>
					{item}
				</li>
			))}
		</ul>
	);
}
