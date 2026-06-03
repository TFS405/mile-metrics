const dateStringToMilliseconds = (dateString: string): number => {
	const [year, month, date] = dateString.split('-').map(Number);
	return new Date(year, month - 1, date).getTime();
};

const getTodayDateString = () => {
	const today = new Date();

	const day = String(today.getDate()).padStart(2, '0');
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const year = String(today.getFullYear());

	return `${year}-${month}-${day}`;
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
	const startRange = dateStringToMilliseconds(startDateString);
	const endRange = dateStringToMilliseconds(endDateString);
	const targetDate = dateStringToMilliseconds(targetDateString);

	if (!startDateString || !endDateString || !targetDateString) {
		console.log('Invalid data provided to isWithinDateRange function.');
		return false;
	}

	return targetDate >= startRange && targetDate <= endRange;
};

export { isWithinDateRange, getDateStringFromOffset };
