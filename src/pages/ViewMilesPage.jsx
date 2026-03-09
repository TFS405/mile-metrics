import MileageDisplay from '../features/mileage/MileageDisplay';

export default function ViewMilesPage() {
	return (
		<main className="flex flex-1 flex-col">
			<div className="flex h-60">
				<MileageDisplay config="day" />
				<MileageDisplay config="week" />
			</div>
			<div className="flex h-60">
				<MileageDisplay config="month" />
				<MileageDisplay config="lifetime" />
			</div>
		</main>
	);
}
