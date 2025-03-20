import { useEffect, useState } from 'react';
import { CountryData } from '../types/countryData';
import { CountryList } from '../components/countryList/CountryList';

function App() {
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    try {
      fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((data) => setData(data));
    } catch (error) {
      console.error(error);
      setData([]);
    }
  }, []);

  return (
    <>
      <h1>Countries</h1>
      <CountryList countries={data} />
    </>
  );
}

export default App;
