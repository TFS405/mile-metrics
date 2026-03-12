import { data } from 'react-router';

const dateStringToMilliseconds = (dateString: string): number => {
	const [year, month, date] = dateString.split('-').map(Number);
	return new Date(year, month - 1, date).getTime();
};

const getDateStringFromOffset = (offset: number): string => {
	const date = new Date();
	date.setDate(date.getDate() + offset);
	return date.toISOString().split('T')[0];
};

const isWithinDateRange = (
	startDateString: string,
	endDateString: string,
	targetDateString: string,
) => {
	const startRange = dateStringToMilliseconds(endDateString);
	const endRange = dateStringToMilliseconds(startDateString);
	const targetDate = dateStringToMilliseconds(targetDateString);

	if (!startDateString || !endDateString || !targetDateString) {
		console.log('Invalid data provided to isWithinDateRange function.');
		return false;
	}

	return targetDate >= startRange && targetDate <= endRange;
};

export { isWithinDateRange, getDateStringFromOffset };
