import {
	getDateStringFromOffset,
	isWithinDateRange,
} from '../../utils/dateUtils';
import { getAreasOnDate, totalAllMileage } from '../../utils/mileageUtils';
import { useMileage } from './useMileage';

export default function MileageDisplay({ config }) {
	const { entries } = useMileage();
	const todaysDateString = getDateStringFromOffset(0);
	const getOneWeekAgoString = getDateStringFromOffset(-6);
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
				if (!isWithinDateRange(todaysDateString, getOneWeekAgoString, val.date))
					return acc;
				return acc + val.totalMiles;
			}, 0),
		},
		month: {
			timeFrame: 'Monthly',
			totalMiles: entries.reduce((acc: number, val) => {
				if (
					!isWithinDateRange(todaysDateString, oneMonthAgoDateString, val.date)
				)
					return acc;
				return acc + val.totalMiles;
			}, 0),
		},
		lifetime: { timeFrame: 'Lifetime', totalMiles: totalAllMileage(entries) },
	};

	const mode = selectedConfig[config];

	return (
		<section className="m-10 flex-1 rounded-2xl border p-3 text-2xl">
			<dl className="mt-2 space-y-2">
				<div className="flex gap-2">
					<dt className="tracking font-display font-light">
						{mode.timeFrame} Miles :{' '}
					</dt>
					<dd>{mode.totalMiles}</dd>
				</div>

				<div>
					<dt className="tracking font-display font-light">Area Worked :</dt>
					<dd className="font-display flex text-sm font-light">
						{<RenderAreaItems areas={mode.areas} />}
					</dd>
				</div>
			</dl>
		</section>
	);
}
function RenderAreaItems({ areas }) {
	return (
		<ul className="mt-1 columns-4 gap-6 tracking-tight">
			{areas?.map((item, index) => (
				<li className="break-inside-avoid capitalize" key={index}>
					{item}
				</li>
			))}
		</ul>
	);
}
