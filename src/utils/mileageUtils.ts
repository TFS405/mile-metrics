import { isWithinDateRange } from './dateUtils';
import { mileageEntry } from '../features/mileage/mileageContext';

const totalAllMileage = (entries, dateString = '') => {
	const entriesToUse = dateString
		? entries.filter((entry) => entry.date === dateString)
		: entries;

	return entriesToUse.reduce((acc, i) => acc + i.totalMiles, 0);
};

const getEntriesOnDate = (entries, dateString) => {
	return entries.filter((entry) => entry.date === dateString);
};

const getAreasOnDate = (entries, dateString) => {
	const selectedEntriesOnDate = entries.find(
		(entry) => entry.date === dateString,
	);
	if (!selectedEntriesOnDate?.areas) return [];
	return selectedEntriesOnDate.areas;
};

const getAreasInDateRange = (
	entries: mileageEntry[],
	startDateString: string,
	endDateString: string,
) => {
	const areasSet = entries.reduce((acc, val) => {
		if (isWithinDateRange(startDateString, endDateString, val.date)) {
			val.areas.forEach((area) => {
				acc.add(area);
			});
			return acc;
		}
		return acc;
	}, new Set<string>());
	return [...areasSet];
};

export {
	totalAllMileage,
	getEntriesOnDate,
	getAreasOnDate,
	getAreasInDateRange,
};
