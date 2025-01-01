import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Box, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import {
  getMemberData
  // updateApprovalStatus
} from '../../redux/features/auth/memberSlice';

const ViewMemberDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { memberdata, isLoading, isError } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getMemberData(id));
  }, [dispatch, id]);

  // Local state to manage approval dropdown
  const [approvalStatus, setApprovalStatus] = useState(memberdata?.approvals?.headquarters?.status || 'pending');

  const handleApprovalChange = (event) => {
    setApprovalStatus(event.target.value);
  };

  const handleSubmitApproval = () => {
    // Dispatch action to update the approval status
    // dispatch(updateApprovalStatus({ memberId: id, status: approvalStatus }));
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{isError}</Typography>;
  if (!memberdata) return <CircularProgress />;

  return (
    <MainCard title="Member Details">
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Displaying member details */}
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" fullWidth value={`${memberdata?.firstName} ${memberdata?.lastName}`} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Gender" fullWidth value={memberdata?.gender} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Specialty" fullWidth value={memberdata?.specialty} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Member ID" fullWidth value={memberdata?.membershipDetails?.memberid} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="State Branch" fullWidth value={memberdata?.membershipDetails?.stateBranchName} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Local Branch" fullWidth value={memberdata?.membershipDetails?.localBranchName} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Mobile No" fullWidth value={memberdata?.contact?.mobile} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth value={memberdata?.contact?.email || 'N/A'} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Street Address" fullWidth value={memberdata?.address?.street} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="City Address" fullWidth value={memberdata?.address?.city} disabled />
          </Grid>
        </Grid>

        {/* Approval Dropdown */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Approval Status
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Headquarters Approval</InputLabel>
            <Select value={approvalStatus} onChange={handleApprovalChange} label="Headquarters Approval">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approve</MenuItem>
              <MenuItem value="rejected">Reject</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Submit Approval */}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }} onClick={handleSubmitApproval}>
          Submit Approval
        </Button>
      </Box>
    </MainCard>
  );
};

export default ViewMemberDetails;
