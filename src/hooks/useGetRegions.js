import { getStatesOfCountry } from '@countrystatecity/countries-browser';
import { useEffect, useState } from 'react';

export default function useGetRegions(countryCode) {
  const [regionsList, setRegionsList] = useState([]);

  useEffect(() => {
    if (!countryCode) return;

    async function getRegions() {
      const regions = await getStatesOfCountry(countryCode);
      setRegionsList(regions);
    }
    getRegions();
  }, [countryCode]);

  if (!countryCode) return [];
  return regionsList;
}
