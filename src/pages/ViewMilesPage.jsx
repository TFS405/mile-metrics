import MileageDisplay from '../features/mileage/MileageDisplay';

export default function ViewMilesPage() {
	return (
		<main>
			<div className="flex">
				<MileageDisplay config="day" />
				<MileageDisplay config="week" />
			</div>
			<div className="flex">
				<MileageDisplay config="month" />
				<MileageDisplay config="lifetime" />
			</div>
		</main>
	);
}
