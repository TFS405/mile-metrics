import { getCitiesOfState } from '@countrystatecity/countries-browser';
import { useEffect, useState } from 'react';

export default function useGetLocalities(countryCode, regionCode) {
  const [localitiesList, setLocalitiesList] = useState([]);

  useEffect(() => {
    if (!countryCode || !regionCode) return;

    async function getLocalities() {
      const localities = await getCitiesOfState(countryCode, regionCode);
      setLocalitiesList(localities);
    }
    getLocalities(countryCode, regionCode);
  }, [countryCode, regionCode]);

  return localitiesList;
}
