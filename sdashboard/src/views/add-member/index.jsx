import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Box, Snackbar, Alert, MenuItem, Checkbox, FormControlLabel,Typography } from '@mui/material';
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
  const [qualifications, setQualifications] = useState([
    { degree: "", university: "", year: "" },
  ]);
  const [experiences, setExperiences] = useState([
    { designation: "", institution: "", period: "" },
  ]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { degree: "", university: "", year: "" },
    ]);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { designation: "", institution: "", period: "" },
    ]);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errorElement = document.getElementById("fileError");
    errorElement.textContent = ""; // Clear previous errors

    // Validate file count
    if (files.length > 5) {
      errorElement.textContent = "You can only upload a maximum of 5 files.";
      e.target.value = ""; // Clear the input
      return;
    }

    // Validate file size
    const isValidSize = files.every((file) => file.size <= 5 * 1024 * 1024); // 5 MB
    if (!isValidSize) {
      errorElement.textContent = "File must be less than 5 MB.";
      e.target.value = ""; // Clear the input
      return;
    }

    console.log("Files selected:", files);
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

          

          

          {/* Local Branch  */}
          <Grid item xs={6} sm={4}>
            <Controller
              name="localBranch"
              control={control}
              render={({ field }) => (
                <TextField
                {...field}
                fullWidth
                label="Local Branch"
                error={!!errors.localbranch}
                helperText={errors.localbranch?.message}
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

          <Box>
      {/* Qualification Section */}
      <Typography variant="h5" className="mt-4">Qualifications</Typography>
      {qualifications.map((qualification, index) => (
        <Grid container spacing={2} key={index} className="mb-3">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Degree/Diploma"
              name={`degree[${index}]`}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="University/Institution"
              name={`university[${index}]`}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Year Obtained"
              name={`year[${index}]`}
              variant="outlined"
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" color="secondary" className="mb-3" onClick={addQualification}>
        Add Qualification
      </Button>

      {/* Experience Section */}
      <Typography variant="h5" className="mt-4">Experience</Typography>
      {experiences.map((experience, index) => (
        <Grid container spacing={2} key={index} className="mb-3">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Designation"
              name={`designation[${index}]`}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Institution"
              name={`institution[${index}]`}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Period (From-To)"
              name={`period[${index}]`}
              variant="outlined"
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" color="secondary" className="mb-3" onClick={addExperience}>
        Add Experience
      </Button>

      {/* File Upload Section */}
      <Typography variant="h5" className="mt-4">Uploads</Typography>
      <Box className="mb-3">
        <Typography htmlFor="photo" component="label">
          Upload Photo
        </Typography>
        <TextField
          fullWidth
          type="file"
          id="photo"
          name="photo"
          inputProps={{ accept: 'image/*' }}
        />
      </Box>
      <Box className="mb-3">
        <Typography htmlFor="documents" component="label">
          Upload Documents
        </Typography>
        <TextField
          fullWidth
          type="file"
          id="documents"
          name="documents[]"
          inputProps={{ multiple: true }}
          onChange={handleFileChange}
        />
        <Typography color="error" id="fileError" variant="body2"></Typography>
      </Box>

      {/* Signature Section */}
      <Box className="mb-3">
        <Typography htmlFor="signature" component="label">
          Signature
        </Typography>
        <TextField
          fullWidth
          type="file"
          id="signature"
          name="signature"
          inputProps={{ accept: 'image/*' }}
        />
      </Box>
    </Box>
          

          

        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-start" gap={2}>
          <Button variant="contained" type="submit" size="large" sx={{paddingLeft:8, paddingRight:8, paddingTop:1.5, paddingBottom:1.5,color:"white",backgroundColor: "#35b181",fontSize:"16px", '&:hover': { backgroundColor: '#27a059', }}}>
            Add Member
          </Button>
          <Button variant="outlined"  size="large"sx={{paddingLeft:8, paddingRight:8, paddingTop:1.5, paddingBottom:1.5, backgroundColor: "#3579a1",color:"white",fontSize:"16px", '&:hover': { backgroundColor: '#2d688d' }}} onClick={() => reset()}>
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
