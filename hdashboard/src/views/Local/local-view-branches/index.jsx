import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocalBranches } from '../../../redux/features/local/localSlice';

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#365463',
    color: theme.palette.common.white,
    fontSize: 18
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

const LocalViewBranches = () => {
  const dispatch = useDispatch();
  const { localBranches, isLocalLoading, isLocalError, localMessage } = useSelector((state) => state.local);

  const [filterStateName, setFilterStateName] = useState('');
  const [filterStateBranch, setFilterStateBranch] = useState('');

  useEffect(() => {
    dispatch(getAllLocalBranches());
  }, [dispatch]);

  const handleStateNameFilterChange = (event) => {
    setFilterStateName(event.target.value);
  };

  const handleStateBranchFilterChange = (event) => {
    setFilterStateBranch(event.target.value);
  };

  // Filter logic to handle both filters: stateBranch and localbranchName
  const filterBranches = () => {
    return localBranches?.filter((branch) => {
      const matchesStateBranch = filterStateBranch ? branch.stateBranch?.stateName === filterStateBranch : true;
      const matchesStateName = branch.localbranchName?.toLowerCase().includes(filterStateName.toLowerCase());
      return matchesStateBranch && matchesStateName;
    });
  };

  const handleExportToExcel = () => {
    const filteredData = filterBranches().map((branch) => ({
      localbranchName: branch.localbranchName,
      localbranchCode: branch.localbranchCode,
      Email: branch.email
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LocalBranches');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'LocalBranches.xlsx');
  };

  const handleExportToPdf = () => {
    const filteredData = filterBranches();
    const doc = new jsPDF();
    doc.text('State Branches', 14, 15);
    autoTable(doc, {
      head: [['State Name', 'State Code', 'Email']],
      body: filteredData.map((branch) => [branch.localbranchName, branch.localbranchCode, branch.email])
    });
    doc.save('LocalBranches.pdf');
  };

  const filteredBranches = filterBranches();

  if (isLocalLoading) return <div>Loading...</div>;
  if (isLocalError) return <div>Error fetching data: {isLocalError}</div>;

  // Create a list of unique stateBranches for the Select dropdown
  const stateBranchOptions = [...new Set(localBranches?.map((branch) => branch.stateBranch?.stateName))];

  return (
    <MainCard title="View Local Branches">
      <Box component="form" noValidate>
        <Grid container spacing={2} alignItems="center">
          {/* State Branch Filter Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>State Branch</InputLabel>
              <Select value={filterStateBranch} onChange={handleStateBranchFilterChange} label="State Branch">
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {stateBranchOptions.map((stateName, index) => (
                  <MenuItem key={index} value={stateName}>
                    {stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Search Field */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search Local Branch Name"
              variant="outlined"
              fullWidth
              value={filterStateName}
              onChange={handleStateNameFilterChange}
            />
          </Grid>

          {/* Export Buttons */}
          <Grid item xs={12} sm={3} md={3}>
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

          <Grid item xs={12} sm={3} md={3}>
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

        {/* Branches Table */}
        {filteredBranches?.length > 0 ? (
          <TableContainer style={{ marginTop: '20px', borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S No.</StyledTableCell>
                  <StyledTableCell>State Name</StyledTableCell>
                  <StyledTableCell>Branch Name</StyledTableCell>
                  <StyledTableCell>Branch Code</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBranches?.map((branch, index) => (
                  <StyledTableRow key={branch._id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{branch.stateBranch.stateName}</StyledTableCell>
                    <StyledTableCell>{branch.localbranchName}</StyledTableCell>
                    <StyledTableCell>{branch.localbranchCode}</StyledTableCell>
                    <StyledTableCell>{branch.email}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No Branches Found</div>
        )}
      </Box>
    </MainCard>
  );
};

export default LocalViewBranches;
