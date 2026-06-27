import { twMerge } from 'tailwind-merge';

export default function GridRow({
	data,
	isHeaderCol = false,
	className,
	// eslint-disable-next-line no-unused-vars
	isInEditMode = false,
}) {
	const { col1, col2, col3, col4, col5 } = data;

	// styles
	const headerRowStyling = isHeaderCol ? 'border-t-2' : '';
	const cellBaseStyling = 'min-h-13 flex-1 rounded-xs border-r-2';
	const firstColCellStyling = 'border-l-2';

	return (
		// Container
		<div className={twMerge('grid grid-cols-5 transition-all')}>
			<div
				className={twMerge(
					cellBaseStyling,
					firstColCellStyling,
					headerRowStyling,
					className,
				)}
			>
				{col1}
			</div>
			<div className={twMerge(cellBaseStyling, headerRowStyling, className)}>
				{col2}
			</div>
			<div className={twMerge(cellBaseStyling, headerRowStyling, className)}>
				{col3}
			</div>
			<div className={twMerge(cellBaseStyling, headerRowStyling, className)}>
				{col4}
			</div>
			<div className={twMerge(cellBaseStyling, headerRowStyling, className)}>
				{col5}
			</div>
		</div>
	);
}
