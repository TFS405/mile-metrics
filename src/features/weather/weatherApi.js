import { fetchWeatherApi } from 'openmeteo';

export const getWeatherData = async (params) => {
	const url = 'https://archive-api.open-meteo.com/v1/archive';
	const responses = await fetchWeatherApi(url, params);
	const response = responses[0];
	const daily = response.daily();

	const tempData = {
		highTemp: Math.round(daily.variables(0).valuesArray()[0]),
		lowTemp: Math.round(daily.variables(1).valuesArray()[0]),
		weatherCode: daily.variables(2).valuesArray()[0],
	};

	return tempData;
};
