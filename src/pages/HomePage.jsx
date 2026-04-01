import { Link } from 'react-router';

export default function Home() {
	return (
		<main className="flex flex-1 flex-col px-6">
			{/* Welcome Section */}
			<div className="mb-10 flex justify-center py-6">
				<h1 className="xs:text-2xl flex flex-col text-xl">
					<span>
						Welcome to{' '}
						<span className="font-semibold text-emerald-700">MileMetrics</span>
						...
					</span>
					<span className="pl-5">...Mile tracking made easy</span>
				</h1>
			</div>

			{/* Cards Section */}
			<div className="mb-12 flex flex-1 flex-col">
				<h1 className="xs:text-base mb-3 flex justify-center text-sm font-semibold tracking-tight">
					Select an option to get moving today!
				</h1>

				<ul className="flex flex-1 flex-col justify-between gap-6">
					<Link to="add-miles">
						<li className="flex flex-col items-center rounded-2xl border border-slate-500 bg-slate-50 p-3 text-center shadow-md hover:bg-emerald-100">
							<p className="xs:text-lg text-md mb-2 font-bold">
								Log your miles regularly
							</p>
							<p className="pt-0.5 text-sm">
								Stay on top of your driving by logging trips as you go — it
								keeps everything simple and up to date.
							</p>
						</li>
					</Link>

					<Link to="view-miles">
						<li className="flex flex-col items-center rounded-2xl border border-slate-500 bg-slate-50 p-3 text-center shadow-md hover:bg-emerald-100">
							<p className="xs:text-lg text-md mb-2 font-bold">
								Review your dashboard
							</p>
							<p className="pt-0.5 text-sm">
								Get a clear view of your totals and trends so you always know
								how your miles are adding up.
							</p>
						</li>
					</Link>

					<Link>
						<li className="flex flex-col items-center rounded-2xl border border-slate-500 bg-slate-50 p-3 text-center shadow-md hover:bg-emerald-100">
							<p className="xs:text-lg text-md mb-2 font-bold">
								Stay organized (coming soon)
							</p>
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
