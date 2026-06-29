import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import Button from '../../ui/Button';

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
		<div className="shadow-sm">
			{/* Header row */}
			<div className="text-md grid grid-cols-5 border-t-2 border-b-2 border-slate-300 bg-gray-100 py-2 text-center font-semibold tracking-wide text-gray-600">
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
					const evenColumnStyling = 'bg-gray-50 	0 h-full';
					const oddColumnStyling = 'bg-slate-50 h-full';

					return (
						<div
							className={`grid grid-cols-5 items-center border-b-2 border-slate-300 py-1.5 text-center ${isInEvenColumn ? evenColumnStyling : oddColumnStyling}`}
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => {
								const cellType = cell.column.id;
								const cellValue = cell.getValue();

								if (cellType === 'locations') {
									if (cellValue.length > 1) {
										return (
											<div key={cell.id}>
												<Button
													onClick={row.getToggleExpandedHandler()}
													className="mb-0.5 w-fit justify-self-center px-3.5 py-3"
												>{`${cellValue.length} Locations`}</Button>

												<div
													className={`grid capitalize transition-all duration-200 ${row.getIsExpanded() ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
												>
													<div className={`min-h-0 overflow-hidden`}>
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

								return <p key={cell.id}>{cellValue}</p>;
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
