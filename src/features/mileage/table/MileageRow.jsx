import { flexRender } from '@tanstack/react-table';
import Button from '../../../ui/Button';

export const MileageRow = ({ row, index, children }) => {
	const rowId = row.id;
	const evenColumnStyling = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

	return (
		<div key={rowId}>
			<div
				className={`grid cursor-pointer grid-cols-5 items-center border-slate-300 py-1 text-center ${evenColumnStyling}`}
			>
				{/* Rendering cells */}
				{row.getVisibleCells().map((cell) => {
					return (
						<div key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</div>
					);
				})}
			</div>
			{children}
		</div>
	);
};
