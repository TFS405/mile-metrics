import ButtonLink from '../../../ui/ButtonLink';

export const GridHeader = ({ timeFrame }) => {
	return (
		<div className="mb-5 grid grid-cols-3 place-items-center">
			<div></div>
			<div className="flex flex-col gap-1">
				<h1 className="text-center text-2xl font-semibold tracking-wide text-slate-700 capitalize">{`${timeFrame} Miles`}</h1>
				<p className="text-sm font-medium italic">
					Every mile you've tracked so far
				</p>
			</div>
			<div className="flex w-full justify-end">
				<ButtonLink to={-1} className="h-10 w-48 place-self-end">
					Go Back
				</ButtonLink>
			</div>
		</div>
	);
};
