export default function MileageDisplay({ config }) {
	const selectedConfig = {
		day: { timeFrame: 'daily' },
		week: { timeFrame: 'weekly' },
		month: { timeFrame: 'monthly' },
		lifetime: { timeFrame: 'lifetime' },
	};

	const mode = selectedConfig[config];

	return (
		<section className="m-10 rounded-2xl border p-3">
			<dl>
				<dt>{mode.timeFrame} Miles</dt>
				<dd></dd>

				<dt>Area Worked</dt>
				<dd></dd>

				<dt></dt>
				<dd></dd>

				<dt></dt>
				<dd></dd>
			</dl>
		</section>
	);
}
