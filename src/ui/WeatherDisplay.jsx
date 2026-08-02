import overcastDay from '@meteocons/svg/fill/overcast-day.svg';
import clearDay from '@meteocons/svg/fill/clear-day.svg';
import mostlyClearDay from '@meteocons/svg/fill/mostly-clear-day.svg';
import partlyCloudyDay from '@meteocons/svg/fill/partly-cloudy-day.svg';
import fogDay from '@meteocons/svg/fill/fog-day.svg';
import freezingFog from '@meteocons/svg/fill/fog.svg';
import drizzle from '@meteocons/svg/fill/drizzle.svg';
import thunderstormHail from '@meteocons/svg/fill/thunderstorms-hail.svg';
import thunderstormRain from '@meteocons/svg/fill/thunderstorms-rain.svg';
import rain from '@meteocons/svg/fill/rain.svg';
import overcastRain from '@meteocons/svg/fill/overcast-rain.svg';
import snow from '@meteocons/svg/fill/snow.svg';
import extremeRain from '@meteocons/svg/fill/extreme-rain.svg';
import overcastSnow from '@meteocons/svg/fill/overcast-snow.svg';
import thunderstormExtremeHail from '@meteocons/svg/fill/thunderstorms-extreme-hail.svg';
import overcastSleet from '@meteocons/svg/fill/overcast-sleet.svg';

export const WeatherDisplay = ({ weatherData = null }) => {
	if (weatherData === null) return;

	const getWeatherConfig = () => {
		const svgLookup = {
			0: {
				name: 'clear skies',
				svg: clearDay,
			},
			1: {
				name: 'mainly clear',
				svg: mostlyClearDay,
			},
			2: {
				name: 'partly cloudy',
				svg: partlyCloudyDay,
			},
			3: {
				name: 'overcast',
				svg: overcastDay,
			},

			45: {
				name: 'foggy',
				svg: fogDay,
			},
			48: {
				name: 'freezing fog',
				svg: freezingFog,
			},

			51: {
				name: 'light drizzle',
				svg: drizzle,
			},
			53: {
				name: 'moderate drizzle',
				svg: drizzle,
			},
			55: {
				name: 'heavy drizzle',
				svg: drizzle,
			},

			56: {
				name: 'light freezing drizzle',
				svg: overcastSleet,
			},
			57: {
				name: 'heavy freezing drizzle',
				svg: overcastSleet,
			},

			61: {
				name: 'light rain',
				svg: rain,
			},
			63: {
				name: 'moderate rain',
				svg: rain,
			},
			65: {
				name: 'heavy rain',
				svg: rain,
			},

			66: {
				name: 'light freezing rain',
				svg: overcastSleet,
			},
			67: {
				name: 'heavy freezing rain',
				svg: overcastSleet,
			},

			71: {
				name: 'light snow',
				svg: snow,
			},
			73: {
				name: 'moderate snow',
				svg: snow,
			},
			75: {
				name: 'heavy snow',
				svg: overcastSnow,
			},
			77: {
				name: 'snow grains',
				svg: snow,
			},

			80: {
				name: 'light rain showers',
				svg: rain,
			},
			81: {
				name: 'moderate rain showers',
				svg: overcastRain,
			},
			82: {
				name: 'violent rain showers',
				svg: extremeRain,
			},

			85: {
				name: 'light snow showers',
				svg: snow,
			},
			86: {
				name: 'heavy snow showers',
				svg: overcastSnow,
			},

			95: {
				name: 'thunderstorm',
				svg: thunderstormRain,
			},
			96: {
				name: 'thunderstorm with light hail',
				svg: thunderstormHail,
			},
			99: {
				name: 'thunderstorm with heavy hail',
				svg: thunderstormExtremeHail,
			},
		};

		return {
			svgName: svgLookup[weatherData.weatherCode].name,
			svg: svgLookup[weatherData.weatherCode].svg,
			highTemp: weatherData.highTemp,
			lowTemp: weatherData.lowTemp,
		};
	};

	const { svgName, svg, highTemp, lowTemp } = getWeatherConfig();

	return (
		<div className="rounded-lg border border-slate-300 bg-linear-to-br from-sky-200 to-gray-200 shadow-md">
			<div className="grid grid-cols-3 items-center justify-items-center">
				<p className="font-data font-medium text-slate-600">
					{lowTemp}
					<span className="font-data font-normal">°F</span>
				</p>
				<img src={svg} width={55} alt={svgName} />
				<p className="font-data font-medium text-slate-600">
					{highTemp}
					<span className="font-data font-normal">°F</span>
				</p>
			</div>
			<div className="flex">
				<h3>Precipitation</h3>
				<p>PRECIPITATION VALUE</p>
			</div>
		</div>
	);
};
