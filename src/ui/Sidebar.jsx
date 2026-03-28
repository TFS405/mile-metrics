import { NavLink } from 'react-router';

export default function Sidebar() {
	return (
		<div className="text- mb-7 flex w-full items-center justify-between gap-2 border-b border-b-slate-600 px-3 py-2 sm:mx-3 sm:h-full sm:w-20 sm:flex-col sm:border-r-2 sm:border-r-slate-400">
			<NavLink
				className={({ isActive }) =>
					`${isActive ? 'text-emerald-700' : 'text-slate-600'} font-semibold tracking-tight`
				}
				to="/"
			>
				<h1>MileMetrics</h1>
			</NavLink>

			<ul className="mr-1 flex gap-5 text-xs font-semibold text-slate-600 sm:flex-col sm:pt-3 sm:text-sm">
				<li>
					<NavLink
						className={({ isActive }) =>
							`${isActive && 'text-emerald-700'} 'text-slate-600'} font-semibold tracking-tight`
						}
						to={'/add-miles'}
					>
						Add Miles
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) =>
							`${isActive && 'text-emerald-700'} 'text-slate-600'} font-semibold tracking-tight`
						}
						to={'view-miles'}
					>
						View miles
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
