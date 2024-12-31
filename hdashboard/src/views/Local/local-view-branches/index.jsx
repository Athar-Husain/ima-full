import React, { useState } from 'react';
import {
  TextField,
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
  Box,
  Snackbar,
  Alert,
  Icon,
} from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import success icon

const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4", "Branch 5"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#35b181',
    color: theme.palette.common.white,
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

const LocalViewBranches = () => {
  const [searchFor, setSearchFor] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const allMembers = [
    { name: 'John Doe', phone: '1234567890', membershipNo: '001', branch: 'Branch 1' },
    { name: 'Jane Smith', phone: '0987654321', membershipNo: '002', branch: 'Branch 2' },
    { name: 'Alice Johnson', phone: '4567891230', membershipNo: '003', branch: 'Branch 3' },
    { name: 'Robert Brown', phone: '2345678901', membershipNo: '004', branch: 'Branch 4' },
    { name: 'Emily Davis', phone: '5678901234', membershipNo: '005', branch: 'Branch 5' },
    { name: 'Michael Wilson', phone: '3456789012', membershipNo: '006', branch: 'Branch 1' },
    { name: 'Sarah Lee', phone: '6789012345', membershipNo: '007', branch: 'Branch 2' },
    { name: 'David Moore', phone: '7890123456', membershipNo: '008', branch: 'Branch 3' },
    { name: 'Laura Taylor', phone: '8901234567', membershipNo: '009', branch: 'Branch 4' },
    { name: 'James Anderson', phone: '9012345678', membershipNo: '010', branch: 'Branch 5' },
    { name: 'Olivia Thomas', phone: '1112223334', membershipNo: '011', branch: 'Branch 1' },
    { name: 'Liam Martin', phone: '2223334445', membershipNo: '012', branch: 'Branch 2' },
    { name: 'Sophia Martinez', phone: '3334445556', membershipNo: '013', branch: 'Branch 3' },
    { name: 'Benjamin Clark', phone: '4445556667', membershipNo: '014', branch: 'Branch 4' },
    { name: 'Chloe Rodriguez', phone: '5556667778', membershipNo: '015', branch: 'Branch 5' },
    { name: 'Daniel Lewis', phone: '6667778889', membershipNo: '016', branch: 'Branch 1' },
    { name: 'Emma Walker', phone: '7778889990', membershipNo: '017', branch: 'Branch 2' },
    { name: 'Noah Hall', phone: '8889990001', membershipNo: '018', branch: 'Branch 3' },
    { name: 'Mia Allen', phone: '9990001112', membershipNo: '019', branch: 'Branch 4' },
    { name: 'Lucas Young', phone: '0001112223', membershipNo: '020', branch: 'Branch 5' },
    { name: 'Amelia King', phone: '1231231234', membershipNo: '021', branch: 'Branch 1' },
    { name: 'Elijah Wright', phone: '2342342345', membershipNo: '022', branch: 'Branch 2' },
    { name: 'Ava Scott', phone: '3453453456', membershipNo: '023', branch: 'Branch 3' },
    { name: 'Mason Green', phone: '4564564567', membershipNo: '024', branch: 'Branch 4' },
    { name: 'Isabella Adams', phone: '5675675678', membershipNo: '025', branch: 'Branch 5' },
    { name: 'Ethan Nelson', phone: '6786786789', membershipNo: '026', branch: 'Branch 1' },
    { name: 'Charlotte Baker', phone: '7897897890', membershipNo: '027', branch: 'Branch 2' },
    { name: 'Logan Carter', phone: '8908908901', membershipNo: '028', branch: 'Branch 3' },
    { name: 'Harper Mitchell', phone: '9019019012', membershipNo: '029', branch: 'Branch 4' },
    { name: 'Alexander Perez', phone: '0120120123', membershipNo: '030', branch: 'Branch 5' },
  ];
  
  const handleSearch = () => {
    let filteredResults = allMembers;

    if (searchFor && searchText) {
      filteredResults = filteredResults.filter(member => {
        const searchTerm = searchText.toLowerCase();
        if (searchFor === 'name') {
          return member.name.toLowerCase().includes(searchTerm);
        } else if (searchFor === 'phone') {
          return member.phone.includes(searchTerm);
        } else if (searchFor === 'membershipNo') {
          return member.membershipNo.includes(searchTerm);
        }
        return false;
      });
    }

    if (selectedBranch) {
      filteredResults = filteredResults.filter(
        (member) => member.branch === selectedBranch
      );
    }

    setSearchResults(filteredResults);
    setIsTableVisible(true);

    const count = filteredResults.length;
    if (count > 0) {
      setSnackbarMessage(`Success! Records Found: ${count} Records`);
    } else {
      setSnackbarMessage("No records found for your search.");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Search Results');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'search_results.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Search Results", 14, 10);
    autoTable(doc, {
      head: [["Name", "Phone Number", "Membership Number", "Branch"]],
      body: searchResults.map(row => [row.name, row.phone, row.membershipNo, row.branch]),
    });
    doc.save('search_results.pdf');
  };

  return (
    <MainCard title="View Branches">
      <Box component="form" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Search For</InputLabel>
              <Select
                value={searchFor}
                onChange={(e) => setSearchFor(e.target.value)}
                label="Search For"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="phone">Phone Number</MenuItem>
                <MenuItem value="membershipNo">Membership Number</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Enter Text"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSearch}
              sx={{ backgroundColor: "#35b181", '&:hover': { backgroundColor: '#27a059' } }}
            >
              Search by Name/Phone No/Membership No
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Branch</InputLabel>
              <Select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                label="Select Branch"
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSearch}
              sx={{ backgroundColor: "#3579a1", '&:hover': { backgroundColor: '#2d688d' } }}
            >
              Search by Branch
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={exportToExcel}
              sx={{ backgroundColor: '#697586', '&:hover': { backgroundColor: '#364152' } }}
            >
              Export to Excel
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={exportToPDF}
              sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
            >
              Export to PDF
            </Button>
          </Grid>
        </Grid>

        {snackbarMessage && (
          <Box
            sx={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: 'white',
              color: '#35b181',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:2,
            }}
          >
            <CheckCircleIcon sx={{ marginRight: '10px' }} />
            {snackbarMessage}
          </Box>
        )}

        {isTableVisible && searchResults.length > 0 && (
          <TableContainer style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Membership Number</StyledTableCell>
                  <StyledTableCell>Branch</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                    <StyledTableCell>{row.membershipNo}</StyledTableCell>
                    <StyledTableCell>{row.branch}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        
      </Box>
    </MainCard>
  );
};

export default LocalViewBranches;







