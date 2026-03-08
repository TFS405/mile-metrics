const getTodaysDateString = () => {
	const todaysDate = new Date().toLocaleDateString('en-CA').split('T')[0];
	return todaysDate;
};

const getYesterdaysDateString = () => {
	// Move the date object back one day and return YYYY-MM-DD
	const date = new Date();
	date.setDate(date.getDate() - 1);
	const YesterdaysDateToString = date.toISOString().split('T')[0];

	return YesterdaysDateToString;
};

export { getTodaysDateString, getYesterdaysDateString };
