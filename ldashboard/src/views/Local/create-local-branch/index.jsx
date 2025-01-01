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

const CreateLocalBranch = () => {
  const dispatch = useDispatch();
  const { stateBranches, loading, error } = useSelector((state) => state.states);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [createdCities, setCreatedCities] = useState([]); // For already created cities

  // Fetch all state branches once
  useEffect(() => {
    dispatch(getAllStateBranches());
  }, [dispatch]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          // Fetch cities for the selected state
          const citiesData = City.getCitiesOfState('IN', selectedState);

          // Find the existing cities for the selected state
          const stateBranch = stateBranches.find((branch) => branch.stateCode === selectedState);
          if (stateBranch) {
            // Extract city names from the state branches data
            const existingCities = stateBranch.branches.map((branch) => branch.branchName);
            setCreatedCities(existingCities); // Store the existing cities
          }

          // Filter out the cities that are already created
          const availableCities = citiesData.filter((city) => !createdCities.includes(city.cityName));
          setCities(availableCities); // Set the remaining cities
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedState, stateBranches]); // Run this when selectedState changes or stateBranches is updated

  // Form default values
  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    state: '',
    city: '', // Add city field
    photo: null
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value); // Set the selected state
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
                  name="state"
                  control={control}
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.state}>
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
                          <MenuItem key={state.stateCode} value={state.stateCode}>
                            {state.stateName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.state?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* City Selector */}
              <Grid item xs={12}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.city}>
                      <InputLabel>Select City</InputLabel>
                      <Select {...field} label="Select City">
                        {cities.length > 0 ? (
                          cities.map((city) => (
                            <MenuItem key={city.cityCode} value={city.cityCode}>
                              {city.cityName} ({city.cityCode})
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="">
                            <em>No cities available</em>
                          </MenuItem>
                        )}
                      </Select>
                      <FormHelperText>{errors.city?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Other form fields */}
              <Grid item xs={12}>
                <Button
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
