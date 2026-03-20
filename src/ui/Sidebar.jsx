import { Link } from 'react-router';

export default function Sidebar() {
	return (
		<div className="mb-5 flex w-full justify-between gap-2 border-b-2 border-b-slate-400 px-3 py-2 sm:mx-3 sm:h-full sm:w-20 sm:flex-col sm:border-r-2 sm:border-r-slate-400">
			<Link>
				<h1 className="text-xs font-extrabold tracking-tight sm:text-sm">
					<span className="text-slate-600/90">Mile</span>
					<span className="text-blue-600/90">Metrics</span>
				</h1>
			</Link>
			<ul className="mr-1 flex gap-5 text-xs font-semibold text-slate-600 sm:flex-col sm:pt-3 sm:text-sm">
				<li>
					<Link to={'/add-miles'}>Add Miles</Link>
				</li>
				<li>
					<Link to={'view-miles'}>View miles</Link>
				</li>
			</ul>
		</div>
	);
}
