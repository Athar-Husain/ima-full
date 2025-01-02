import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Box, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { getMemberData } from '../../redux/features/auth/memberSlice';

const EditMemberDetails = () => {
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
    pinCode:'',
    landlineNo: '',
    mobileNo: '',
    email: '',
    stateBranch: '',
    localBranch: '',
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
        pinCode:memberdata.address?.pinCode || '',
        landlineNo: memberdata.contact?.landline || '',
        mobileNo: memberdata.contact?.mobile || '',
        email: memberdata.contact?.email || '',
        stateBranch: memberdata.membershipDetails?.stateBranchName || '',
        localBranch: memberdata.membershipDetails?.localBranchName || '',
        memberId: memberdata.membershipDetails?.memberid || '',
        fellowYear: memberdata.membershipDetails?.fellowDetails?.fellowYear || '',
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
    <MainCard title="Edit Member">
      <Box component="form" noValidate sx={{ padding: 2 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Basic Information */}
          <Grid item xs={12} sm={4}>
            <TextField label="First Name" fullWidth required name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Last Name" fullWidth required name="lastName" value={formData.lastName} onChange={handleInputChange} />
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
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel >Gender</InputLabel>
              <Select  label='gender'name="gender" value={formData.gender} onChange={handleInputChange}>
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
              onChange={handleInputChange}
            />
          </Grid>
         
          <Grid item xs={12} sm={4}>
            <TextField
              label="State "
              fullWidth
              required
              name="State Address"
              value={formData.stateAddress}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City Address"
              fullWidth
              required
              name="cityAddress"
              value={formData.cityAddress}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Street Address" fullWidth name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Pin Code" fullWidth name="Pin Code" value={formData.pinCode} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Landline No" fullWidth name="landlineNo" value={formData.landlineNo} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Mobile No" fullWidth required name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Email" type="email" fullWidth required name="email" value={formData.email} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="State Branch" fullWidth name="stateBranch" value={formData.stateBranch} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Local Branch"
              fullWidth
              required
              name="localBranch"
              value={formData.localBranch}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="UTR Number" fullWidth required name="utrNumber" value={formData.utrNumber} onChange={handleInputChange} />
          </Grid>
        </Grid>

        {/* Qualifications Section */}
        <Box sx={{ mt: 4 , marginTop:"50px" }}>
          <Typography variant="h4" gutterBottom>
            Qualifications
          </Typography>
          {formData.qualifications.map((qualification, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Degree/Diploma"
                  fullWidth
                  value={qualification.degree}
                  onChange={(e) => handleQualificationChange(index, 'degree', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="University/Institution"
                  fullWidth
                  value={qualification.university}
                  onChange={(e) => handleQualificationChange(index, 'university', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Year Obtained"
                  fullWidth
                  value={qualification.year}
                  onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
          
        </Box>

        {/* Experience Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Experience
          </Typography>
          {formData.experiences.map((experience, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Designation"
                  fullWidth
                  value={experience.designation}
                  onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Institution"
                  fullWidth
                  value={experience.institution}
                  onChange={(e) => handleExperienceChange(index, 'institution', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Period (From-To)"
                  fullWidth
                  value={experience.period}
                  onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
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

export default EditMemberDetails;
