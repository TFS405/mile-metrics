import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { MileageRow } from './MileageRow';
import { MileageExpandedRow } from './MileageExpandedRow';

export const MileageTable = ({ data = [] }) => {
	const [rowIdsInEditMode, setRowIdsInEditMode] = useState([]);
	const [expandedLocationIds, setExpandedLocationIds] = useState([]);

	const toggleEditMode = (row, e) => {
		const rowId = row.id;

		e.stopPropagation();

		rowIdsInEditMode.includes(rowId)
			? setRowIdsInEditMode(rowIdsInEditMode.filter((id) => id != rowId))
			: setRowIdsInEditMode([...rowIdsInEditMode, rowId]);
	};

	// Column definitions
	const columns = useMemo(() => {
		return [
			// Date
			{
				accessorKey: 'date',
				header: 'Date',
				cell: (info) => {
					const date = info.getValue();

					return (
						<p>
							{(() => {
								const [year, month, day] = date.split('-').map(Number);
								return new Date(year, month, day).toLocaleDateString('en-us', {
									month: 'long',
									year: 'numeric',
									day: 'numeric',
								});
							})()}
						</p>
					);
				},
			},
			// Initial Miles
			{
				accessorKey: 'initialMiles',
				header: 'Initial Miles',
				cell: (info) => {
					const initialMiles = info.getValue();

					return (
						<div>
							<NumericFormat
								thousandSeparator=","
								value={initialMiles}
								displayType="text"
								className={`text-center`}
							/>
						</div>
					);
				},
			},
			// Ending Miles
			{
				accessorKey: 'endingMiles',
				header: 'Ending Miles',
				cell: (info) => {
					const endingMiles = info.getValue();

					return (
						<NumericFormat
							thousandSeparator=","
							value={endingMiles}
							displayType="text"
							className={`text-center`}
						/>
					);
				},
			},
			// Total Miles
			{
				accessorKey: 'totalMiles',
				header: 'Total Miles',
				cell: (info) => {
					const totalMiles = info.getValue();

					return (
						<NumericFormat
							thousandSeparator=","
							value={totalMiles}
							displayType="text"
							className={`text-center`}
						/>
					);
				},
			},
			// Locations
			{
				accessorKey: 'locations',
				header: 'Locations',
				cell: (info) => {
					const { expandedLocationIds, toggleLocationExpansion } =
						info.table.options.meta;
					const id = info.row.original.id;
					const locations = info.getValue();
					const isExpanded = info.row.getIsExpanded();
					const isLocationsExpanded = expandedLocationIds.includes(id);

					// Rendering multi-location cells
					if (locations.length > 1) {
						{
							return (
								<div
									key={id}
									className="py-1.5"
									onClick={(e) => {
										e.stopPropagation();
										toggleLocationExpansion(id);
									}}
								>
									<div className="grid grid-cols-[1fr_auto_1fr] items-center">
										<p className="col-start-2 font-light italic">
											{`${locations.length} Locations`}
										</p>

										<span
											className={`justify-self-end transition-all duration-150 ease-linear ${
												isExpanded ? 'rotate-540 pl-2' : 'pr-2'
											}`}
										>
											<ChevronDown />
										</span>
									</div>

									<div
										className={`grid transition-all duration-150 ${isLocationsExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
									>
										<div className={`overflow-hidden`}>
											<ul>
												{locations.map((location) => (
													<li className="text-sm tracking-tight text-slate-600 capitalize">
														{location}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							);
						}
					}

					return (
						<div className="grid grid-cols-[1fr_auto_1fr]" key={id}>
							<p className="col-start-2 py-1 capitalize">{locations[0]}</p>
							<span
								className={`justify-self-end pr-2 transition-all duration-150 ease-linear ${
									isExpanded ? 'rotate-540 ' : ''
								}`}
							>
								<ChevronDown />
							</span>
						</div>
					);
				},
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
		meta: {
			expandedLocationIds,
			toggleLocationExpansion: (rowId) => {
				expandedLocationIds.includes(rowId)
					? setExpandedLocationIds(
							expandedLocationIds.filter((id) => id != rowId),
						)
					: setExpandedLocationIds([...expandedLocationIds, rowId]);
			},
		},
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
			<div>
				{table.getRowModel().rows.map((row, index) => {
					const isInEditMode = rowIdsInEditMode.includes(row.id);

					return (
						<div key={row.id} onClick={row.getToggleExpandedHandler()}>
							<MileageRow row={row} index={index}>
								<MileageExpandedRow
									row={row}
									index={index}
									isInEditMode={isInEditMode}
									toggleEditMode={toggleEditMode}
								/>
							</MileageRow>
						</div>
					);
				})}
			</div>
		</div>
	);
};
