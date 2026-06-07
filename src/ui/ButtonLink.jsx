import { Link } from 'react-router';

export default function ButtonLink({ children, to = '' }) {
	return (
		<Link
			to={to}
			className="rounded-full border-2 border-slate-500 bg-slate-50 px-4 py-3 text-center text-sm font-bold tracking-wider text-slate-600 transition-all duration-150 hover:cursor-pointer hover:border-slate-300 hover:bg-slate-500 hover:text-white hover:shadow focus:outline-none focus-visible:border-emerald-500 focus-visible:shadow focus-visible:ring-3 focus-visible:ring-emerald-500 active:scale-95 active:border-slate-400/75 active:bg-slate-600 active:text-white"
		>
			{children}
		</Link>
	);
}
