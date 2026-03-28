import { Link } from 'react-router';

export default function Sidebar() {
	return (
		<div className="mb-7 flex w-full justify-between gap-2 border-b-2 border-b-slate-400 px-3 py-2 text-emerald-700 sm:mx-3 sm:h-full sm:w-20 sm:flex-col sm:border-r-2 sm:border-r-slate-400">
			<Link>
				<h1 className="text-xs font-semibold sm:text-sm">MileMetrics</h1>
			</Link>
			<ul className="mr-1 flex gap-5 text-xs font-semibold text-slate-600 sm:flex-col sm:pt-3 sm:text-sm">
				<li>
					<Link
						className="font-semibold tracking-tight text-slate-600"
						to={'/add-miles'}
					>
						Add Miles
					</Link>
				</li>
				<li>
					<Link
						className="font-semibold tracking-tight text-slate-600"
						to={'view-miles'}
					>
						View miles
					</Link>
				</li>
			</ul>
		</div>
	);
}
