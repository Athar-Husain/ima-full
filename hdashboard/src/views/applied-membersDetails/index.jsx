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
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              name="firstName"
              value={formData.firstName}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              required
              name="lastName"
              value={formData.lastName}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              name="dateOfBirth"
              value={formData.dateOfBirth}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled // Disable the select input
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name of Father/Husband"
              fullWidth
              name="fatherOrHusbandName"
              value={formData.fatherOrHusbandName}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              fullWidth
              required
              name="State Address"
              value={formData.stateAddress}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City Address"
              fullWidth
              required
              name="cityAddress"
              value={formData.cityAddress}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Street Address"
              fullWidth
              name="streetAddress"
              value={formData.streetAddress}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pin Code"
              fullWidth
              name="Pin Code"
              value={formData.pinCode}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Landline No"
              fullWidth
              name="landlineNo"
              value={formData.landlineNo}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile No"
              fullWidth
              required
              name="mobileNo"
              value={formData.mobileNo}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              name="email"
              value={formData.email}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State Branch"
              fullWidth
              name="stateBranch"
              value={formData.stateBranch}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Local Branch"
              fullWidth
              required
              name="localBranch"
              value={formData.localBranch}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="UTR Number"
              fullWidth
              name="utrNumber"
              value={formData.utrNumber}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mappliedDate"
              label="Membership Applied Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.mappliedDate}
              InputProps={{ readOnly: true }} // Make field read-only
            />
          </Grid>
        </Grid>

        {/* Qualifications Section */}
        <Box sx={{ mt: 5 }}>
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
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="University/Institution"
                  fullWidth
                  value={qualification.university}
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Year Obtained"
                  fullWidth
                  value={qualification.year}
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        {/* Experience Section */}
        <Box sx={{ mt: 5 }}>
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
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Institution"
                  fullWidth
                  value={experience.institution}
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Period (From-To)"
                  fullWidth
                  value={experience.period}
                  InputProps={{ readOnly: true }} // Make field read-only
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        <Box sx={{ mt: 5 }}>
  <Typography variant="h4" gutterBottom>
    Personal Details
  </Typography>
  <Grid container spacing={4} mt={-3}>
    {/* Member Photo Section */}
    <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>
        Member Photo
      </Typography>
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'inline-block',
          width: '150px', // Ensuring the box has a consistent width
          height: '150px', // Ensuring the box has a consistent height
        }}
      >
        <img
          src={formData.memberPhoto || 'placeholder.jpg'} // Replace with actual photo URL
          alt="Member Photo"
          style={{
            width: '100%', // Ensure the image fills the box
            height: '100%', // Ensure the image fills the box
            objectFit: 'cover', // Crop the image to fill the space
            borderRadius: '8px',
          }}
        />
        <Box sx={{ marginTop: '10px' }}>
          <Button
            variant="contained"
            onClick={() => {
              const link = document.createElement('a');
              link.href = formData.memberPhoto || 'placeholder.jpg';
              link.download = 'member_photo.jpg';
              link.click();
            }}
          >
            Download Photo
          </Button>
        </Box>
      </Box>
    </Grid>

    {/* Member Signature Section */}
    <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
      <Typography variant="body1" gutterBottom>
        Member Signature
      </Typography>
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'inline-block',
          width: '150px', // Ensuring the box has a consistent width
          height: '150px', // Ensuring the box has a consistent height
        }}
      >
        <img
          src={formData.memberSignature || 'placeholder-signature.jpg'} // Replace with actual signature image URL
          alt="Member Signature"
          style={{
            width: '100%', // Ensure the image fills the box
            height: '100%', // Ensure the image fills the box
            objectFit: 'contain', // Adjust image to fit inside the box without cropping
          }}
        />
        <Box sx={{ marginTop: '10px' }}>
          <Button
            variant="contained"
            onClick={() => {
              const link = document.createElement('a');
              link.href = formData.memberSignature || 'placeholder-signature.jpg';
              link.download = 'member_signature.jpg';
              link.click();
            }}
          >
            Download Signature
          </Button>
        </Box>
      </Box>
    </Grid>

    {/* Documents Section */}
    
    <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
  <Typography variant="body1" gutterBottom>
    Member Documents
  </Typography>
  <Box
    sx={{
      border: '2px solid #ccc',
      padding: '10px',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'inline-block',
      width: '150px', // Ensuring the box has a consistent width
      height: '150px', // Ensuring the box has a consistent height
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* Document Preview (e.g., Placeholder or Icon for non-image files like PDF) */}
    <img
      src={formData.memberDocument ? 'document-icon.png' : 'placeholder-doc.jpg'} // Display a document icon or placeholder image
      alt="Document Preview"
      style={{
        width: '100%', // Ensure the icon/image fills the box
        height: '100%', // Ensure the icon/image fills the box
        objectFit: 'contain', // Adjust to fit inside without cropping
      }}
    />
  </Box>
  <Box sx={{ marginTop: '10px' }}>
    <Button
      variant="contained"
      onClick={() => {
        const link = document.createElement('a');
        link.href = formData.memberDocument || 'placeholder-doc.jpg'; // Use actual document URL
        link.download = 'member_document.pdf'; // Change extension based on actual document type
        link.click();
      }}
    >
      Download Document
    </Button>
  </Box>
</Grid>

  </Grid>
</Box>

      </Box>
    </MainCard>
  );
};

export default AppliedMemberDetails;
