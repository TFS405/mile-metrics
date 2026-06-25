import React, { useState } from 'react';
import GridRow from './MileageGridRow';
import Button from '../../../ui/Button';
import { LocationsCell } from './MileageGridLocationsCell';

export const GridBodyRow = ({ data }) => {
	const [expandedRowIds, setExpandedRowIds] = useState([]);
	const [entryIdsInEditMode, setEntryIdsInEditMode] = useState([]);

	// Beginning of iteration
	return data.map((entry) => {
		const isRowExpanded = expandedRowIds.includes(entry.id);
		const hasNotes = Boolean(entry.notes);
		const isInEditMode = entryIdsInEditMode.includes(entry.id);

		// Toggle row expansion
		const handleToggleRowExpansion = () => {
			isRowExpanded
				? setExpandedRowIds(expandedRowIds.filter((id) => id !== entry.id))
				: setExpandedRowIds([...expandedRowIds, entry.id]);
		};

		// Toggle edit mode
		const handleToggleEditMode = () => {
			isInEditMode
				? setEntryIdsInEditMode(
						entryIdsInEditMode.filter((id) => id !== entry.id),
					)
				: setEntryIdsInEditMode([...entryIdsInEditMode, entry.id]);
		};

		return (
			<React.Fragment key={entry.id}>
				<GridRow
					onClick={handleToggleRowExpansion}
					className="relative z-10 flex cursor-pointer items-center justify-center border-slate-700 bg-stone-100/50 font-semibold text-slate-600 shadow-sm"
					key={entry.id}
					data={{
						col1: (
							<p
								className={`flex h-full w-full items-center justify-center bg-stone-100/50 transition-all duration-100 ${isInEditMode ? 'ring-3 ring-amber-400 outline-none' : ''}`}
							>
								{entry.date}
							</p>
						),
						col2: (
							<p
								className={`flex h-full w-full items-center justify-center bg-white transition-all duration-100 ${isInEditMode ? 'ring-3 ring-amber-400 outline-none' : ''}`}
							>
								{entry.initialMiles}
							</p>
						),
						col3: (
							<p
								className={`flex h-full w-full items-center justify-center bg-stone-100/50 transition-all duration-100 ${isInEditMode ? 'ring-3 ring-amber-400 outline-none' : ''}`}
							>
								{entry.endingMiles}
							</p>
						),
						col4: (
							<p
								className={`flex h-full w-full items-center justify-center bg-white transition-all duration-100 ${isInEditMode ? 'ring-3 ring-amber-400 outline-none' : ''}`}
							>
								{entry.totalMiles}
							</p>
						),
						col5: (
							<LocationsCell
								className={`transition-all duration-100 ${isInEditMode ? 'ring-3 ring-amber-400 outline-none' : ''}`}
								entry={entry}
							/>
						),
					}}
				/>

				<div
					className={`relative z-0 flex items-start border-x-2 border-b-2 border-slate-300 border-x-slate-700 bg-slate-100 text-slate-700 transition-all duration-200 ${isRowExpanded ? 'h-40 p-2' : 'h-0 overflow-hidden opacity-0'}`}
				>
					<div className="flex flex-col pt-1 pl-3">
						<h3 className="pt-1 pb-2 text-center text-sm font-semibold text-slate-500">
							Actions
						</h3>
						<div className="flex flex-col gap-2">
							<Button onClick={handleToggleEditMode} className="h-12 w-20">
								{isInEditMode ? 'cancel' : 'edit'}
							</Button>
							{isInEditMode && <Button className="h-12 w-20">Save</Button>}
						</div>
					</div>

					<div className="ml-auto h-32 w-xl max-w-lg space-y-1 rounded-sm border-2 border-slate-500 text-sm">
						<textarea
							value={hasNotes ? entry.notes : 'This entry has no notes...'}
							className={`h-full w-full p-2 transition-all duration-100 ${isInEditMode ? 'bg-white shadow-lg ring-3 ring-amber-400 outline-none' : 'bg-slate-200 text-slate-700/80'}`}
							disabled={!isInEditMode}
						></textarea>
					</div>
				</div>
			</React.Fragment>
		);
	});
};
