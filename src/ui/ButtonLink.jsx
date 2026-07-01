import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function ButtonLink({ children, className = '', to = '' }) {
	return (
		<Link
			to={to}
			className={twMerge(
				'rounded-full border-2 border-slate-400 bg-slate-50 px-4 py-3 text-center text-sm font-bold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:border-slate-500 hover:bg-slate-400 hover:text-white hover:shadow focus:outline-none focus-visible:border-emerald-500 focus-visible:shadow focus-visible:ring-3 focus-visible:ring-emerald-500 active:scale-95 active:border-slate-400/75 active:bg-slate-500 active:text-white',
				className,
			)}
		>
			{children}
		</Link>
	);
}
