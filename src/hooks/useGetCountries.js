import { getCountries } from '@countrystatecity/countries-browser';
import { useEffect, useState } from 'react';

export default function useGetCountries() {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    async function loadCountries() {
      const countries = await getCountries();
      setCountriesList(countries);
    }
    loadCountries();
  }, []);

  return countriesList;
}
