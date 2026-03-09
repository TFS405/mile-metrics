const totalAllMileage = (entries, dateString = '') => {
	const entriesToUse = dateString
		? entries.filter((entry) => entry.date === dateString)
		: entries;

	return entriesToUse.reduce((acc, i) => acc + i.totalMiles, 0);
};

const getEntriesOnDate = (entries, datestring) => {
	return entries.filter((entry) => entries.date === datestring);
};

export { totalAllMileage, getEntriesOnDate };
