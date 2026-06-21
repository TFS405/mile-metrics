import GridRow from './MileageGridRow';

export const GridHeaderRow = () => {
	return (
		<GridRow
			className={`b flex items-center justify-center border-slate-700 bg-slate-500 font-bold text-slate-50`}
			headerCol={true}
			data={{
				col1: <p className="">Date</p>,
				col2: <p className="">Initial Miles</p>,
				col3: <p className="">Ending Miles</p>,
				col4: <p className="">Total Miles</p>,
				col5: <p className="">Locations</p>,
			}}
		/>
	);
};
