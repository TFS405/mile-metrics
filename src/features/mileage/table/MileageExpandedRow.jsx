import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteMileageEntry } from '../../../services/apiMileage';
import Button from '../../../ui/Button';

export const MileageExpandedRow = ({
	row,
	index,
	isInEditMode,
	toggleEditMode,
}) => {
	const rowId = row.id;
	const evenColumnStyling = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

	const queryClient = useQueryClient();

	//  Handlers
	const handleDeleteEntry = async (row, e) => {
		e.stopPropagation();

		try {
			await deleteMileageEntry(rowId);
			queryClient.invalidateQueries(['miles']);

			toast.success('Entry successfully deleted');
		} catch (err) {
			console.log(err);
			toast.error('Entry could not be deleted at this time');
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
			<div
				className={`grid min-h-0 grid-cols-5 ${row.getIsExpanded() ? 'pb-1.5' : 'pb-0'}`}
			>
				<div className="mx-auto flex items-start gap-1 py-1">
					{isInEditMode ? (
						<>
							<Button onClick={(e) => handleSaveData(row, e)}>Save</Button>
							<Button onClick={(e) => toggleEditMode(row, e)}>Cancel</Button>
						</>
					) : (
						<>
							{' '}
							<Button onClick={(e) => toggleEditMode(row, e)}>Edit</Button>
							<Button onClick={(e) => handleDeleteEntry(row, e)}>Delete</Button>
						</>
					)}
				</div>

				{/* Notes box */}

				<>
					<textarea
						className={`notes-scrollbar col-start-4 h-32 w-60 resize-none rounded-2xl border border-slate-300 bg-gray-100 p-2 text-center text-sm shadow-xs transition-all duration-150 ${isInEditMode ? 'bg-slate-50 text-slate-700' : 'text-slate-500'}`}
						placeholder={'...This entry has no notes'}
						defaultValue={row.original.notes ? row.original.notes : ''}
						disabled={!isInEditMode}
						onClick={stopEventPropagation}
					/>
				</>

				{/* All locations box */}

				<div
					onClick={stopEventPropagation}
					className="col-start-5 mr-1.5 mb-1 w-4/5 cursor-default flex-col justify-self-center overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 pt-0.5 text-sm capitalize shadow-xs"
				>
					<p className="font-data border-b border-b-slate-300 pb-0.5 font-semibold">
						All Locations
					</p>
					<div
						className={`rounded-1xl h-full w-full rounded-b-2xl bg-gray-100 tracking-tight transition-all duration-100 ${isInEditMode ? 'bg-slate-50' : ''}`}
					>
						<div className="pt-1">
							{row.getVisibleCells().map((cell) => {
								const isLocationCell = cell.column.id === 'locations';

								return (
									isLocationCell &&
									cell.getValue().map((location, index) => (
										<p className="tracking-tight" key={index}>
											{location}{' '}
										</p>
									))
								);
							})}
							<span
								className={`text-xs italic transition-all duration-100 ${isInEditMode ? 'font-light text-gray-400 opacity-100' : 'opacity-0'}`}
							>
								...add another location
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
