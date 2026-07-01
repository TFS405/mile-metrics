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

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: (row) => {
			return true;
		},
	});

	const handleToggleEdit = (e) => {
		e.stopPropagation();
	};
	const handleDelete = (e) => {
		e.stopPropagation();
	};

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
					console.log(row.original);
					const isInEvenColumn = Boolean(index % 2 === 0);
					const evenColumnStyling = isInEvenColumn ? 'bg-gray-50' : 'bg-white';

					return (
						<div key={row.id} onClick={row.getToggleExpandedHandler()}>
							<div
								className={`grid cursor-pointer grid-cols-5 items-center border-slate-300 text-center ${evenColumnStyling}`}
							>
								{row.getVisibleCells().map((cell) => {
									const cellType = cell.column.id;
									const cellValue = cell.getValue();

									const isTotalMilesCell = cellType === 'totalMiles';

									if (cellType === 'locations') {
										if (cellValue.length > 1) {
											return (
												<div key={cell.id} className="py-1.5">
													<div className="grid grid-cols-[1fr_auto_1fr] items-center">
														<div></div>

														<Button className="my-0.5 w-fit px-2 py-2.5">
															{`${cellValue.length} Locations`}
														</Button>

														<div className="flex justify-end pr-2.5">
															<span
																className={`justify-self-end transition-all duration-150 ease-linear ${
																	row.getIsExpanded() ? 'rotate-540 ' : ''
																}`}
															>
																<ChevronDown />
															</span>
														</div>
													</div>
												</div>
											);
										}

										return (
											<p key={cell.id} className="py-1 text-sm capitalize">
												{cellValue[0]}
											</p>
										);
									}

									return (
										<div key={cell.id} className="h-fit">
											<p
												className={` ${
													isTotalMilesCell ? 'font-semibold' : ''
												}`}
											>
												{cellValue}
											</p>
										</div>
									);
								})}
							</div>

							{/* Expanding row */}
							<div
								className={`grid overflow-hidden border-b ${evenColumnStyling} border-slate-300 text-center transition-all duration-175 ${
									row.getIsExpanded() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								}`}
							>
								<div className="grid min-h-0 grid-cols-5">
									<div className="mx-auto flex items-start gap-1 py-1">
										<Button onClick={handleToggleEdit}>Edit</Button>
										<Button onClick={handleDelete}>Delete</Button>
									</div>

									<div></div>
									<div></div>
									<div>
										<textarea
											className="h-32 resize-none rounded-2xl border border-slate-300 bg-gray-100 p-2 text-sm text-slate-500 shadow-xs"
											value={
												row.original.notes
													? row.original.notes
													: '...This entry has no notes'
											}
										/>
									</div>
									<div className="mr-1.5 mb-1 flex flex-col rounded-2xl border border-slate-300 pt-0.5 text-sm capitalize shadow-xs">
										<p className="font-data mb-0.5 border-b border-b-slate-300 pb-0.5 font-semibold">
											All Locations
										</p>
										{row.getVisibleCells().map((cell) => {
											const isLocationCell = cell.column.id === 'locations';

											return (
												isLocationCell &&
												cell
													.getValue()
													.map((location) => (
														<p className="pb-0.5">{location}</p>
													))
											);
										})}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
