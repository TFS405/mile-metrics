import { getTodaysDateString } from '../../utils/dateUtils';
import { getAreasOnDate, totalAllMileage } from '../../utils/mileageUtils';
import { useMileage } from './useMileage';

export default function MileageDisplay({ config }) {
	const { entries } = useMileage();

	const selectedConfig = {
		day: {
			timeFrame: 'Daily',
			totalMiles: totalAllMileage(entries, getTodaysDateString()),
			areas: getAreasOnDate(entries, getTodaysDateString()),
		},
		week: { timeFrame: 'Weekly' },
		month: { timeFrame: 'Monthly' },
		lifetime: { timeFrame: 'Lifetime', totalMiles: totalAllMileage(entries) },
	};
	const mode = selectedConfig[config];

	console.log(mode.areas);

	return (
		<section className="m-10 flex-1 rounded-2xl border p-3 text-2xl">
			<dl className="mt-2 space-y-5">
				<div className="flex">
					<dt className="tracking font-semibold">{mode.timeFrame} Miles :</dt>
					<dd>{mode.totalMiles}</dd>
				</div>

				<div>
					<dt className="tracking font-semibold">Area Worked :</dt>
					<dd>{<RenderAreaItems area={mode.areas} />}</dd>
				</div>
			</dl>
		</section>
	);
}
function RenderAreaItems({ area }) {
	return <span>{area}</span>;
}
