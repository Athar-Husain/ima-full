import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMembers } from '../../redux/features/auth/memberSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#35b181",
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

const ViewMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchStateBranch, setSearchStateBranch] = useState('');
  const [searchLocalBranch, setSearchLocalBranch] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(100);

  const { allMembers, isLoading, isError } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

useEffect(() => {
  const filtered = allMembers.filter((member) => {
    const fullName = `${member.firstName || ''} ${member.lastName || ''}`.toLowerCase();
    const phone = member.contact?.mobile || '';
    const StateBranch = member.membershipDetails?.stateBranchName || ''; // Ensure membershipDetails is not null or undefined
    const LocalBranch = member.membershipDetails?.localBranchName || ''; // Ensure membershipDetails is not null or undefined
    
    // Check if the fields are present in the member and match the search criteria
    return fullName.includes(searchName.toLowerCase()) && 
           phone.includes(searchPhone) && 
           StateBranch.includes(searchStateBranch.toLowerCase()) && 
           LocalBranch.includes(searchLocalBranch.toLowerCase());
  });
  setFilteredMembers(filtered);
}, [searchName, searchPhone, searchStateBranch, searchLocalBranch, allMembers]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('IMA Members List', 14, 10);
    doc.autoTable({
      head: [['Full Name', 'State Branch', 'Local Branch', 'Contact No', 'Email']],
      body: filteredMembers.map((member) => [
        `${member.firstName || ''} ${member.lastName || ''}`,
        member.membershipDetails?.stateBranchName || 'N/A',
        member.membershipDetails?.localBranchName || 'N/A',
        member.contact?.mobile || 'N/A',
        member.contact?.email || 'N/A',
      ]),
    });
    doc.save('IMA_Members.pdf');
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredMembers.map((member) => ({
        FullName: `${member.firstName || ''} ${member.lastName || ''}`,
        StateBranch: member.membershipDetails?.stateBranchName || 'N/A',
        LocalBranch: member.membershipDetails?.localBranchName || 'N/A',
        ContactNo: member.contact?.mobile || 'N/A',
        Email: member.contact?.email || 'N/A',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');
    XLSX.writeFile(wb, 'IMA_Members.xlsx');
  };

  const handleViewDetails = (id) => {
    navigate(`/view-member/${id}`);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1301,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <CircularProgress color="primary" size={80} />
      </Box>
    );

  if (isError) return <Typography color="error">{isError}</Typography>;

  return (
    <Box sx={{  maxWidth: 'auto', margin: '0 auto', width: '100%',marginTop:'-13px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
        <Paper
          sx={{
            width: '100%',
            padding: 3,
            boxShadow: 3,
            backgroundColor: '#f9f9f9',
            marginBottom:1
          }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{ paddingBottom: 0 }}>
            IMA-AMS Members - Search Members
          </Typography>

          <Grid container spacing={5} sx={{ paddingTop: 2 }}>
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
                          variant="contained"
                          size="large"
                          fullWidth
                          onClick={handleExportExcel}
                          sx={{ backgroundColor: "#3579a1", '&:hover': { backgroundColor: '#2d688d' } }}
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
                          variant="contained"
                          size="large"
                          fullWidth
                          onClick={handleExportPDF}
                          sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
                        >
                          Export to PDF
                        </Button>
                      </Grid>
            
            
          </Grid>
        </Paper>
      </Box>

      <Paper sx={{ boxShadow: 3 }}>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ marginBottom: 3, fontWeight: 'bold' }}
          >
            Members Details
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Full Name', 'State Branch', 'Local Branch', 'Contact No', 'Email', 'Actions'].map(
                    (heading) => (
                      <StyledTableCell key={heading}>{heading}</StyledTableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          {`${member.firstName || ''} ${member.lastName || ''}`}
                        </StyledTableCell>
                        <StyledTableCell>
                          {member.membershipDetails?.stateBranchName || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell>
                          {member.membershipDetails?.localBranchName || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell>{member.contact?.mobile}</StyledTableCell>
                        <StyledTableCell>
                          {member.contact?.email || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell>
                        <Button
  variant="contained"
  onClick={() => handleViewDetails(member._id)}
  sx={{
    backgroundColor: '#697586',
    color: "white",
    padding: "4px 8px", // Reduced padding for a smaller button
    fontSize: "12px",   // Smaller font size
    minWidth: "auto", 
    marginLeft:"10px",
    // Remove default min-width
    '&:hover': {
      backgroundColor: '#364152',
    },
  }}
>
  View / Edit
</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

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

export default ViewMembers;
