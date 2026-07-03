import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React, { useRef, useState, useMemo } from 'react';
import Button from '../../ui/Button';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import {
	deleteMileageEntry,
	updateMileageEntry,
} from '../../services/apiMileage';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export const MileageTable = ({ data = [] }) => {
	const [rowIdsInEditMode, setRowIdsInEditMode] = useState([]);

	const fieldRef = useRef({});
	const queryClient = useQueryClient();

	// Creating and defining table instance

	const columns = useMemo(() => {
		return [
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
	}, []);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => {
			return true;
		},
	});

	//  Handlers
	const handleToggleEdit = (row, e) => {
		e.stopPropagation();

		const rowId = row.id;

		rowIdsInEditMode.includes(rowId)
			? setRowIdsInEditMode(rowIdsInEditMode.filter((id) => id != rowId))
			: setRowIdsInEditMode([...rowIdsInEditMode, rowId]);
	};

	const handleDeleteEntry = async (row, e) => {
		e.stopPropagation();

		try {
			await deleteMileageEntry(row.original.id);
			queryClient.invalidateQueries(['miles']);

			toast.success('Entry successfully deleted');
		} catch (err) {
			console.log(err);
			toast.error('Entry could not be deleted at this time');
		}
	};

	const handleSaveData = async (row, e) => {
		e.stopPropagation();

		const originalValues = { ...row.original };
		const currentValues = { ...fieldRef.current[row.id] };
		const finalValues = Object.keys(originalValues).reduce((acc, key) => {
			// Check for existance of DOM nodes
			if (!currentValues[key]) return acc;

			// Check if original and current key value differ
			if (originalValues[key] !== currentValues[key].value) {
				acc[key] = currentValues[key].value;
				return acc;
			}
			return acc;
		}, {});

		if (Object.keys(finalValues).length > 0) {
			try {
				await updateMileageEntry({
					id: originalValues.id,
					payload: finalValues,
				});

				queryClient.invalidateQueries({ queryKey: ['miles'] });
				toast.success('Changes saved');
			} catch (error) {
				console.log(error);
				toast.error('Failed to save changes');
			}
		}

		// Turn editing mode off after saving
		setRowIdsInEditMode(rowIdsInEditMode.filter((id) => id != row.id));
	};

	const stopEventPropagation = (e) => e.stopPropagation();

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
					const evenColumnStyling = isInEvenColumn ? 'bg-gray-50' : 'bg-white';
					const isInEditMode = rowIdsInEditMode.includes(row.id);

					return (
						<div key={row.id} onClick={row.getToggleExpandedHandler()}>
							<div
								className={`grid cursor-pointer grid-cols-5 items-center border-slate-300 py-1 text-center ${evenColumnStyling}`}
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

														<p className="my-0.5 text-sm font-light italic">
															{`${cellValue.length} Locations`}
														</p>

														<span
															className={`justify-self-end pr-2 transition-all duration-150 ease-linear ${
																row.getIsExpanded() ? 'rotate-540 ' : ''
															}`}
														>
															<ChevronDown />
														</span>
													</div>
												</div>
											);
										}

										return (
											<div
												className="grid grid-cols-[1fr_auto_1fr]"
												key={cell.id}
											>
												<p className="col-start-2 py-1 text-sm capitalize">
													{cellValue[0]}
												</p>
												<span
													className={`justify-self-end pr-2 transition-all duration-150 ease-linear ${
														row.getIsExpanded() ? 'rotate-540 ' : ''
													}`}
												>
													<ChevronDown />
												</span>
											</div>
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
								className={`grid cursor-pointer overflow-hidden border-b ${evenColumnStyling} border-slate-300 text-center transition-all duration-175 ${
									row.getIsExpanded() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								}`}
							>
								<div className="grid min-h-0 grid-cols-5">
									<div className="mx-auto flex items-start gap-1 py-1">
										{isInEditMode ? (
											<>
												<Button onClick={(e) => handleSaveData(row, e)}>
													Save
												</Button>
												<Button onClick={(e) => handleToggleEdit(row, e)}>
													Cancel
												</Button>
											</>
										) : (
											<>
												{' '}
												<Button onClick={(e) => handleToggleEdit(row, e)}>
													Edit
												</Button>
												<Button onClick={(e) => handleDeleteEntry(row, e)}>
													Delete
												</Button>
											</>
										)}
									</div>

									<div></div>
									<div></div>

									{/* Notes box */}

									<div>
										<textarea
											className={`notes-scrollbar h-32 w-60 resize-none rounded-2xl border border-slate-300 bg-gray-100 p-2 text-center text-sm shadow-xs transition-all duration-150 ${isInEditMode ? 'bg-slate-50 text-slate-700' : 'text-slate-500'}`}
											placeholder={'...This entry has no notes'}
											defaultValue={
												row.original.notes ? row.original.notes : ''
											}
											ref={(el) => {
												if (!fieldRef.current[row.id]) {
													fieldRef.current[row.id] = {};
												}

												fieldRef.current[row.id].notes = el;
											}}
											disabled={!isInEditMode}
											onClick={stopEventPropagation}
										/>
									</div>

									{/* All locations box */}

									<div
										onClick={stopEventPropagation}
										className="flex- mr-1.5 mb-1 w-4/5 cursor-default justify-self-center overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 pt-0.5 text-sm capitalize shadow-xs"
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
						</div>
					);
				})}
			</div>
		</div>
	);
};
