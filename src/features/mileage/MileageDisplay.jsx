import { Link } from 'react-router';

export default function MileageDisplay({ stats, to }) {
	return (
		<Link
			to={to}
			className="rounded-xl border-2 border-slate-400 p-2 text-sm tracking-tight text-slate-700 shadow-sm"
		>
			<dl className="flex max-h-full shrink-0 flex-col space-y-2">
				<div className="flex gap-2">
					<dt className="tracking font-light">{stats.name} Miles : </dt>
					<dd>{stats.miles}</dd>
				</div>

				<div className="mt-2 min-h-0 overflow-y-auto">
					<dt className="tracking font-light">Area Worked :</dt>
					<dd className="flex text-sm font-light">
						{<RenderAreaItems areas={stats.areas} />}
					</dd>
				</div>
			</dl>
		</Link>
	);
}
function RenderAreaItems({ areas }) {
	return (
		<ul className="mt-2 grid grid-cols-2 gap-2">
			{areas?.map((item, index) => (
				<li className="break-inside-avoid capitalize" key={index}>
					{item}
				</li>
			))}
		</ul>
	);
}
