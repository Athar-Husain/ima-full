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
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { padding } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#35b181",
    color: theme.palette.common.white,
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px", // Reduced padding for less row spacing
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& td, & th': {
    padding: "5px", // Reduced padding for all cells in the row
  },
}));


const ViewMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
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
      return fullName.includes(searchName.toLowerCase()) && phone.includes(searchPhone);
    });
    setFilteredMembers(filtered);
  }, [searchName, searchPhone, allMembers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
    <Box sx={{ padding: 2, maxWidth: 1600, margin: '0 auto', width: '100%' }}>
    {/* Live Search Filters */}
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
      <Paper
        sx={{
          width: '100%',
          maxWidth:"auto",
          padding: 3,
          boxShadow: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
  variant="h3"
  align="center"
  gutterBottom
  sx={{ paddingBottom: 2 }}  // Adjust the value (e.g., 2, 3, etc.) based on your design needs
>
  IMA-AMS Members - Search Members
</Typography>

        <Grid container spacing={5} sx={{paddingTop:2}}>
          <Grid item xs={6} >
            <TextField
              fullWidth
              label="Member Name"
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>

      {/* Member Data Table */}
      <Paper sx={{ boxShadow: 3 }}>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ marginBottom: 3, fontWeight: 'bold' }}
          >
            Members Details
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow >
                  {['Full Name', 'State Branch', 'Local Branch', 'Contact No', 'Email', 'Actions'].map((heading) => (
                    <StyledTableCell key={heading}>{heading}</StyledTableCell>
                  ))}
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
  color="success"
  onClick={() => handleViewDetails(member._id)}
  sx={{
    backgroundColor: '#697586',
    color: "white",
    padding: "4px 8px", // Reduced padding for a smaller button
    fontSize: "12px",   // Smaller font size
    minWidth: "auto",   // Remove default min-width
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

export default ViewMembers;
