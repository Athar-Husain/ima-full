import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Box, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { getMemberData } from '../../redux/features/auth/memberSlice';

const AppliedMemberDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log('params id ', id);

  const { memberdata, isLoading, isError } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getMemberData(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    streetAddress: '',
    cityAddress: '',
    stateAddress: '',
    pinCode: '',
    landlineNo: '',
    mobileNo: '',
    email: '',
    mappliedDate: '',
    stateBranch: '',
    localBranch: '',
    speciality:'',
    specialityCode:'',
    memberId: '',
    fellowYear: '',
    qualifications: [],
    experiences: []
  });

  useEffect(() => {
    if (memberdata) {
      setFormData({
        firstName: memberdata.firstName || '',
        lastName: memberdata.lastName || '',
        gender: memberdata.gender || '',
        streetAddress: memberdata.address?.street || '',
        cityAddress: memberdata.address?.city || '',
        stateAddress: memberdata.address?.state || '',
        pinCode: memberdata.address?.pinCode || '',
        landlineNo: memberdata.contact?.landline || '',
        mobileNo: memberdata.contact?.mobile || '',
        email: memberdata.contact?.email || '',
        mappliedDate: memberdata.membershipDetails?.mappliedDate || '',
        stateBranch: memberdata.membershipDetails?.stateBranchName || '',
        localBranch: memberdata.membershipDetails?.localBranchName || '',
        memberId: memberdata.membershipDetails?.memberid || '',
        fellowYear: memberdata.membershipDetails?.fellowDetails?.fellowYear || '',
        speciality: memberdata.speciality ||'',
        specialityCode: memberdata.specialityCode ||'',
        qualifications: memberdata.qualifications || [],
        experiences: memberdata.experiences || []
      });
    }
  }, [memberdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index][field] = value;
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index][field] = value;
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [...formData.qualifications, { degree: '', university: '', year: '' }]
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { designation: '', institution: '', period: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form Data:', formData);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading data</Typography>;

  return (
    <MainCard title="Applied Form">
      <Box component="form" noValidate sx={{ padding: 2 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Basic Information */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              required
              name="firstName"
              value={formData.firstName}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              required
              name="lastName"
              value={formData.lastName}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              name="dateOfBirth"
              value={formData.dateOfBirth}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                readonly // Disable the select input
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name of Father/Husband"
              fullWidth
              name="fatherOrHusbandName"
              value={formData.fatherOrHusbandName}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
        
          <Grid item xs={12} sm={4}>
            <TextField
              label="Street Address"
              fullWidth
              name="streetAddress"
              value={formData.streetAddress}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              fullWidth
              required
              name="State Address"
              value={formData.stateAddress}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City Address"
              fullWidth
              required
              name="cityAddress"
              value={formData.cityAddress}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
        
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pin Code"
              fullWidth
              name="Pin Code"
              value={formData.pinCode}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Landline No"
              fullWidth
              name="landlineNo"
              value={formData.landlineNo}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mobile No"
              fullWidth
              required
              name="mobileNo"
              value={formData.mobileNo}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4} >
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              name="email"
              value={formData.email}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State Branch"
              fullWidth
              name="stateBranch"
              value={formData.stateBranch}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Local Branch"
              fullWidth
              required
              name="localBranch"
              value={formData.localBranch}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="UTR Number"
              fullWidth
              name="utrNumber"
              value={formData.utrNumber}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Speciality"
              fullWidth
              name="Speciality"
              value={formData.speciality}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Speciality Code"
              fullWidth
              name="Speciality Code"
              value={formData.specialityCode}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>

                    <Grid item xs={12} sm={4}>
            <TextField
              name="mappliedDate"
              label="Membership Applied Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.mappliedDate}
              InputProps={{ readonly: true }} // Make field read-only
            />
          </Grid>
        </Grid>

        {/* Qualifications Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Qualifications
          </Typography>
          {formData.qualifications.map((qualification, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Degree/Diploma"
                  fullWidth
                  value={qualification.degree}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="University/Institution"
                  fullWidth
                  value={qualification.university}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Year Obtained"
                  fullWidth
                  value={qualification.year}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        {/* Experience Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Experience
          </Typography>
          {formData.experiences.map((experience, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Designation"
                  fullWidth
                  value={experience.designation}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Institution"
                  fullWidth
                  value={experience.institution}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Period (From-To)"
                  fullWidth
                  value={experience.period}
                  InputProps={{ readonly: true }} // Make field read-only
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        <Box sx={{ mt: 3, px: 0 }}>
  <Typography variant="h4" mb={2} gutterBottom>
    Personal Details
  </Typography>
  <Grid container spacing={4} justifyContent="center" alignItems="center">
    {/* Member Photo Section */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>
        Member Photo
      </Typography>
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '150px',
          height: '150px',
          margin: '0 auto',
        }}
      >
        <img
          src={formData.memberPhoto || 'placeholder.jpg'}
          alt="Member Photo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: '10px' }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = formData.memberPhoto || 'placeholder.jpg';
          link.download = 'member_photo.jpg';
          link.click();
        }}
      >
        Download Photo
      </Button>
    </Grid>

    {/* Member Signature Section */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>
        Member Signature
      </Typography>
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '150px',
          height: '150px',
          margin: '0 auto',
        }}
      >
        <img
          src={formData.memberSignature || 'placeholder-signature.jpg'}
          alt="Member Signature"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: '10px' }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = formData.memberSignature || 'placeholder-signature.jpg';
          link.download = 'member_signature.jpg';
          link.click();
        }}
      >
        Download Signature
      </Button>
    </Grid>

    {/* Member Documents Section */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>
        Member Documents
      </Typography>
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '150px',
          height: '150px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <img
          src={formData.memberDocument ? 'document-icon.png' : 'placeholder-doc.jpg'}
          alt="Document Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: '10px' }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = formData.memberDocument || 'placeholder-doc.jpg';
          link.download = 'member_document.pdf';
          link.click();
        }}
      >
        Download Document
      </Button>
    </Grid>
  </Grid>
</Box>


      </Box>
    </MainCard>
  );
};

export default AppliedMemberDetails;
