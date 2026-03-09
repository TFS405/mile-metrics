import { Form } from 'react-router';
import { useMileage } from './useMileage';

export default function AddMilesForm() {
	const { dispatch } = useMileage();

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		data.areas = formData.getAll('areas');

		// data.date = new Date(data.date).toLocaleDateString();
		data.initialMiles = Number(data.initialMiles);
		data.endingMiles = Number(data.endingMiles);
		data.totalMiles = data.endingMiles - data.initialMiles;
		//
		console.log('submittedData --> ', data);

		dispatch({ type: 'mileage/addMiles', payload: data });
	};

	return (
		<Form
			onSubmit={handleSubmit}
			method="POST"
			className="flex h-fit w-full flex-col gap-6 rounded-xl border-2 border-slate-300/75 p-3 shadow-sm"
		>
			<div className="flex flex-col">
				<label
					htmlFor="form-date"
					className="text-center text-sm font-semibold tracking-widest text-slate-500"
				>
					What day did you drive these miles?
				</label>
				<input
					id="form-date"
					name="date"
					type="date"
					className="rounded-2xl border-2 border-slate-200/80 bg-white p-3 placeholder-slate-500/0"
				/>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="initial-odometer"
					className="text-center text-sm font-semibold tracking-widest text-slate-500"
				>
					How many miles did your odometer begin with?
				</label>
				<input
					id="initial-odometer"
					name="initialMiles"
					type="number"
					placeholder="odometer beginning"
					className="rounded-2xl border-2 border-slate-200/80 bg-white p-3"
				/>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="odometer-end"
					className="text-center text-sm font-semibold tracking-widest text-slate-500"
				>
					How many miles did your odometer end with?
				</label>
				<input
					id="odometer-end"
					name="endingMiles"
					type="number"
					placeholder="odometer end"
					className="rounded-2xl border-2 border-slate-200/80 bg-white p-3"
				/>
			</div>

			<fieldset>
				<legend className="text-center text-sm font-semibold tracking-widest text-slate-500">
					Please select all areas involved
				</legend>

				<div>
					<label htmlFor="area-edmond" className="p-2 text-slate-700">
						Edmond
					</label>
					<input
						name="areas"
						id="area-edmond"
						value="edmond"
						type="checkbox"
						className="rounded-lg border-2 border-slate-200/80 p-3"
					></input>
				</div>

				<div>
					<label htmlFor="area-north-okc" className="p-2 text-slate-700">
						North Oklahoma City
					</label>
					<input
						name="areas"
						id="area-north-okc"
						value="okc-north"
						type="checkbox"
					/>
				</div>

				<div>
					<label htmlFor="area-south-okc" className="p-2 text-slate-700">
						South Oklahoma City
					</label>
					<input
						name="areas"
						id="area-south-okc"
						value="okc-south"
						type="checkbox"
						className="rounded-lg border-2 border-slate-200/80 p-3"
					></input>
				</div>

				<div>
					<label htmlFor="area-moore" className="p-2 text-slate-700">
						Moore
					</label>
					<input
						name="areas"
						id="area-moore"
						value="moore"
						type="checkbox"
						className="rounded-lg border-2 border-slate-200/80 p-3"
					></input>
				</div>

				<div>
					<label htmlFor="area-norman" className="p-2 text-slate-700">
						Norman
					</label>
					<input
						name="areas"
						id="area-norman"
						value="norman"
						type="checkbox"
						className="rounded-lg border-2 border-slate-200/80 p-3"
					></input>
				</div>
			</fieldset>

			<button
				type="submit"
				className="rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75"
			>
				Submit
			</button>
		</Form>
	);
}
