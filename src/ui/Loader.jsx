import { Loader as LoaderSvg } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function Loader({ size, containerClassName = '' }) {
	return (
		<div
			className={twMerge(
				'flex items-center justify-center',
				containerClassName,
			)}
		>
			<LoaderSvg
				size={size}
				className="animate-[spin_1.5s_ease-in-out_infinite]"
			/>
		</div>
	);
}
