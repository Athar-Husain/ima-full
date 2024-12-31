import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMembers, getAppliedMembers } from '../../redux/features/auth/memberSlice';
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
  TablePagination
} from '@mui/material';

const AppliedMembers = () => {
  // let AppliedMembers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(100);

  const { appliedMembers, isLoading, isError } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getAppliedMembers());
  }, [dispatch]);

  useEffect(() => {
    // Filter members when searchName or searchPhone changes
    const filtered = appliedMembers.filter((member) => {
      const fullName = `${member.firstName || ''} ${member.lastName || ''}`.toLowerCase();
      const phone = member.contact?.mobile || '';
      return fullName.includes(searchName.toLowerCase()) && phone.includes(searchPhone);
    });
    setFilteredMembers(filtered);
  }, [searchName, searchPhone, appliedMembers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewDetails = (id) => {
    // Navigate to the member's detail page using the member's ID
    navigate(`/applied-member/${id}`);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{isError}</Typography>;

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: '0 auto' }}>
      {/* Live Search Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Paper sx={{ width: '100%', maxWidth: 500, padding: 3, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            IMA-AMS Members
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Member Name"
                variant="outlined"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
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
      <Paper sx={{ overflow: 'hidden', boxShadow: 3 }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Members Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>State Branch</TableCell>
                  <TableCell>Local Branch</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>{`${member.firstName || ''} ${member.lastName || ''}`}</TableCell>
                      <TableCell>{member.membershipDetails?.stateBranchName || 'N/A'}</TableCell>
                      <TableCell>{member.membershipDetails?.localBranchName || 'N/A'}</TableCell>
                      <TableCell>{member.contact?.mobile}</TableCell>
                      <TableCell>{member.contact?.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleViewDetails(member._id)} // Navigate to member details with _id
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
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

export default AppliedMembers;
