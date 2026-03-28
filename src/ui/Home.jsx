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
					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Log your miles regularly</p>
						<p className="pt-0.5 text-sm">
							Stay on top of your driving by logging trips as you go—it keeps
							everything simple and up to date.
						</p>
					</li>

					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Review your dashboard</p>
						<p className="pt-0.5 text-sm">
							Get a clear view of your totals and trends so you always know how
							your miles are adding up.
						</p>
					</li>

					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Stay organized (coming soon)</p>
						<p className="pt-0.5 text-sm">
							Easily sort and manage your entries to keep everything neat and
							easy to find.
						</p>
					</li>
				</ul>
			</div>
		</main>
	);
}

/* 🚗 Log your miles regularly
Adding entries daily helps keep your records accurate and easy to manage.

📅 Use the correct date
Accurate dates ensure your daily and weekly summaries reflect the right data.

🧾 Enter start and end mileage
Recording both values gives you the most precise distance tracking.

📊 Review your dashboard
Check your totals and trends to stay informed about your activity.

⚡ Keep entries small and consistent
Logging trips as they happen is much easier than catching up later.

🏙️ Stay organized (coming soon)
Future features will help you categorize trips for better insights.

💰 Understand your mileage value
Tracking miles can support expense tracking and potential deductions.

🧠 Build a simple habit
Consistency over time makes tracking effortless and reliable.

*/
