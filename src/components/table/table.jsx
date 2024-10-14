import * as React from 'react';
import { useTheme, Box, Button, Typography, Paper } from '@mui/material';
import { useState, useMemo } from 'react';
import { mockDataStandards } from '../../data/mockData'; // Importing mock data for the table
import { DataGrid } from '@mui/x-data-grid'; // Importing the DataGrid component for displaying data

import { tokens } from '../../theme'; // Importing theme context and tokens
import Header from './header'; // Importing header component

const Table = ({ searchQuery }) => {
  const theme = useTheme(); // Get the current theme
  const colors = tokens(theme.palette.mode); // Get color tokens based on the theme mode
  const [selectedRows, setSelectedRows] = useState([]); // State to hold selected rows
  const [selectedCountry, setSelectedCountry] = useState(''); // State to hold selected country

  const filteredRows = useMemo(() => {
    return mockDataStandards.filter((row) => {
      const matchesSearchQuery = Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesCountry = selectedCountry ? row.jurisdictionCountry === selectedCountry : true;
      return matchesSearchQuery && matchesCountry; // Combine conditions
    });
  }, [searchQuery, selectedCountry]); // Include selectedCountry in dependencies

  const columns = [
    { field: 'id', headerName: 'AC Code', flex: 1 },
    {
      field: 'jurisdictionCountry',
      headerName: 'Jurisdiction Country',
      flex: 1,
      renderCell: (params) => {
        const country = params.value; // Get the value of the jurisdiction country
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '8px 0',
              cursor: 'pointer', // Change cursor to pointer
            }}
            onClick={() => {
              setSelectedCountry(prev => (prev === country ? '' : country)); // Toggle selected country
            }} // Toggle selected country on click
          >
            <Paper
              sx={{
                margin: 'auto',
                backgroundColor: '#393e46',
                color: "#fcfefe",
                borderRadius: '8px',
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px',
                width: '90%',
                boxShadow: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {country} {/* Display the jurisdiction country */}
              </Typography>
            </Paper>
          </Box>
        );
      },
      cellClassName: (params) => `country-${params.value.replace(/\s+/g, '-')}`, // Dynamic class name for styling
    },
    { field: 'documentIdentifier', headerName: 'Document Identifier', flex: 1 },
    { field: 'environmentalPerformanceFocus', headerName: 'Environmental Performance Areas of Focus', flex: 1 },
    { field: 'lifecycleStageFocus', headerName: 'Lifecycle Stage Areas of Focus', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'abstract', headerName: 'Abstract', flex: 1 },
    { field: 'publicationDate', headerName: 'Publication Date', flex: 1 },
    { field: 'standardType', headerName: 'Standard Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'technicalCommittee', headerName: 'Technical Committee', flex: 1 },
    { field: 'issuingBody', headerName: 'Issuing Body', flex: 1 }
  ];

  const handleExport = () => {
    if (selectedRows.length === 0) { // Check if any rows are selected
      alert("No rows selected for export."); // Alert if no rows are selected
      return; // Exit the function
    }

    const selectedData = mockDataStandards.filter((row) =>
      selectedRows.includes(row.id) // Include only selected rows
    );

    const csvContent = [
      columns.map(col => col.headerName).join(','), // Add header row
      ...selectedData.map(row =>
        columns.map(col => row[col.field] || '').join(',') // Add data rows
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob); // Create a URL for the blob
    const link = document.createElement('a'); // Create a link element
    link.href = url; // Set the URL as the link href
    link.setAttribute('download', 'selected_data.csv'); // Set the download attribute
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after download
  };

  return (
    <Box>
      <Header title="Overall dataset for project ABCXYZ" subtitle="Delivered by: R&I team" /> {/* Render header */}
      <Box sx={{ width: "95%", height: "600px", ml: "35px", mr: "35px" }}>
        <DataGrid
          rows={filteredRows} // Data to be displayed in the grid
          columns={columns} // Columns definition
          checkboxSelection // Enable checkbox selection for rows
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)} // Handle row selection
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700], // Header background color
              borderBottom: 'none', // Remove bottom border
              position: 'sticky', // Make header sticky
              top: 0, // Position at the top
              zIndex: 1, // Ensure header is above other content
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '14px', // Font size for header titles
              fontWeight: 'bold', // Bold font for titles
              color: colors.grey[100], // Text color for header titles
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400], // Background color for the data grid
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none', // Remove top border of footer
              backgroundColor: colors.blueAccent[700], // Footer background color
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`, // Checkbox color
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: colors.grey[800], // Row hover background color
              },
            },
          }} // Custom styling for DataGrid
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}> {/* Container for the export button */}
        <Button
          onClick={handleExport} // Trigger export on button click
          variant="contained" // Button variant
          color="primary" // Button color
        >
          Export Selected Rows
        </Button>
      </Box>
    </Box>
  );
};

export default Table; // Export Table component
