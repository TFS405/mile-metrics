import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import Button from '../../ui/Button';
import { ChevronDown } from 'lucide-react';

export const MileageTable = ({ data = [] }) => {
	const columns = [
		{
			accessorKey: 'date',
			header: 'Date',
		},
		{
			accessorKey: 'initialMiles',
			header: 'Initial Miles',
		},
		{
			accessorKey: 'endingMiles',
			header: 'Ending Miles',
		},
		{
			accessorKey: 'totalMiles',
			header: 'Total Miles',
		},
		{
			accessorKey: 'locations',
			header: 'Locations',
		},
	];
	// console.log(data);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: (row) => row.original.locations?.length > 1,
	});

	return (
		// Container
		<div className="overflow-hidden rounded-md shadow-md">
			{/* Header row */}
			<div className="text-md font-data grid grid-cols-5 border-t-2 border-b-2 border-slate-300 bg-gray-100 py-2 text-center font-semibold tracking-wide text-gray-600/95">
				{table.getHeaderGroups().map((headerGroup) => {
					return (
						<React.Fragment key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<div key={header.id} className="items-center text-center">
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</div>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>

			{/* Body rows */}
			<div className="">
				{table.getRowModel().rows.map((row, index) => {
					const isInEvenColumn = Boolean(index % 2 === 0);
					const evenColumnStyling = 'bg-gray-50';
					const oddColumnStyling = 'bg-white';

					return (
						<div
							className={`grid grid-cols-5 items-center border-b-2 border-slate-300 py-1.5 text-center ${isInEvenColumn ? evenColumnStyling : oddColumnStyling}`}
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => {
								const cellType = cell.column.id;
								const cellValue = cell.getValue();

								const isTotalMilesCell = cellType === 'totalMiles';

								if (cellType === 'locations') {
									if (cellValue.length > 1) {
										return (
											<div key={cell.id}>
												<div className="grid grid-cols-[1fr_auto_1fr] items-center">
													<div></div>
													<Button
														onClick={row.getToggleExpandedHandler()}
														className="my-0.5 w-fit px-3.5 py-3"
													>{`${cellValue.length} Locations`}</Button>

													<div className="flex justify-end pr-2.5">
														<span
															className={`justify-self-end transition-all duration-150 ease-linear ${row.getIsExpanded() ? 'rotate-180 ' : ''}`}
														>
															<ChevronDown />
														</span>
													</div>
												</div>
												{/* Expanding locations list */}
												<div
													className={`grid capitalize transition-all duration-150 ${row.getIsExpanded() ? 'grid-rows-[1fr] pt-2 pb-0.5 opacity-100' : 'grid-rows-[0fr] py-0 opacity-0'}`}
												>
													<div
														className={`flex min-h-0 flex-col gap-0.5 overflow-hidden text-sm`}
													>
														{cellValue.map((location, index) => {
															return (
																<p key={`${cell.id}-${index}`}>{location}</p>
															);
														})}
													</div>
												</div>
											</div>
										);
									}
									return (
										<p key={cell.id} className="capitalize">
											{cellValue[0]}
										</p>
									);
								}

								return (
									<div className="h-fit">
										<p
											key={cell.id}
											className={` ${isTotalMilesCell ? 'font-semibold' : ''}`}
										>
											{cellValue}
										</p>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
