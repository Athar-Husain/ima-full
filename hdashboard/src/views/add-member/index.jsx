import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Box, Snackbar, Alert, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MainCard from 'ui-component/cards/MainCard';

const AddMember = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      fatherOrHusbandName: '',
      address: {
        street: '',
        city: '',
        state: '',
        pinCode: ''
      },
      contact: {
        landline: '',
        mobile: '',
        email: ''
      },
      paymentDetails: {
        utrNumber: ''
      },
      qualifications: [{ degree: '', university: '', year: '' }],
      experiences: [{ designation: '', institution: '', period: '' }],
      uploads: {
        photo: '',
        documents: [''],
        signature: ''
      },
      membershipDetails: {
        mappliedDate: '',
        memberid: '',
        membershipDate: '',
        stateBranch: '',
        stateBranchCount: '',
        localBranchCode: '',
        localBranchCount: 0,
        lmoram: '',
        fellowDetails: {
          isFellow: false,
          fellowYear: ''
        },
        specialty: '',
        specialtyCode: 0,
        stateName: '',
        stateCode: '',
        status: ''
      },
      approvals: {
        headquarters: {
          status: 'pending'
        },
        statebranch: {
          status: 'pending',
          approver: '',
          comments: ''
        },
        localbranch: {
          status: 'pending',
          approver: '',
          comments: ''
        }
      }
    }
  });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = (data) => {
    console.log(data);
    setSnackbar({
      open: true,
      message: 'Member added successfully!',
      severity: 'success'
    });
    reset();
  };

  return (
    <MainCard title="Add New Member">
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Controller
              name="memberid"
              control={control}
              rules={{ required: 'Member Id' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  fullWidth
                  label="Member Id"
                  error={!!errors.memberid}
                  helperText={errors.memberid?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: 'Date of Birth is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Gender"
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                  variant="outlined"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Controller
              name="fatherOrHusbandName"
              control={control}
              rules={{ required: "Father or Husband's Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Father or Husband's Name"
                  error={!!errors.fatherOrHusbandName}
                  helperText={errors.fatherOrHusbandName?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <Controller
              name="address.state"
              control={control}
              rules={{ required: 'State is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State"
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <Controller
              name="address.city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <Controller
              name="address.street"
              control={control}
              rules={{ required: 'Street is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Street"
                  error={!!errors.address?.street}
                  helperText={errors.address?.street?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <Controller
              name="address.pinCode"
              control={control}
              rules={{
                required: 'Pin Code is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Invalid pin code'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Pin Code"
                  error={!!errors.address?.pinCode}
                  helperText={errors.address?.pinCode?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Controller
              name="landline"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Landline"
                  type="number"
                  error={!!errors.landline}
                  helperText={errors.landline?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Mobile */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mobile"
                  type="number"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* UTR Number */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="utrNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="UTR Number"
                  error={!!errors.utrNumber}
                  helperText={errors.utrNumber?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Membership Applied Date */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="mappliedDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Membership Applied Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.mappliedDate}
                  helperText={errors.mappliedDate?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Membership Date */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="membershipDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Membership Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.membershipDate}
                  helperText={errors.membershipDate?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* State Branch */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="stateBranch"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State Branch"
                  error={!!errors.stateBranch}
                  helperText={errors.stateBranch?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* State Branch Count */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="stateBranchCount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State Branch Count"
                  type="number"
                  error={!!errors.stateBranchCount}
                  helperText={errors.stateBranchCount?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Local Branch Code */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="localBranchCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Local Branch Code"
                  error={!!errors.localBranchCode}
                  helperText={errors.localBranchCode?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Local Branch Count */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="localBranchCount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Local Branch Count"
                  type="number"
                  error={!!errors.localBranchCount}
                  helperText={errors.localBranchCount?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* LMORAM */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="lmoram"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>LMORAM</InputLabel>
                  <Select {...field} label="LMORAM">
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Is Fellow */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="isFellow"
              control={control}
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Is Fellow" />}
            />
          </Grid>

          {/* Fellow Year */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="fellowYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Fellow Year"
                  type="number"
                  error={!!errors.fellowYear}
                  helperText={errors.fellowYear?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Specialty */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Specialty"
                  error={!!errors.specialty}
                  helperText={errors.specialty?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Specialty Code */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="specialtyCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Specialty Code"
                  error={!!errors.specialtyCode}
                  helperText={errors.specialtyCode?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* State Name */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="stateName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State Name"
                  error={!!errors.stateName}
                  helperText={errors.stateName?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* State Code */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="stateCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State Code"
                  error={!!errors.stateCode}
                  helperText={errors.stateCode?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Headquarter Approval */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="hqApproval"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Headquarter Approval" />
              )}
            />
          </Grid>

          {/* State Approval */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="stateApproval"
              control={control}
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="State Approval" />}
            />
          </Grid>

          {/* Local Branch Approval */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="localBranchApproval"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Local Branch Approval" />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-start" gap={2}>
          <Button variant="contained" color="primary" type="submit" size="large">
            Add Member
          </Button>
          <Button variant="outlined" size="large" onClick={() => reset()}>
            Clear
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} iconMapping={{ success: <CheckCircleIcon fontSize="inherit" /> }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default AddMember;
