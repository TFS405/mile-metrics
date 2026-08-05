import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import Button from '../ui/Button';

export const SortBy = () => {
	const [selectedField, setSelectedField] = useState(null);

	const [searchParams, setSearchParams] = useSearchParams();
	const sortValue = searchParams.get('sort');
	const directionValue = searchParams.get('direction');

	const fields = ['Date', 'Initial', 'Ending', 'Total', 'Locations'];

	const svgLookup = {
		asc: ArrowUpWideNarrow,
		desc: ArrowDownWideNarrow,
	};
	const SVG = svgLookup[directionValue];

	// Handlers
	function handleClick(fieldName) {
		// Allow deselect onClick of selected field
		if (fieldName === selectedField) {
			searchParams.delete('sort');
			if (directionValue) searchParams.delete('direction');
			setSelectedField(null);
			setSearchParams(searchParams);
			return;
		}

		searchParams.set('sort', fieldName.toLowerCase());
		setSelectedField(fieldName);

		if (!searchParams.get('direction')) {
			searchParams.set('direction', 'asc');
		}

		setSearchParams(searchParams);
	}

	function toggleDirection(e) {
		e.stopPropagation();
		e.preventDefault();

		if (directionValue === 'asc') {
			searchParams.set('direction', 'desc');
			setSearchParams(searchParams);
		} else {
			searchParams.set('direction', 'asc');
			setSearchParams(searchParams);
		}
	}

	function ResetSearchParameters() {
		searchParams.delete('sort');
		searchParams.delete('direction');
		setSelectedField(null);
		setSearchParams(searchParams);
	}

	return (
		<div className="flex text-sm">
			<p className="pr-1.5 font-semibold tracking-tighter text-slate-600">
				Sort :
			</p>

			<div className="flex gap-1.5 pr-1">
				{fields.map((fieldName) => {
					const isSelectedField = fieldName === selectedField;

					return (
						<p
							onClick={() => {
								handleClick(fieldName);
							}}
							className={`cursor-pointer font-medium tracking-tighter text-slate-500 hover:text-slate-700 ${isSelectedField ? 'text-slate-700' : ''}`}
							key={fieldName}
						>
							{fieldName}
						</p>
					);
				})}
			</div>

			{sortValue && (
				<div className="flex">
					<div className="pr-0.5" onClick={(e) => toggleDirection(e)}>
						<button
							type="button"
							onClick={toggleDirection}
							aria-label="Toggle sorting direction"
							className="flex cursor-pointer pr-0.5 select-none"
						>
							<SVG size={20} className="text-slate-500 hover:text-slate-700" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
