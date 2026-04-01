import { NavLink } from 'react-router';

export default function Sidebar() {
	return (
		<div className="text- mb-7 flex w-full items-center justify-between gap-2 border-b border-b-slate-600 px-3 py-2">
			<NavLink
				className={({ isActive }) =>
					`${isActive ? 'text-emerald-700' : 'text-slate-600'} font-semibold tracking-tight`
				}
				to="/"
			>
				<h1>MileMetrics</h1>
			</NavLink>

			<ul className="mr-1 flex gap-5 text-xs font-semibold text-slate-600">
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
