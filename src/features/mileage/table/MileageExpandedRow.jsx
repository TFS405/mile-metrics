import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteMileageEntry } from '../../../services/apiMileage';
import Button from '../../../ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Pencil, Save, Trash } from 'lucide-react';
import { useFloating } from '@floating-ui/react';
import { Popover } from '../../../ui/Popover';

export const MileageExpandedRow = ({
	row,
	index,
	isInEditMode,
	toggleEditMode,
}) => {
	const queryClient = useQueryClient();
	const { refs, floatingStyles } = useFloating();

	const {
		register,
		handleSubmit,
		control,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: row.original,
	});

	const rowId = row.original.id;
	const evenColumnStyling =
		index % 2 === 0
			? 'bg-gradient-to-t to-gray-50 from-blue-50'
			: 'bg-gradient-to-t to-white from-blue-50';

	//  Handlers
	const handleDeleteEntry = async (row, e) => {
		const confirmed = window.confirm(
			'Are you sure you would like to delete this entry?',
		);
		e.stopPropagation();

		if (confirmed) {
			try {
				await deleteMileageEntry(rowId);
				queryClient.invalidateQueries(['miles']);

				toast.success('Entry successfully deleted');
			} catch (err) {
				console.log(err);
				toast.error('Entry could not be deleted at this time');
			}
		}
	};

	const handleSaveData = async (row, e) => {};

	const stopEventPropagation = (e) => e.stopPropagation();

	return (
		<div
			className={`grid cursor-pointer overflow-hidden border-b ${evenColumnStyling} border-slate-300 text-center transition-all duration-175 ${
				row.getIsExpanded() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
			}`}
		>
			{/* Grid Container */}
			<div
				className={`grid min-h-0 grid-cols-5 ${row.getIsExpanded() ? 'pb-1.5' : 'pb-0'}`}
			>
				{/* controls */}
				<div className="col-span-1">
					<div className="flex h-full w-fit items-end pl-1">
						<ul
							className="flex cursor-default gap-2"
							onClick={() => stopEventPropagation()}
						>
							<li></li>
							<li>
								<button
									ref={refs.setReference}
									title="edit"
									className="cursor-pointer"
									onClick={(e) => toggleEditMode(row, e)}
								>
									<Pencil
										size={22}
										className="text-gray-500 hover:text-gray-700"
									/>
								</button>
							</li>
							<li>
								<button
									title="delete"
									className="cursor-pointer"
									onClick={(e) => handleDeleteEntry(row, e)}
								>
									<Trash
										size={22}
										className="text-gray-500 hover:text-red-500"
									/>
								</button>
							</li>
							{isInEditMode && (
								<li>
									<button title="save">
										<Save className="text-gray-500 hover:text-green-600" />
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
							className={`notes-scrollbar h-40 w-14/16 resize-none rounded-2xl border border-slate-300 bg-gray-100 p-2 text-center text-sm shadow-xs transition-all duration-150 ${isInEditMode ? 'bg-slate-50 text-slate-700' : 'text-slate-500'}`}
							placeholder={'...This entry has no notes'}
							defaultValue={row.original.notes ? row.original.notes : ''}
							readOnly={!isInEditMode}
							onClick={stopEventPropagation}
						/>
					</Popover>
				</div>
			</div>
		</div>
	);
};
