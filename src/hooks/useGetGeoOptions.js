import { useWatch } from 'react-hook-form';
import useGetCountries from './useGetCountries';
import useGetLocalities from './useGetLocalities';
import useGetRegions from './useGetRegions';

export default function useGetGeoOptions(control, index) {
  const selectedCountry = useWatch({
    control,
    name: `locations.${index}.country`,
  });
  const selectedRegion = useWatch({
    control,
    name: `locations.${index}.region`,
  });

  // Country list and codes
  const countries = useGetCountries();
  const countryCode = countries.find(
    (country) => country.name === selectedCountry,
  )?.iso2;
  // Region list and codes
  const regions = useGetRegions(countryCode) || [
    { name: 'No regions available ' },
  ];

  const regionCode = regions?.find(
    (region) => region.name === selectedRegion,
  )?.iso2;
  // Localities
  const localities = useGetLocalities(countryCode, regionCode);

  return {
    countries,
    regions,
    localities,
  };
}
