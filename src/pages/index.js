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
    <div className='container-fluid'>
      <h1 className='display-6 text-center m-2'>
        World Bank GDP Growth Data (2013 - 2023)
      </h1>
      <div className='container' style={{ width: '50%' }}>
        <div className='shadow-sm p-2 bg-body-tertiary rounded'>
          <p className='text-body-secondary lh-base'>
            Utilizing the World Bank API, A demo showing a stacked area chart
            and also a tabular presentation of GDP percentage values for China,
            India, and the USA from 2013 to 2023. This visualization emphasizes
            the economic shifts during the COVID-19 pandemic.
          </p>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 pt-2 col-md-6 pt-sm-4'>
          <GdpChart gdpData={gdpData} />
        </div>
        <div className='col-sm-12 pt-2 col-md-6 pt-sm-4'>
          <GdpTable gdpData={gdpData} />
        </div>
      </div>
    </div>
  );
}
