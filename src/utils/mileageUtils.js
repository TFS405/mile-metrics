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

export { totalAllMileage, getEntriesOnDate, getAreasOnDate };
