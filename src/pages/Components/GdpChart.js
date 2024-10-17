import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GdpChart = ({ gdpData }) => {
  // console.log('GDP Data:', gdpData);

  // Check data structure
  if (!gdpData || !gdpData.India) {
    return <div>No data available</div>;
  }

  // Prepare data for Highcharts
  const year = gdpData.India.map((data) => data.year).reverse();
  // console.log('Years for x-axis:', years);
  const indiaData = gdpData.India.map((data) =>
    parseFloat(data.value.toFixed(2))
  ); // Limit to 2 decimal places
  const chinaData = gdpData.China.map((data) =>
    parseFloat(data.value.toFixed(2))
  ); // Limit to 2 decimal places
  const usaData = gdpData.USA.map((data) => parseFloat(data.value.toFixed(2))); // Limit to 2 decimal places

  // Highcharts options
  const options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'GDP Growth Percentage (2013 - 2023)',
    },
    xAxis: {
      categories: year, // Display actual years
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'GDP Growth (%)',
      },
      min: 0,
    },
    series: [
      {
        name: 'India',
        data: indiaData,
      },
      {
        name: 'China',
        data: chinaData,
      },
      {
        name: 'USA',
        data: usaData,
      },
    ],
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GdpChart;
