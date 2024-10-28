import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GdpTable = ({gdpData}) => {
	const [rowData, setRowData] = useState([]);

	// Prepare column header for AG Grid table
	const columnDefs = [
		{headerName: 'Country', field: 'country', flex: 2, sortable: true},
		{
			headerName: 'Year',
			field: 'year',
			flex: 2,
			sortable: true,
			sort: 'desc',
		},
		{
			headerName: 'GDP Growth (%)',
			field: 'value',
			flex: 2,
			sortable: true,
			sort: 'desc',
			width: 150,
			valueFormatter: (params) => `${params.value.toFixed(2)}%`,
		},
	];

	// Prepare row data for AG Grid table
	useEffect(() => {
		const formattedData = [];
		Object.keys(gdpData).forEach((country) => {
			gdpData[country].forEach((item) => {
				formattedData.push({
					country,
					year: item.year,
					value: item.value,
				});
			});
		});
		setRowData(formattedData);
	}, [gdpData]);

	return (
		<div
			className='ag-theme-alpine'
			style={{
				height: 500,
			}}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={rowData}
				pagination={true}
				paginationPageSize={10}
				paginationPageSizeSelector={[10, 25]}
			/>
		</div>
	);
};

export default GdpTable;
