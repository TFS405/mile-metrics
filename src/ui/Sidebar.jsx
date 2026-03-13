import { Link } from 'react-router';

export default function Sidebar() {
	return (
		<div className="pr- mx-3 flex h-full w-20 flex-col border-r-2 border-r-slate-400 pt-1">
			<Link>
				<h1 className="text-sm font-extrabold tracking-tight">
					<span className="text-slate-600/90">Mile</span>
					<span className="text-blue-600/90">Metrics</span>
				</h1>
			</Link>
			<ul className="flex flex-col gap-3 pt-3 text-sm font-semibold text-slate-600">
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
