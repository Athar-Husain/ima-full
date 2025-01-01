import React, { useEffect, useState } from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStateBranches } from 'redux/features/state/stateSlice';

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#365463",
    color: theme.palette.common.white,
    fontSize: 18,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StateViewBranches = () => {
  const dispatch = useDispatch();
  const { stateBranches = [], loading, error } = useSelector((state) => state.states);
  const [filterStateName, setFilterStateName] = useState('');

  useEffect(() => {
    dispatch(getAllStateBranches());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setFilterStateName(event.target.value);
  };

  const filterBranches = () => {
    return stateBranches.filter((branch) =>
      branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase())
    );
  };

  const handleExportToExcel = () => {
    const filteredData = filterBranches().map((branch) => ({
      StateName: branch.stateName,
      StateCode: branch.stateCode,
      Email: branch.email,
      Mobile: branch.contact.mobile,
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StateBranches');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'StateBranches.xlsx');
  };

  const handleExportToPdf = () => {
    const filteredData = filterBranches();
    const doc = new jsPDF();
    doc.text('State Branches', 14, 15);
    autoTable(doc, {
      head: [['State Name', 'State Code', 'Email', 'Mobile']],
      body: filteredData.map((branch) => [
        branch.stateName,
        branch.stateCode,
        branch.email,
        branch.contact.mobile,
      ]),
    });
    doc.save('StateBranches.pdf');
  };

  const filteredBranches = filterBranches();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <MainCard title="View State Branches">
      <Box component="form" noValidate>
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search State Name"
              variant="outlined"
              fullWidth
              value={filterStateName}
              onChange={handleFilterChange}
            />
          </Grid>

          {/* Export Buttons */}
          <Grid item xs={12} sm={3} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleExportToExcel}
              sx={{ backgroundColor: '#697586', '&:hover': { backgroundColor: '#364152' } }}
            >
              Export to Excel
            </Button>
          </Grid>

          <Grid item xs={12} sm={3} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleExportToPdf}
              sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
            >
              Export to PDF
            </Button>
          </Grid>
        </Grid>

        {/* State Branches Table */}
        {filteredBranches.length > 0 ? (
          <TableContainer style={{ marginTop: '20px', borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S No.</StyledTableCell>
                  <StyledTableCell>State Name</StyledTableCell>
                  <StyledTableCell>State Code</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Mobile</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBranches.map((branch, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{branch.stateName}</StyledTableCell>
                    <StyledTableCell>{branch.stateCode}</StyledTableCell>
                    <StyledTableCell>{branch.email}</StyledTableCell>
                    <StyledTableCell>{branch.contact.mobile}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No State Branches Found</div>
        )}
      </Box>
    </MainCard>
  );
};

export default StateViewBranches;
