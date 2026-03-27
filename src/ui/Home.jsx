import { Link } from 'react-router';

export default function Home() {
	return (
		<main className="flex flex-1 flex-col space-y-10 px-6 pt-2">
			<h1 className="ml-2">
				Welcome to <strong>MileMetrics</strong>, the perfect place to track your
				mile!
				{/* <Link
					to="/add-miles"
					className="font-medium tracking-wide text-indigo-600 underline"
				>
					here
				</Link>
				! */}
			</h1>

			<div className="space-y-2">
				<h1 className="mb-3 ml-2">
					Here are some tips to get the most use of your experience!
				</h1>

				<ul className="space-y-5">
					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Log your miles regularly</p>
						<p className="pt-0.5 text-sm">
							Adding entries daily helps keep your records accurate and easy to
							manage.
						</p>
					</li>
					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Review your dashboard</p>
						<p className="pt-0.5 text-sm">
							Adding entries daily helps keep your records accurate and easy to
							manage.
						</p>
					</li>
					<li className="flex flex-col rounded-2xl border border-slate-500 bg-slate-50 p-3 shadow-md">
						<p className="text-md font-bold">Stay organized (coming soon)</p>
						<p className="pt-0.5 text-sm">
							Adding entries daily helps keep your records accurate and easy to
							manage.
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
