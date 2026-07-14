import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
	deleteMileageEntry,
	updateMileageEntry,
} from '../../../services/apiMileage';
import Button from '../../../ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Pencil, Save, Trash } from 'lucide-react';
import { Popover } from '../../../ui/Popover';
import { useState } from 'react';

export const MileageExpandedRow = ({
	row,
	index,
	isInEditMode,
	toggleEditMode,
}) => {
	// State Variables
	const [confirmState, setConfirmState] = useState(null);

	const queryClient = useQueryClient();

	const id = row.original.id;
	const evenColumnStyling =
		index % 2 === 0
			? 'bg-gradient-to-t to-gray-50 from-blue-100/20 transition-all duration-150 '
			: 'bg-gradient-to-t to-white from-blue-100/20';

	// Confirmation Modal
	const confirmDelete = () => {
		return new Promise((resolve) => {
			setConfirmState({
				type: 'delete',
				resolveFn: resolve,
			});
		});
	};
	const confirmSave = () => {
		return new Promise((resolve) => {
			setConfirmState({
				type: 'save',
				resolveFn: resolve,
			});
		});
	};

	const confirmMessage = () => {
		const messages = {
			delete: 'Are you sure you want to delete this entry?',
			save: 'Would you like to save your changes?',
		};

		return messages[confirmState.type];
	};

	const confirmBody = () => {
		const typeOfConfirmation = confirmState.type;

		if (typeOfConfirmation === 'save') {
			return (
				<div
					className="flex justify-between pt-2"
					onClick={(e) => e.stopPropagation()}
				>
					<Button className="" onClick={() => confirmState.resolveFn(false)}>
						Cancel
					</Button>
					<Button
						onClick={() => confirmState.resolveFn(true)}
						className="border-2 border-slate-600 bg-emerald-500 font-bold text-white hover:bg-emerald-600 hover:text-gray-200"
					>
						Save Changes
					</Button>
				</div>
			);
		}
		if (typeOfConfirmation === 'delete') {
			return (
				<div
					className="flex justify-between pt-2"
					onClick={(e) => e.stopPropagation()}
				>
					<Button onClick={() => confirmState.resolveFn(false)}>Cancel</Button>
					<Button
						className="border-2 border-slate-600 bg-red-500 text-white"
						onClick={() => confirmState.resolveFn(true)}
					>
						Delete Entry
					</Button>
				</div>
			);
		}
	};

	//  Handlers
	const handleDeleteEntry = async (row) => {
		const confirmed = await confirmDelete();

		if (confirmed) {
			try {
				await deleteMileageEntry(id);
				queryClient.invalidateQueries(['miles']);
				toast.success('Entry successfully deleted');
			} catch (err) {
				console.log(err);
				toast.error('Entry could not be deleted at this time');
			}
		}
		setConfirmState(null);
	};

	const onValid = async (data, e) => {
		const confirmed = await confirmSave();

		const payload = Object.keys(dirtyFields).reduce((acc, val) => {
			acc[val] = data[val];
			return acc;
		}, {});

		if (confirmed) {
			try {
				await updateMileageEntry(id, payload);
				toast.success('Entry successfully updated');
				toggleEditMode(row);
			} catch (error) {
				console.log(error);
				toast.error('Entry could not be updated. Please try again later');
			}
		}
		setConfirmState(null);
	};

	const stopEventPropagation = (e) => e.stopPropagation();

	// Form instance
	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: row.original,
	});

	return (
		<>
			<div
				className={`relative grid cursor-pointer overflow-hidden border-b ${evenColumnStyling} border-slate-300 text-center transition-all duration-175 ${
					row.getIsExpanded() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				}`}
			>
				{/* Grid Container */}
				<div
					className={`grid min-h-0 grid-cols-5 ${row.getIsExpanded() ? 'pb-1.5' : 'pb-0'}`}
				>
					{/* Controls */}
					<div className="col-span-1">
						<div className="flex h-full w-fit items-end pl-1">
							<ul className="flex cursor-default gap-2">
								{/* EDIT */}
								<li>
									<button
										className="cursor-pointer"
										onClick={(e) => toggleEditMode(row, e)}
									>
										<Popover
											className="border-none bg-transparent shadow-none"
											content="edit"
										>
											<Pencil
												size={22}
												className="text-gray-500 hover:text-gray-700"
											/>
										</Popover>
									</button>
								</li>

								{/* DELETE */}
								<li onClick={(e) => e.stopPropagation()}>
									<button
										className="cursor-pointer"
										onClick={() => handleDeleteEntry(row)}
									>
										<Popover
											className="border-none bg-transparent shadow-none"
											content="delete"
										>
											<Trash
												size={22}
												className="text-gray-500 hover:text-red-500"
											/>
										</Popover>
									</button>
								</li>

								{/* SAVE */}
								{isInEditMode && (
									<li>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleSubmit(onValid)();
											}}
										>
											<Popover
												content="save"
												className="border-none bg-transparent shadow-none"
											>
												<Save className="text-gray-500 hover:text-green-600" />
											</Popover>
										</button>
									</li>
								)}
							</ul>
						</div>
					</div>

					{/* Notes box */}
					<div className="col-start-5">
						<h3 className={`font-data text-sm font-semibold tracking-tight`}>
							Notes
						</h3>

						<Popover
							content={`${isInEditMode ? '' : 'Click the pencil icon to add notes'}`}
							disabled={isInEditMode}
						>
							<textarea
								{...register('notes')}
								className={`notes-scrollbar z-50 h-40 w-14/16 resize-none rounded-2xl border bg-gray-100 p-2 text-center text-sm shadow-xs transition-all duration-150 ${isInEditMode ? 'border-slate-300 bg-white text-slate-700' : 'border-slate-300 text-slate-500'}`}
								placeholder={'...This entry has no notes'}
								readOnly={!isInEditMode}
								onClick={stopEventPropagation}
							/>
						</Popover>
					</div>
				</div>
				<div
					className={`pointer-events-none absolute z-10 flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-t from-slate-500/10 to-white/0 transition-all duration-200 ${isInEditMode ? 'opacity-100' : 'opacity-0'}`}
				>
					<p
						className={`font-data text-4xl font-light tracking-wide text-slate-300 transition-all duration-200 ${isInEditMode ? 'opacity-100' : 'opacity-0'}`}
					>
						Editing
					</p>
				</div>
			</div>

			{confirmState && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
					<div className="rounded-md border border-slate-600 bg-slate-50 p-6 shadow-lg">
						<h1 className="font-data pb-2 font-semibold tracking-wide text-slate-600">
							{confirmMessage()}
						</h1>

						{confirmBody()}
					</div>
				</div>
			)}
		</>
	);
};
