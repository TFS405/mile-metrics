import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

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
	console.log(data);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table className="w-full">
			<thead className="border-b-2 border-b-slate-400">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} className="pb-0.5">
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id} className="">
						{row.getVisibleCells().map((cell) => {
							const cellValue = cell.getValue();
							const cellId = cell.column.id;
							const cellDisplayValue = (() => {
								if (cellId === 'locations') {
									if (cellValue.length > 1) {
										return `${cellValue.length} Locations`;
									}
									return cellValue[0];
								}
								return cellValue;
							})(cellId);

							return (
								<td
									className="border-b-2 border-slate-300 py-2 text-center capitalize"
									key={cell.id}
								>
									{cellDisplayValue}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};
