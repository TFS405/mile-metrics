import MileageDisplay from '../features/mileage/MileageDisplay';

export default function ViewMilesPage() {
	return (
		<main className="flex flex-1 flex-col gap-10">
			<MileageDisplay config="day" />
			<MileageDisplay config="week" />

			<MileageDisplay config="month" />
			<MileageDisplay config="lifetime" />
		</main>
	);
}
