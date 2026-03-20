import AddMilesForm from '../features/mileage/AddMiles';
import MileDashboard from '../features/mileage/MileDashboard';
import MileageSideRail from '../ui/MileageSideRail';

export default function AddMilesPage() {
	return (
		<main className="max-w-9/10 justify-end sm:mt-10 sm:w-full sm:max-w-11">
			<AddMilesForm />
		</main>
	);
}
