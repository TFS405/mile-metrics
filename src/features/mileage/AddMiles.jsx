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
			className="mb-6 flex max-h-[min(80vh,800px)] min-h-fit flex-1 flex-col gap-2 rounded-xl border-2 border-slate-300/75 p-3 shadow-sm"
		>
			<section className="xs:mb-6 xs:gap-7 mb-4 flex flex-1 flex-col justify-evenly gap-5">
				<div className="flex flex-1 flex-col gap-2">
					<label
						htmlFor="form-date"
						className="xs:text-sm mb-2 text-center text-xs font-semibold tracking-widest text-slate-500"
					>
						What day did you drive these miles?
					</label>
					<input
						id="form-date"
						name="date"
						type="date"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 placeholder-slate-500/0"
					/>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<label
						htmlFor="initial-odometer"
						className="xs:text-sm mb-2 text-center text-xs font-semibold tracking-widest text-slate-500"
					>
						How many miles did your odometer begin with?
					</label>
					<input
						id="initial-odometer"
						name="initialMiles"
						type="number"
						placeholder="odometer beginning"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1"
					/>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<label
						htmlFor="odometer-end"
						className="xs:text-sm mb-2 text-center text-xs font-semibold tracking-widest text-slate-500"
					>
						How many miles did your odometer end with?
					</label>
					<input
						id="odometer-end"
						name="endingMiles"
						type="number"
						placeholder="odometer end"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1"
					/>
				</div>
			</section>

			<fieldset>
				<legend className="xs:text-sm mb-4 border-b border-b-slate-400 pb-1.5 text-center text-xs font-semibold tracking-widest text-slate-500">
					Please select all areas involved
				</legend>

				<section className="xs:flex xs:my-2 xs:text-sm xs:p-2 my-3 flex flex-1 flex-col justify-evenly gap-6 text-xs accent-emerald-600">
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
							className=""
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
							className=""
							id="area-moore"
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
				</section>
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
