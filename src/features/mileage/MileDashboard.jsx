import {
	getTodaysDateString,
	getYesterdaysDateString,
} from '../../utils/dateUtils';
import { totalAllMileage } from '../../utils/mileageUtils';
import { useMileage } from './useMileage';

export default function MileDashboard() {
	// calculate all total miles
	const { entries } = useMileage();
	const lifetimeMiles = totalAllMileage(entries);

	// calculate today's total miles
	const totalMileageToday = totalAllMileage(entries, getTodaysDateString());

	// calculate yesterday's total miles
	const totalMilesYesterday = totalAllMileage(
		entries,
		getYesterdaysDateString(),
	);

	return (
		<section className="rounded-x1 flex h-96 flex-col gap-3 border-2 border-slate-300/50 p-3 shadow-sm">
			<ul className="flex flex-col gap-2">
				<li className="flex gap-1 text-slate-600">
					<span className="text-s tracking-widest text-slate-500/80">
						Total Lifetime Miles :
					</span>
					<span>{lifetimeMiles}</span>
				</li>
				<li className="flex gap-1 text-slate-600">
					<span className="text-s tracking-widest text-slate-500/80">
						Today's total Miles
					</span>
					<span>{totalMileageToday}</span>
				</li>

				<li className="flex gap-1 text-slate-600">
					<span className="text-s tracking-widest text-slate-500/80">
						Yesterday's miles :
					</span>
					<span>{totalMilesYesterday}</span>
				</li>
			</ul>
		</section>
	);
}
