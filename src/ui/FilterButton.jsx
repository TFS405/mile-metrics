import { Cog } from 'lucide-react';

export const FilterButton = ({ onClick, sizeSVG = 23 }) => {
	return (
		<div
			className="group active:slate-700 flex cursor-pointer items-center justify-center gap-1.5 text-slate-500 transition-all duration-125 hover:scale-102 hover:text-slate-600 active:scale-90"
			onClick={onClick}
		>
			<p className="font-data pl-1 font-medium tracking-wide">Settings</p>
			<Cog
				size={sizeSVG}
				className="transition-all duration-100 group-hover:rotate-450"
			/>
		</div>
	);
};
