import MileageDisplay from '../features/mileage/MileageDisplay';

export default function ViewMilesPage() {
	return (
		<main className="flex min-h-screen max-w-14/16 flex-1 flex-col gap-10 p-2">
			<MileageDisplay config="day" />
			<MileageDisplay config="week" />

			<MileageDisplay config="month" />
			<MileageDisplay config="lifetime" />
		</main>
	);
}
