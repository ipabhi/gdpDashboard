import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GdpChart = ({gdpData}) => {
	// console.log('GDP Data:', gdpData);

	// Check data structure
	if (!gdpData || !gdpData.India) {
		return <div>No data available</div>;
	}

	// Prepare data for Highcharts
	const year = gdpData.India.map((data) => data.year).reverse();
	// console.log('Years for x-axis:', years);
	const indiaData = gdpData.India.map((data) =>
		// Limit to 2 decimal places
		parseFloat(data.value.toFixed(2))
	).reverse();
	const chinaData = gdpData.China.map((data) => parseFloat(data.value.toFixed(2))).reverse();
	const usaData = gdpData.USA.map((data) => parseFloat(data.value.toFixed(2))).reverse();
	const brasilData = gdpData.Brazil.map((data) => parseFloat(data.value.toFixed(2))).reverse();

	// Highcharts options
	const options = {
		chart: {
			type: 'area',
		},
		title: {
			text: '',
		},
		xAxis: {
			categories: year, // Display year value
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
			{
				name: 'Brazil',
				data: brasilData,
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
