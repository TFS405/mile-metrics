import { isWithinDateRange, getDateStringFromOffset } from './dateUtils';

const totalAllMileage = (
	entries = [],
	startDateString = null,
	endDateString = null,
) => {
	if (startDateString && endDateString) {
		return entries.reduce((total, entry) => {
			if (isWithinDateRange(startDateString, endDateString, entry.date)) {
				return total + entry.endingMiles - entry.initialMiles;
			}

			return total;
		}, 0);
	}

	if (startDateString) {
		const matchingEntry = entries.find(
			(entry) => entry.date === startDateString,
		);

		if (matchingEntry) {
			return matchingEntry.endingMiles - matchingEntry.initialMiles;
		}

		return 0;
	}

	return entries.reduce((total, entry) => {
		return total + entry.endingMiles - entry.initialMiles;
	}, 0);
};

const getAreasInDateRange = (
	entries = [],
	startDateString = null,
	endDateString = null,
) => {
	if (!startDateString && !endDateString) {
		const areasSet = entries.reduce((areas, entry) => {
			(entry.locations ?? []).forEach((location) => {
				areas.add(location);
			});

			return areas;
		}, new Set());

		return [...areasSet];
	}

	if (endDateString === null) {
		const matchingEntry = entries.find(
			(entry) => entry.date === startDateString,
		);

		if (matchingEntry) {
			return matchingEntry.locations ?? [];
		}

		return [];
	}

	const areasSet = entries.reduce((areas, entry) => {
		if (isWithinDateRange(startDateString, endDateString, entry.date)) {
			(entry.locations ?? []).forEach((location) => {
				areas.add(location);
			});
		}

		return areas;
	}, new Set());

	return [...areasSet];
};

export const mileageStats = (data = []) => {
	const today = getDateStringFromOffset(0);
	const yesterday = getDateStringFromOffset(-1);
	const oneWeekAgo = getDateStringFromOffset(-7);
	const oneMonthAgo = getDateStringFromOffset(-30);

	return {
		today: {
			name: 'Daily',
			miles: totalAllMileage(data, today),
			areas: getAreasInDateRange(data, today),
		},
		yesterday: {
			name: 'Yesterday',
			miles: totalAllMileage(data, yesterday),
			areas: getAreasInDateRange(data, yesterday),
		},
		previousWeek: {
			name: 'Weekly',
			miles: totalAllMileage(data, oneWeekAgo, today),
			areas: getAreasInDateRange(data, oneWeekAgo, today),
		},
		previousMonth: {
			name: 'Monthly',
			miles: totalAllMileage(data, oneMonthAgo, today),
			areas: getAreasInDateRange(data, oneMonthAgo, today),
		},
		lifetime: {
			name: 'Lifetime',
			miles: totalAllMileage(data),
			areas: getAreasInDateRange(data),
		},
	};
};
