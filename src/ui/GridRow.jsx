import { twMerge } from 'tailwind-merge';

export default function GridRow({
	data,
	headerCol = false,
	className,
	onClick = null,
}) {
	const { col1, col2, col3, col4, col5 } = data;
	return (
		<>
			<div
				onClick={onClick}
				className={twMerge(
					`min-h-13 flex-1 rounded-xs border-r-2 border-b-2 border-l-2 border-slate-500 ${headerCol && 'border-t-2'}`,
					className,
				)}
			>
				{col1}
			</div>
			<div
				onClick={onClick}
				className={twMerge(
					`min-h-13 flex-1 rounded-xs border-r-2 border-b-2 border-slate-500 ${headerCol && 'border-t-2'}`,
					className,
				)}
			>
				{col2}
			</div>
			<div
				onClick={onClick}
				className={twMerge(
					`min-h-13 flex-1 rounded-xs border-r-2 border-b-2 border-slate-500 ${headerCol && 'border-t-2'}`,
					className,
				)}
			>
				{col3}
			</div>
			<div
				onClick={onClick}
				className={twMerge(
					`min-h-13 flex-1 rounded-xs border-r-2 border-b-2 border-slate-500 ${headerCol && 'border-t-2'}`,
					className,
				)}
			>
				{col4}
			</div>
			<div
				onClick={onClick}
				className={twMerge(
					`flex min-h-13 flex-1 items-center justify-center rounded-xs border-r-2 border-b-2 border-slate-500 ${headerCol && 'border-t-2'}`,
					className,
				)}
			>
				{col5}
			</div>
		</>
	);
}
