import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStateBranches } from 'redux/features/state/stateSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StateViewBranches = () => {
  const dispatch = useDispatch();
  const { stateBranches = [], loading, error } = useSelector((state) => state.states);
  const [filterStateName, setFilterStateName] = useState('');

  // Fetch data from the Redux store
  useEffect(() => {
    dispatch(getAllStateBranches());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setFilterStateName(event.target.value);
  };

  const handleExportToExcel = () => {
    const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StateBranches');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'StateBranches.xlsx');
  };

  const handleExportToPdf = () => {
    const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
    const doc = new jsPDF();
    doc.text('State Branches', 14, 15);
    autoTable(doc, {
      head: [['State Name']],
      body: filteredData.map((branch) => [branch.stateName])
    });
    doc.save('StateBranches.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Filter stateBranches based on the selected filterStateName
  const filteredBranches = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));

  return (
    <MainCard title="State Branches">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="filter-label">Filter by State Name</InputLabel>
            <Select labelId="filter-label" id="filter-select" value={filterStateName} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(stateBranches.map((branch) => branch.stateName))).map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleExportToExcel}>
              Export to Excel
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} onClick={handleExportToPdf}>
              Export to PDF
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TableContainer component={Box} sx={{ mt: 3 }}>
        <Table id="stateBranchesTable" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>State Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBranches.map((branch) => (
              <StyledTableRow key={branch.stateuserId || branch._id}>
                <StyledTableCell>{branch.stateName}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default StateViewBranches;
