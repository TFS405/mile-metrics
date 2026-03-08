import AddMiles from '../features/mileage/AddMiles';
import MileDashboard from '../features/mileage/MileDashboard';
import MileageSideRail from '../ui/MileageSideRail';

export default function MileagePage() {
	return (
		<main className="mt-10 w-full max-w-2xl">
			<AddMiles />
		</main>
	);
}
