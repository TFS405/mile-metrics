import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';

export const MileageMaterialTable = ({ tableData }) => {
	console.log(tableData);
	const columns = [
		{ accessorKey: 'date', header: 'date' },
		{ accessorKey: 'initialMiles', header: 'Initial Miles' },
		{ accessorKey: 'endingMiles', header: 'Ending Miles' },
		{ accessorKey: 'totalMiles', header: 'Total Miles' },
		{
			accessorKey: 'locations',
			header: 'Locations',
			Cell: ({ cell }) => {
				const locations = cell.getValue();

				if (locations.length < 1) return 'No Locations for this entry';

				if (locations.length === 1) return locations[0];

				return `${locations.length} locations`;
			},
		},
	];

	const table = useMaterialReactTable({ columns, data: tableData });

	return <MaterialReactTable table={table} />;
};
