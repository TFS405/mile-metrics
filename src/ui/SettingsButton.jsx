import { Cog } from 'lucide-react';

export const SettingsButton = ({ onClick, sizeSVG = 21 }) => {
	return (
		<div
			className="group active:slate-700 flex cursor-pointer items-center justify-start gap-1 text-slate-500 transition-all duration-125 hover:text-slate-700 active:scale-90"
			onClick={onClick}
		>
			<p className="font-data font-medium tracking-wide">Settings</p>
			<Cog
				size={sizeSVG}
				className="transition-all duration-100 group-hover:rotate-450"
			/>
		</div>
	);
};
