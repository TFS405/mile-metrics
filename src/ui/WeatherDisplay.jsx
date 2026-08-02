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
import { twMerge } from 'tailwind-merge';
import Loader from '../ui/Loader';

export const WeatherDisplay = ({ weatherData = null }) => {
	if (weatherData === null)
		return <Loader size={30} containerClassName="pt-5" />;

	const getWeatherConfig = () => {
		const { weatherCode, highTemp, lowTemp } = weatherData;
		const svgLookup = {
			0: {
				name: 'clear skies',
				svg: clearDay,
				theme: 'clear',
			},
			1: {
				name: 'mainly clear',
				svg: mostlyClearDay,
				theme: 'clear',
			},
			2: {
				name: 'partly cloudy',
				svg: partlyCloudyDay,
				theme: 'clear',
			},
			3: {
				name: 'overcast',
				svg: overcastDay,
				theme: 'overcast',
			},

			45: {
				name: 'foggy',
				svg: fogDay,
				theme: 'overcast',
			},
			48: {
				name: 'freezing fog',
				svg: freezingFog,
				theme: 'overcast',
			},

			51: {
				name: 'light drizzle',
				svg: drizzle,
				theme: 'overcast',
			},
			53: {
				name: 'moderate drizzle',
				svg: drizzle,
				theme: 'overcast',
			},
			55: {
				name: 'heavy drizzle',
				svg: drizzle,
				theme: 'overcast',
			},

			56: {
				name: 'light freezing drizzle',
				svg: overcastSleet,
				theme: 'overcast',
			},
			57: {
				name: 'heavy freezing drizzle',
				svg: overcastSleet,
				theme: 'overcast',
			},

			61: {
				name: 'light rain',
				svg: rain,
				theme: 'overcast',
			},
			63: {
				name: 'moderate rain',
				svg: rain,
				theme: 'overcast',
			},
			65: {
				name: 'heavy rain',
				svg: rain,
				theme: 'overcast',
			},

			66: {
				name: 'light freezing rain',
				svg: overcastSleet,
				theme: 'overcast',
			},
			67: {
				name: 'heavy freezing rain',
				svg: overcastSleet,
				theme: 'overcast',
			},

			71: {
				name: 'light snow',
				svg: snow,
				theme: 'overcast',
			},
			73: {
				name: 'moderate snow',
				svg: snow,
				theme: 'overcast',
			},
			75: {
				name: 'heavy snow',
				svg: overcastSnow,
				theme: 'overcast',
			},
			77: {
				name: 'snow grains',
				svg: snow,
				theme: 'overcast',
			},

			80: {
				name: 'light rain showers',
				svg: rain,
				theme: 'overcast',
			},
			81: {
				name: 'moderate rain showers',
				svg: overcastRain,
				theme: 'overcast',
			},
			82: {
				name: 'violent rain showers',
				svg: extremeRain,
			},

			85: {
				name: 'light snow showers',
				svg: snow,
				theme: 'overcast',
			},
			86: {
				name: 'heavy snow showers',
				svg: overcastSnow,
				theme: 'overcast',
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

		const stylingLookup = {
			clear: {
				container: 'bg-linear-to-br from-sky-200 to-gray-200',
				p: 'font-slate-500',
			},
			overcast: {
				container: '',
				p: '',
			},
		};

		return {
			svgName: svgLookup[weatherCode].name,
			svg: svgLookup[weatherCode].svg,
			highTemp: highTemp,
			lowTemp: lowTemp,
			containerStyling: stylingLookup[svgLookup[weatherCode].theme].container,
			pStyling: stylingLookup[svgLookup[weatherCode].theme].p,
		};
	};

	const { svgName, svg, highTemp, lowTemp, containerStyling, pStyling } =
		getWeatherConfig();

	return (
		<div className={twMerge('rounded-lg shadow-xs', containerStyling)}>
			<div className="grid grid-cols-3 items-center justify-items-center">
				<p className={twMerge('font-data font-medium', pStyling)}>
					{lowTemp}
					<span className="font-data">°F</span>
				</p>

				<div>
					<h3 className={twMerge('font-data font-medium', pStyling)}>
						{svgName}
					</h3>
					<img src={svg} width={55} alt={svgName} />
				</div>

				<p className={twMerge('font-data font-medium', pStyling)}>
					{highTemp}
					<span className="font-data">°F</span>
				</p>
			</div>
		</div>
	);
};
