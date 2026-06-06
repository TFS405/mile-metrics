import { Form } from 'react-router';
import { useForm } from 'react-hook-form';
import { insertMileageEntry } from '../../services/apiMileage';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FieldLabel from '../../ui/FieldLabel';
import Button from '../../ui/Button';

export default function AddMilesForm() {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		insertMileageEntry(data);
		queryClient.invalidateQueries({ queryKey: ['miles'] });
	};

	const onError = (errors) => {
		if (errors.date) {
			toast.error(errors.date.message);
		}
		if (errors.initialMiles) {
			toast.error(errors.initialMiles.message);
		}
		if (errors.endingMiles) {
			toast.error(errors.endingMiles.message);
		}
		if (errors.locations) {
			toast.error(errors.locations.message);
		}
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			method="POST"
			className="mb-6 flex max-h-[min(80vh,800px)] min-h-fit flex-1 flex-col gap-2 rounded-xl border-2 border-slate-300/75 p-3 shadow-sm"
		>
			<div className="xs:mb-6 xs:gap-7 mb-4 flex flex-1 flex-col justify-evenly gap-5">
				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="form-date">
						What day did you drive these miles?
					</FieldLabel>
					<input
						id="form-date"
						type="date"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 placeholder-slate-500/0 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
						{...register('date', {
							required: 'Please select the date these miles were driven.',
						})}
					/>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="initial-odometer">
						How many miles did your odometer begin with?
					</FieldLabel>
					<input
						id="initial-odometer"
						{...register('initialMiles', {
							required: 'Please enter the starting odometer reading.',
						})}
						type="number"
						placeholder="odometer beginning"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
					/>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="odometer-end">
						How many miles did your odometer end with?
					</FieldLabel>
					<input
						id="odometer-end"
						{...register('endingMiles', {
							required: 'Please enter the ending odometer reading.',
						})}
						type="number"
						placeholder="odometer end"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
					/>
				</div>
			</div>

			<fieldset className="mb-3">
				<legend className="xs:text-sm mr-5 mb-5 border-b border-b-slate-400 px-5 pb-1.5 text-center text-xs font-semibold tracking-widest whitespace-nowrap text-slate-500 capitalize">
					Where did you drive?
				</legend>

				<div className="grid grid-cols-3 gap-y-2">
					<div>
						<label htmlFor="area-edmond" className="p-2 text-slate-700">
							Edmond
						</label>
						<input
							{...register('locations', {
								required: 'Select at least one location',
							})}
							id="area-edmond"
							value="edmond"
							type="checkbox"
							className="accent-emerald-600 focus:border-emerald-300 focus:ring-3 focus:ring-emerald-400 focus:outline-none"
						></input>
					</div>

					<div>
						<label htmlFor="area-north-okc" className="p-2 text-slate-700">
							North Oklahoma City
						</label>
						<input
							{...register('locations', {
								required: 'Select at least one location',
							})}
							id="area-north-okc"
							value="north oklahoma city"
							type="checkbox"
							className="accent-emerald-600 focus:border-emerald-300 focus:ring-3 focus:ring-emerald-400 focus:outline-none"
						/>
					</div>

					<div>
						<label htmlFor="area-south-okc" className="p-2 text-slate-700">
							South Oklahoma City
						</label>
						<input
							{...register('locations', {
								required: 'Select at least one location',
							})}
							id="area-south-okc"
							value="south oklahoma city"
							type="checkbox"
							className="accent-emerald-600 focus:border-emerald-300 focus:ring-3 focus:ring-emerald-400 focus:outline-none"
						></input>
					</div>

					<div>
						<label htmlFor="area-moore" className="p-2 text-slate-700">
							Moore
						</label>
						<input
							{...register('locations', {
								required: 'Select at least one location',
							})}
							value="moore"
							type="checkbox"
							className="accent-emerald-600 focus:border-emerald-300 focus:ring-3 focus:ring-emerald-400 focus:outline-none"
							id="area-moore"
						></input>
					</div>

					<div>
						<label htmlFor="area-norman" className="p-2 text-slate-700">
							Norman
						</label>
						<input
							{...register('locations', {
								required: 'Select at least one location',
							})}
							id="area-norman"
							value="norman"
							type="checkbox"
							className="accent-emerald-600 focus:border-emerald-300 focus:ring-3 focus:ring-emerald-400 focus:outline-none"
						></input>
					</div>
				</div>
			</fieldset>

			<div className="mb-1 flex flex-col">
				<FieldLabel className="mb-1 text-center" htmlFor="notes">
					Notes
				</FieldLabel>
				<textarea
					{...register('notes')}
					id="notes"
					placeholder="Notes..."
					className="h-full w-15/16 self-center rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
				></textarea>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75"
			>
				Submit
			</Button>
		</Form>
	);
}
