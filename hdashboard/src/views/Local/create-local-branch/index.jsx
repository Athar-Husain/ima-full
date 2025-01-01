import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { City } from 'country-state-city';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormHelperText,
  InputLabel,
  FormControl,
  Select,
  Card,
  CardContent
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStateBranches } from '../../../redux/features/state/stateSlice';
import { addLocalBranch } from 'redux/features/local/localSlice';

const CreateLocalBranch = () => {
  const dispatch = useDispatch();
  const { stateBranches, loading, error } = useSelector((state) => state.states);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [branchCount, setBranchCount] = useState(0); // To store the count of local branches in selected state

  // Fetch all state branches once
  useEffect(() => {
    dispatch(getAllStateBranches());
  }, [dispatch]);

  // Fetch branches count for the selected state
  useEffect(() => {
    if (selectedState) {
      const stateData = stateBranches.find(
        (branch) => branch._id === selectedState // Use _id to match the state branch ObjectId
      );
      if (stateData) {
        setBranchCount(stateData.localbranches.length); // Set branch count for the selected state
      }
    }
  }, [selectedState, stateBranches]);

  // Form default values
  const defaultValues = {
    localbranchName: '',
    // localbranchCode: '',
    email: '',
    password: '',
    phone: '',
    stateBranch: '' // This will be the _id of the selected state branch
    // city: '' // Add city field
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue // Set value for form fields
  } = useForm({ defaultValues });

  const onSubmit = async (data, e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      let localbranchName = data.localbranchName
        .trim() // Trim any leading or trailing spaces
        .toUpperCase() // Convert to uppercase
        .replace(/\s+/g, '-'); // Replace spaces with hyphen

      // console.log('Transformed localbranchName:', localbranchName); // For debugging

      const stateData = stateBranches.find((branch) => branch._id === selectedState);

      if (!stateData) {
        alert('Selected state data not found!');
        return; // Stop submission if state data is not found
      }

      // Get the state code from the found stateData
      const stateCode = stateData.stateCode; // Correctly accessing the stateCode from stateData
      if (!stateCode) {
        alert('State code is missing!');
        return; // Handle case if stateCode is missing
      }

      // Check if localbranchName already exists in the selected state
      const existingBranch = stateData?.localbranches.find((branch) => branch.localbranchName.toUpperCase() === localbranchName);

      if (existingBranch) {
        alert('Local branch with the same name already exists.');
        return; // Stop submission if branch name already exists
      }

      // Generate localbranchCode based on branch count (If branchCount is not set, fallback to 0)
      const localbranchCode = `${(stateData?.localbranches.length || 0) + 1}`;
      const localuserId = `${stateCode}#${localbranchName}@ima-ams.com`; // Corrected localuserId format

      // Prepare the data to be sent to the backend
      const userData = {
        ...data,
        localbranchName,
        localbranchCode,
        localuserId // Corrected localuserId
      };

      // Dispatch the action to add the local branch
      await dispatch(addLocalBranch(userData));

      // Reset the form after successful submission
      reset(); // This resets the form fields to the default values

      console.log('user data in create local branch', userData);

      // Optionally, you can show a success message or perform additional actions
      alert('Local branch added successfully!');
    } catch (error) {
      console.log('Error adding local branch:', error.message);
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value); // Set the selected state

    // Fetch cities based on selected state (using `country-state-city` library)
    const selectedStateCode = event.target.value;
    const fetchedCities = City.getCitiesOfState('IN', selectedStateCode); // Assuming 'IN' is the country code
    setCities(fetchedCities);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <Card sx={{ width: '100%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2" component="h3" align="center" marginBottom="20px">
            Create Local Branch
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* State Selector */}
              <Grid item xs={12}>
                <Controller
                  name="stateBranch"
                  control={control}
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.stateBranch}>
                      <InputLabel>Select State</InputLabel>
                      <Select
                        {...field}
                        label="Select State"
                        onChange={(e) => {
                          field.onChange(e);
                          handleStateChange(e); // Fetch cities when state changes
                        }}
                      >
                        {stateBranches.map((state) => (
                          <MenuItem key={state._id} value={state._id}>
                            {state.stateName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.stateBranch?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Local Branch Name */}
              <Grid item xs={12}>
                <Controller
                  name="localbranchName"
                  control={control}
                  rules={{ required: 'Branch name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Local Branch Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.localbranchName}
                      helperText={errors.localbranchName?.message}
                      onBlur={(e) => {
                        setValue('localbranchName', e.target.value.toUpperCase()); // Auto-convert name to uppercase
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Please enter a valid email address'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone number is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ backgroundColor: '#35b181', '&:hover': { backgroundColor: '#27a059' } }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateLocalBranch;
