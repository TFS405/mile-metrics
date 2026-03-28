import { Link } from 'react-router';

export default function Home() {
	return (
		<main className="flex flex-1 flex-col space-y-12 px-6">
			<h1 className="ml-2 flex flex-col text-lg">
				<span>
					Welcome to <strong>MileMetrics</strong>...
				</span>
				<span className="ml-3">
					...tracking your miles made <em>easy</em>.
				</span>
			</h1>

			<div className="flex flex-1 flex-col">
				<h1 className="ml-2 font-semibold tracking-tight">
					Select an option to get moving today!
				</h1>

				<ul className="flex flex-1 flex-col justify-around">
					<Link to="add-miles">
						<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md hover:bg-emerald-100">
							<p className="text-md font-bold">Log your miles regularly</p>
							<p className="pt-0.5 text-sm">
								Stay on top of your driving by logging trips as you go—it keeps
								everything simple and up to date.
							</p>
						</li>
					</Link>

					<Link to="view-miles">
						<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md hover:bg-emerald-100">
							<p className="text-md font-bold">Review your dashboard</p>
							<p className="pt-0.5 text-sm">
								Get a clear view of your totals and trends so you always know
								how your miles are adding up.
							</p>
						</li>
					</Link>

					<Link>
						<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md hover:bg-emerald-100">
							<p className="text-md font-bold">Stay organized (coming soon)</p>
							<p className="pt-0.5 text-sm">
								Easily sort and manage your entries to keep everything neat and
								easy to find.
							</p>
						</li>
					</Link>
				</ul>
			</div>
		</main>
	);
}
