const totalAllMileage = (entries, dateString = '') => {
	const entriesToUse = dateString
		? entries.filter((entry) => entry.date === dateString)
		: entries;

	return entriesToUse.reduce((acc, i) => acc + i.totalMiles, 0);
};

const getEntriesOnDate = (entries, datestring) => {
	return entries.filter((entry) => entry.date === datestring);
};

const getAreasOnDate = (entries, datestring) => {
	const selectedEntriesOnDate = entries.find(
		(entry) => entry.date === datestring,
	);
	return selectedEntriesOnDate.areas;
};

export { totalAllMileage, getEntriesOnDate, getAreasOnDate };
