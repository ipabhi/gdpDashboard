import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GdpTable = ({ gdpData }) => {
  const [rowData, setRowData] = useState([]);

  // Prepare column header for AG Grid table
  const columnDefs = [
    { headerName: 'Country', field: 'country', sortable: true },
    { headerName: 'Year', field: 'year', sortable: true },
    {
      headerName: 'GDP Growth (%)',
      field: 'value',
      sortable: true,
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
        height: 'auto',
        width: '75%',
        margin: '20px auto',
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={20}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default GdpTable;
