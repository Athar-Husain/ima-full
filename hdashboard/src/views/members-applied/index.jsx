import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedMembers } from '../../redux/features/auth/memberSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CheckCircle, Visibility } from '@mui/icons-material'; // Import icons


// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3579a1",
    color: theme.palette.common.white,
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AppliedMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchStateBranch, setSearchStateBranch] = useState('');
  const [searchLocalBranch, setSearchLocalBranch] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(100);

  const { appliedMembers, isLoading, isError } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getAppliedMembers());
  }, [dispatch]);

  useEffect(() => {
    const filtered = appliedMembers.filter((member) => {
      const fullName = `${member.firstName || ''} ${member.lastName || ''}`.toLowerCase();
      const phone = member.contact?.mobile || '';
      const stateBranch = (member.membershipDetails?.stateBranchName || '').toLowerCase().trim();
      const localBranch = (member.membershipDetails?.localBranchName || '').toLowerCase().trim();
    
      return fullName.includes(searchName.toLowerCase().trim()) &&
             phone.includes(searchPhone.trim()) &&
             stateBranch.includes(searchStateBranch.toLowerCase().trim()) &&
             localBranch.includes(searchLocalBranch.toLowerCase().trim());
    });
    
    setFilteredMembers(filtered);
  }, [searchName, searchPhone, searchStateBranch, searchLocalBranch, appliedMembers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewDetails = (id) => {
    navigate(`/applied-member/${id}`);
  };

  const handleApprove = (id) => {
    navigate(`/approve-member/${id}`);
    // Add your approval logic here
  };

  const exportToExcel = () => {
    const formattedData = filteredMembers.map((member) => ({
      "Full Name": `${member.firstName || ''} ${member.lastName || ''}`,
      "State Branch Name": member.membershipDetails?.stateBranchName || 'N/A',
      "Local Branch Name": member.membershipDetails?.localBranchName || 'N/A',
      "Contact No.": member.contact?.mobile || 'N/A',
      "Email Address": member.contact?.email || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applied Members");
    XLSX.writeFile(workbook, "AppliedMembers.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Full Name", "State Branch Name", "Local Branch Name", "Contact No.", "Email Address"];
    const tableRows = filteredMembers.map((member) => [
      `${member.firstName || ''} ${member.lastName || ''}`,
      member.membershipDetails?.stateBranchName || 'N/A',
      member.membershipDetails?.localBranchName || 'N/A',
      member.contact?.mobile || 'N/A',
      member.contact?.email || 'N/A',
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("AppliedMembers.pdf");
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{isError}</Typography>;

  return (
    <Box sx={{ maxWidth: 'auto', margin: '0 auto', width: '100%', marginTop: '-13px' }}>
      {/* Filters and Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Paper
          sx={{
            width: '100%',
            padding: 3,
            boxShadow: 3,
            backgroundColor: '#f9f9f9',
            marginBottom: 1,
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            IMA-AMS - Search Applied Members
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Member Name"
                variant="outlined"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={exportToExcel}
                sx={{ backgroundColor: '#35b181', '&:hover': { backgroundColor: '#239A6E' } }}
              >
                Export to Excel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="State Branch"
                variant="outlined"
                value={searchStateBranch}
                onChange={(e) => setSearchStateBranch(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Local Branch"
                variant="outlined"
                value={searchLocalBranch}
                onChange={(e) => setSearchLocalBranch(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                onClick={exportToPDF}
                sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
              >
                Export to PDF
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Member Data Table */}
      <Paper sx={{ overflow: 'hidden', boxShadow: 3 }}>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ marginBottom: 3, fontWeight: 'bold' }}
          >
            Applied Members Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Full Name</StyledTableCell>
                  <StyledTableCell>State Branch Name</StyledTableCell>
                  <StyledTableCell>Local Branch Name</StyledTableCell>
                  <StyledTableCell>Contact Number</StyledTableCell>
                  <StyledTableCell>Email Address</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{`${member.firstName || ''} ${member.lastName || ''}`}</StyledTableCell>
                        <StyledTableCell>{member.membershipDetails?.stateBranchName || 'N/A'}</StyledTableCell>
                        <StyledTableCell>{member.membershipDetails?.localBranchName || 'N/A'}</StyledTableCell>
                        <StyledTableCell>{member.contact?.mobile}</StyledTableCell>
                        <StyledTableCell>{member.contact?.email || 'N/A'}</StyledTableCell>
                        <StyledTableCell>
                        <Button
                            variant="contained"
                            onClick={() => handleApprove(member._id)}
                            sx={{
                              backgroundColor: '#4caf50',
                              color: "white",
                              marginRight: 1,
                              '&:hover': { backgroundColor: '#388e3c' },
                            }}
                            startIcon={<CheckCircle />}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleViewDetails(member._id)}
                            sx={{
                              backgroundColor: '#2196f3',
                              color: "white",
                              '&:hover': { backgroundColor: '#1976d2' },
                            }}
                            startIcon={<Visibility />}
                          >
                            View
                          </Button>

                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      No applied members found.
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={filteredMembers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AppliedMembers;
