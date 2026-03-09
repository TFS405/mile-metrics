import { getTodaysDateString } from '../../utils/dateUtils';
import { totalAllMileage } from '../../utils/mileageUtils';
import { useMileage } from './useMileage';

export default function MileageDisplay({ config }) {
	const selectedConfig = {
		day: { timeFrame: 'Daily' },
		week: { timeFrame: 'Weekly' },
		month: { timeFrame: 'Monthly' },
		lifetime: { timeFrame: 'Lifetime' },
	};

	const mode = selectedConfig[config];

	const { entries } = useMileage();
	console.log(entries);

	const dailyMiles = totalAllMileage(entries, getTodaysDateString());

	return (
		<section className="m-10 flex-1 rounded-2xl border p-3 text-2xl">
			<dl className="mt-2 space-y-5">
				<div className="flex">
					<dt className="tracking font-semibold">{mode.timeFrame} Miles :</dt>
					<dd>{dailyMiles}</dd>
				</div>

				<div>
					<dt className="tracking font-semibold">Area Worked :</dt>
					<dd>
						{entries.map((area) => (
							<renderAreaItems area={area} />
						))}
					</dd>
				</div>

				<div>
					<dt className="tracking font-bold"></dt>
					<dd></dd>
				</div>

				<dt className="tracking font-bold"></dt>
				<dd></dd>
			</dl>
		</section>
	);
}
function renderAreaItems(area) {
	return <span>{area}</span>;
}
