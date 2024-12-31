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

  useEffect(() => {
    // Dispatch to get all state branches from the API
    dispatch(getAllStateBranches());
  }, [dispatch]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities based on the selected state's stateCode
      const fetchCities = async () => {
        try {
          // Fetch cities for the selected state using the stateCode
          const citiesData = City.getCitiesOfState('IN', selectedState);

          console.log('Cities fetched:', citiesData); // Log cities to check the data structure

          setCities(citiesData); // Update cities state
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedState]);

  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    state: '',
    city: '', // Add city to the default values
    photo: null
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value); // Set selected state
  };

  // Filtering out cities that have already been created (using createdCities array)
  const availableCities = cities.filter((city) => !createdCities.includes(city.cityCode));
  console.log('available cities', cities);
  console.log('citiesDat', availableCities);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <Card sx={{ width: '100%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2" component="h3" align="center" marginBottom="20px" gutterBotto>
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
                          handleStateChange(e); // Handle state change and fetch cities
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
                        {availableCities.length > 0 ? (
                          availableCities.map((city) => (
                            <MenuItem key={city.index} value={city.name}>
                              {city.name} ({city.cityCode})
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

              {/* Other form fields like password, email, phone number, etc. */}

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
