import React, { useState } from 'react';
import GridRow from './MileageGridRow';
import Button from '../../../ui/Button';
import { LocationsCell } from './MileageGridLocationsCell';

export const GridBodyRow = ({ data }) => {
	const [expandedRowIds, setExpandedRowIds] = useState([]);

	// Beginning of iteration
	return data.map((entry) => {
		const isRowExpanded = expandedRowIds.includes(entry.id);

		// Toggle row expansion
		const handleToggleRowExpansion = () => {
			isRowExpanded
				? setExpandedRowIds(expandedRowIds.filter((id) => id != entry.id))
				: setExpandedRowIds([...expandedRowIds, entry.id]);
		};

		return (
			<React.Fragment key={entry.id}>
				<GridRow
					onClick={handleToggleRowExpansion}
					className="flex cursor-pointer items-center justify-center border-slate-700 bg-stone-100/50 font-semibold text-slate-600 shadow-md"
					key={entry.id}
					data={{
						col1: (
							<p className="flex h-full w-full items-center justify-center bg-stone-100/50">
								{entry.date}
							</p>
						),
						col2: (
							<p className="flex h-full w-full items-center justify-center bg-white">
								{entry.initialMiles}
							</p>
						),
						col3: (
							<p className="flex h-full w-full items-center justify-center bg-stone-100/50">
								{entry.endingMiles}
							</p>
						),
						col4: (
							<p className="flex h-full w-full items-center justify-center bg-white">
								{entry.totalMiles}
							</p>
						),
						col5: <LocationsCell entry={entry} />,
					}}
				/>

				<div>
					<Button>Edit</Button>
				</div>
			</React.Fragment>
		);
	});
};
