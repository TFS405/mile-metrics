import { Form } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { insertMileageEntry } from '../../services/apiMileage';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FieldLabel from '../../ui/FieldLabel';
import Button from '../../ui/Button';
import { CheckBox } from '../../ui/CheckBox';
import { NumericFormat } from 'react-number-format';

export default function AddMilesForm() {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const payload = {
				...data,
				initialMiles: Number(data.initialMiles),
				endingMiles: Number(data.endingMiles),
				locations: [data.locations].flat(),
			};

			console.log(data);

			await insertMileageEntry(payload);
			queryClient.invalidateQueries({ queryKey: ['miles'] });

			toast.success('Mileage entry successfully saved');
			reset();
		} catch (err) {
			toast.error('Could not save your entry, try again');
			console.log(err);
		}
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
			className="mb-6 flex max-h-[min(80vh,800px)] min-h-fit flex-1 flex-col gap-2 rounded-xl border-2 border-slate-300/75 p-3 shadow-sm"
		>
			{/* Date  */}

			<div className="xs:mb-6 xs:gap-7 mb-4 flex flex-1 flex-col justify-evenly gap-5">
				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="form-date">
						What day did you drive these miles?
					</FieldLabel>
					<input
						id="form-date"
						type="date"
						className="rounded-xl border-2 border-slate-200/80 bg-white p-1 placeholder-slate-500/0 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
						{...register('date', {
							required: 'Please select the date these miles were driven.',
							validate: (value) => {
								// value is already "YYYY-MM-DD" from the date input
								const todayString = new Date().toLocaleDateString('en-CA'); // gives "YYYY-MM-DD" in LOCAL time

								if (value > todayString) {
									return 'Please enter a trip date that is today or earlier';
								}

								const year = Number(value.slice(0, 4));
								if (year < 1900 || year > 9999) {
									return 'Please enter a realistic year';
								}

								return true;
							},
						})}
					/>
				</div>

				{/* Initial Miles */}

				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="initial-odometer">
						How many miles did your odometer begin with?
					</FieldLabel>
					<Controller
						name="initialMiles"
						control={control}
						render={({ field }) => (
							<NumericFormat
								value={field.value ?? ''}
								thousandSeparator=","
								id="initial-odometer"
								className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
								placeholder="Initial Miles"
								onValueChange={(values) => field.onChange(values.floatValue)}
							/>
						)}
						rules={{ required: 'Please enter the starting odometer reading' }}
					/>
				</div>

				{/* Ending Miles */}

				<div className="flex flex-1 flex-col gap-2">
					<FieldLabel className="self-center" htmlFor="odometer-end">
						How many miles did your odometer end with?
					</FieldLabel>

					<Controller
						control={control}
						name="endingMiles"
						rules={{
							required: 'Please enter the ending odometer reading.',
							validate: (value) =>
								Number(value) > Number(getValues('initialMiles')) ||
								'Ending miles must be greater than starting miles',
						}}
						render={({ field }) => (
							<NumericFormat
								id="odometer-end"
								thousandSeparator=","
								value={field.value ?? ''}
								placeholder="Ending miles"
								className="rounded-xl border-2 border-slate-200/80 bg-white p-1 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
								onValueChange={(values) => field.onChange(values.floatValue)}
							/>
						)}
					/>
				</div>
			</div>

			{/* CheckBoxes */}

			<fieldset className="mb-3">
				<legend className="xs:text-sm mr-5 mb-5 border-b border-b-slate-400 px-5 pb-1.5 text-center text-xs font-semibold tracking-widest whitespace-nowrap text-slate-500 capitalize">
					Where did you drive?
				</legend>

				<div className="grid grid-cols-3 gap-y-2">
					<div>
						<label htmlFor="area-edmond" className="p-2 text-slate-700">
							Edmond
						</label>
						<CheckBox
							id={'area-edmond'}
							value={'edmond'}
							validationMessage={'Select at least one location'}
							registeredName={'locations'}
							register={register}
						/>
					</div>

					<div>
						<label htmlFor="area-north-okc" className="p-2 text-slate-700">
							North Oklahoma City
						</label>
						<CheckBox
							id={'area-north-okc'}
							value={'north oklahoma city'}
							validationMessage={'Select at least one location'}
							registeredName={'locations'}
							register={register}
						/>
					</div>

					<div>
						<label htmlFor="area-south-okc" className="p-2 text-slate-700">
							South Oklahoma City
						</label>
						<CheckBox
							id={'area-south-okc'}
							value={'south oklahoma city'}
							validationMessage={'Select at least one location'}
							registeredName={'locations'}
							register={register}
						/>
					</div>

					<div>
						<label htmlFor="area-moore" className="p-2 text-slate-700">
							Moore
						</label>
						<CheckBox
							id={'area-moore'}
							value={'moore'}
							validationMessage={'Select at least one location'}
							registeredName={'locations'}
							register={register}
						/>
					</div>

					<div>
						<label htmlFor="area-norman" className="p-2 text-slate-700">
							Norman
						</label>
						<CheckBox
							id={'area-norman'}
							value={'norman'}
							validationMessage={'Select at least one location'}
							registeredName={'locations'}
							register={register}
						/>
					</div>
				</div>
			</fieldset>

			{/* Notes */}

			<div className="mb-1 flex flex-col">
				<FieldLabel className="mb-1 text-center" htmlFor="notes">
					Notes
				</FieldLabel>
				<textarea
					{...register('notes')}
					id="notes"
					placeholder="Notes..."
					className="h-full w-15/16 self-center rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500 focus:outline-none"
				></textarea>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75"
			>
				{isSubmitting ? <span>...Submitting</span> : 'Submit'}
			</Button>
		</Form>
	);
}
