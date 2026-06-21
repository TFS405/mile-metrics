import { useState } from 'react';
import Button from '../../../ui/Button';

export const LocationsCell = ({ entry }) => {
	const [expandedLocationsIds, setExpandedLocationsIds] = useState([]);
	const isLocationsExpanded = expandedLocationsIds.includes(entry.id);

	// Toggle locations list expansion
	const handleToggleLocationsExpansion = () => {
		setExpandedLocationsIds((ids) =>
			ids.includes(entry.id)
				? ids.filter((id) => id !== entry.id)
				: [...ids, entry.id],
		);
	};

	const hasMultipleLocations = entry.locations.length > 1;

	return hasMultipleLocations ? (
		// If multiple locations, render a count button that reveals all locations on click
		<div
			key={entry.id}
			className={`flex h-full w-full flex-col items-center justify-start bg-stone-100/50 p-2`}
		>
			<Button
				onClick={handleToggleLocationsExpansion}
				className="flex h-9 items-center justify-center"
			>
				{`${entry.locations.length} Locations`}
			</Button>
			{/* Accordion component that can expand to render full list of entry locations */}
			<div
				className={`grid w-full bg-stone-100/50 transition-all duration-350 ${
					isLocationsExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				}`}
			>
				<div className="overflow-hidden">
					<ul className="mt-2 flex flex-col items-center capitalize">
						{entry.locations.map((location) => (
							<li key={location}>{location}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	) : (
		// If there is only one location then render the name of the location
		<p key={entry.id} className="text-center capitalize">
			{entry.locations}
		</p>
	);
};
