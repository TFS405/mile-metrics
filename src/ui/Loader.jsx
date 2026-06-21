import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<LoaderCircle
				size={45}
				className="animate-[spin_1.5s_ease-in-out_infinite]"
			/>
		</div>
	);
};
