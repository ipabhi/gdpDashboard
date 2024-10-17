import React from 'react';
import GdpChart from './Components/GdpChart';
import GdpTable from './Components/GdpTable';

export async function getServerSideProps() {
  try {
    const res = await fetch(
      'https://api.worldbank.org/v2/country/ind;chn;usa/indicator/NY.GDP.MKTP.KD.ZG?date=2013:2023&format=json'
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // Get the data
    const gdpData = data[1].reduce((acc, item) => {
      let country = item.country.value;
      const year = item.date;
      const value = item.value;

      if (country === 'United States') {
        country = 'USA';
      }

      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push({ year, value });
      return acc;
      console.log(acc);
    }, {});

    return {
      props: {
        gdpData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        gdpData: null,
        error: error.message,
      },
    };
  }
}

export default function Home({ gdpData, error }) {
  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (!gdpData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>World Bank GDP Growth Data (2013 - 2023)</h1>
      <GdpChart gdpData={gdpData} />
      <GdpTable gdpData={gdpData} />
    </div>
  );
}
