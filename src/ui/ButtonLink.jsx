import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { ArrowLeft } from 'lucide-react';

export default function ButtonLink({ children, className = '', to = '' }) {
	return (
		<Link
			to={to}
			className={twMerge(
				'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95',
				className,
			)}
		>
			<ArrowLeft
				size={16}
				className="transition-transform duration-200 group-hover:-translate-x-1"
			/>
			{children}
		</Link>
	);
}
