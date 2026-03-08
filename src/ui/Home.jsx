import { Link } from 'react-router';

export default function Home() {
	return (
		<div className="mt-5 ml-3">
			<p>
				Welcome to Mile Metrics! Record your first miles{' '}
				<Link
					to="/my-miles"
					className="font-medium tracking-wide text-indigo-600 underline"
				>
					here
				</Link>
				!
			</p>
		</div>
	);
}
