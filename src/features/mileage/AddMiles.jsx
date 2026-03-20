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
		console.log(data);
		dispatch({ type: 'mileage/addMiles', payload: data });
	};

	return (
		<Form
			onSubmit={handleSubmit}
			method="POST"
			className="flex max-h-[min(80vh,800px)] min-h-fit flex-1 flex-col gap-4 rounded-xl border-2 border-slate-300/75 p-3 shadow-sm sm:w-full sm:gap-6"
		>
			<section className="flex flex-1 flex-col justify-evenly">
				<div className="flex flex-1 flex-col">
					<label
						htmlFor="form-date"
						className="mb-2 text-center text-xs font-semibold tracking-widest text-slate-500 sm:text-sm"
					>
						What day did you drive these miles?
					</label>
					<input
						id="form-date"
						name="date"
						type="date"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 placeholder-slate-500/0 sm:p-3"
					/>
				</div>

				<div className="flex flex-1 flex-col">
					<label
						htmlFor="initial-odometer"
						className="mb-2 text-center text-xs font-semibold tracking-widest text-slate-500 sm:text-sm"
					>
						How many miles did your odometer begin with?
					</label>
					<input
						id="initial-odometer"
						name="initialMiles"
						type="number"
						placeholder="odometer beginning"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 sm:p-3"
					/>
				</div>

				<div className="flex flex-1 flex-col">
					<label
						htmlFor="odometer-end"
						className="mb-2 text-center text-xs font-semibold tracking-widest text-slate-500 sm:text-sm"
					>
						How many miles did your odometer end with?
					</label>
					<input
						id="odometer-end"
						name="endingMiles"
						type="number"
						placeholder="odometer end"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 sm:p-3"
					/>
				</div>
			</section>

			<fieldset className="flex flex-1 flex-col justify-evenly text-xs">
				<legend className="mb-2 border-b border-b-slate-400 pb-1.5 text-center text-xs font-semibold tracking-widest text-slate-500 sm:text-sm">
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
						className=""
					></input>
				</div>

				<div>
					<label htmlFor="area-north-okc" className="p-2 text-slate-700">
						North Oklahoma City
					</label>
					<input
						name="areas"
						id="area-north-okc"
						value="north oklahoma city"
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
						value="south oklahoma city"
						type="checkbox"
						className=""
					></input>
				</div>

				<div>
					<label htmlFor="area-moore" className="p-2 text-slate-700">
						Moore
					</label>
					<input
						name="areas"
						value="moore"
						type="checkbox"
						id="area-moore"
						className=""
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
						className=""
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
