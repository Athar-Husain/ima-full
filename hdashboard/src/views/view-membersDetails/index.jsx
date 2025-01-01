import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Box, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { getMemberData } from '../../redux/features/auth/memberSlice';

const ViewMemberDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { memberdata, isLoading, isError } = useSelector((state) => state.member);
  const navigate = useNavigate();


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
    stateBranch: '',
    localBranch: '',
    memberId: '',
    fellowYear: '',
    qualifications: [],
    experiences: [],
    dateOfBirth: '',
    fatherOrHusbandName: '',
    utrNumber: '',
  });

  useEffect(() => {
    dispatch(getMemberData(id));
  }, [dispatch, id]);

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
        stateBranch: memberdata.membershipDetails?.stateBranchName || '',
        localBranch: memberdata.membershipDetails?.localBranchName || '',
        memberId: memberdata.membershipDetails?.memberid || '',
        fellowYear: memberdata.membershipDetails?.fellowDetails?.fellowYear || '',
        qualifications: memberdata.qualifications || [],
        experiences: memberdata.experiences || [],
        dateOfBirth: memberdata.dateOfBirth || '',
        fatherOrHusbandName: memberdata.fatherOrHusbandName || '',
        utrNumber: memberdata.utrNumber || '',
      });
    }
  }, [memberdata]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading data</Typography>;

  return (
    <MainCard title="View Member Details">
      <TableContainer component={Paper} sx={{ marginTop: 2, backgroundColor: '#f9f9f9' }}>
        <Table>
          <TableBody>
            {/* Basic Information */}
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '18px', backgroundColor: '#35b181', color: 'white' }}>
                First Name
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.firstName}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Last Name
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.lastName}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#e5e5e5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Gender
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.gender}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Date of Birth
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.dateOfBirth}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Father/Husband Name
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.faE5E5E5therOrHusbandName}</TableCell>
            </TableRow>

            {/* Address */}
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Street Address
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.streetAddress}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                City
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.cityAddress}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                State
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.stateAddress}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Pin Code
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.pinCode}</TableCell>
            </TableRow>

            {/* Contact Details */}
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Landline No
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.landlineNo}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Mobile No
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.mobileNo}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.email}</TableCell>
            </TableRow>

            {/* Membership Details */}
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                State Branch
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.stateBranch}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                Local Branch
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.localBranch}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#E5E5E5' }}>
              <TableCell variant="head" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>
                UTR Number
              </TableCell>
              <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{formData.utrNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Qualifications</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#E5E5E5' }}>
          <Table>
            <TableBody>
              {formData.qualifications.map((qualification, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>{qualification.degree}</TableCell>
                  <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{qualification.university}</TableCell>
                  <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{qualification.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Experience</Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#e8f5e9' }}>
          <Table>
            <TableBody>
              {formData.experiences.map((experience, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '16px', backgroundColor: '#35b181', color: 'white' }}>{experience.designation}</TableCell>
                  <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{experience.institution}</TableCell>
                  <TableCell sx={{ fontSize: '16px', borderLeft: '1px solid #ccc' }}>{experience.period}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ marginTop: 4 }}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#00994c',  // Green
      color: 'white',
      fontSize: '18px',
      padding: '12px 24px',
      marginRight: 2,
      '&:hover': {
        backgroundColor: '#45a049',  // Darker Green on hover
      },
    }}
  >
    Certificate Print
  </Button>

  <Button
    variant="contained"
    sx={{
      backgroundColor: '#2196F3',  // Blue
      color: 'white',
      fontSize: '18px',
      padding: '12px 24px',
      marginRight: 2,
      '&:hover': {
        backgroundColor: '#1976D2',  // Darker Blue on hover
      },
    }}
  >
    Reciept Print
  </Button>

  <Button
      variant="contained"
      sx={{
        backgroundColor: '#ff6666',  // Orange
        color: 'white',
        fontSize: '18px',
        padding: '12px 30px',
        '&:hover': {
          backgroundColor: '#ff3333',  // Darker Orange on hover
        },
      }}
      onClick={() => navigate(-1)}  // This will go back to the previous page
    >
      Back
    </Button>

</Box>

    </MainCard>
  );
};

export default ViewMemberDetails;
