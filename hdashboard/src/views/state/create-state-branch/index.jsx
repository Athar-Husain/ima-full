// import React from 'react';
import React, { useEffect, useState } from 'react';
import { State } from 'country-state-city';
import { useForm, Controller } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

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
import { useDispatch } from 'react-redux';
import { addStateBranch } from 'redux/features/state/stateSlice';

const CreateStateBranch = () => {
  const dispatch = useDispatch();

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    // name: '',
    email: '',
    phoneNumber: '',
    password: '',
    state: ''
    // photo: null
  };

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry('IN');
        const allStates = result?.map(({ isoCode, name }) => ({
          value: isoCode,
          label: name
        }));
        setStates(allStates);
      } catch (error) {
        setStates([]);
      }
    };

    getStates();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  let userid;

  const onSubmit = (data) => {
    // console.log('Prcoss ', process.env.BACKEND_URL);

    try {
      const selectedStateObj = states.find((state) => state.value === data.state);
      userid = data.state + '@' + 'ima-ams.com';

      const userData = {
        ...data, // Spread existing data
        stateName: selectedStateObj?.label, // Add state name if found
        stateCode: data.state, // Keep state code
        stateuserid: userid
      };
      setLoading(true);

      dispatch(addStateBranch(userData));
      // console.log('Submitted Data:', userData);
      reset(defaultValues);

      setLoading(false);
    } catch (error) {
      console.log('error in create create-statebranch,  StateBranch', error);
      setLoading(false);
      toast.error(error.meassage);
    }
  };

  return (
<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <Card sx={{ width: '100%', maxWidth: 'auto' }}>
        <CardContent>
          <Typography variant="h2" component="h3" align="center" marginBottom="20px" gutterBottom>
            Create State Branch
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* State Dropdown */}
              <Grid item xs={12}>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.state}>
                      <InputLabel>Select State</InputLabel>
                      <Select {...field} label="Select State">
                        {states.map((state) => (
                          <MenuItem key={state.value} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.state?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
<br />
              {/* Password Field */}
              <Grid item xs={12}>
  <Controller
    name="password"
    control={control}
    rules={{
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/,
        message:
          'Password must contain 1 uppercase letter, 1 number, and 1 special character',
      },
    }}
    render={({ field }) => {
      const [showPassword, setShowPassword] = useState(false);

      const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };

      return (
        <TextField
          {...field}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    }}
  />
</Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email format'
                    }
                  }}
                  render={({ field }) => (
                    <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
                  )}
                />
              </Grid>

              {/* Phone Number Field */}
              <Grid item xs={12}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      InputProps={{ startAdornment: <span>+91</span> }}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Grid>

              {/* File Upload Field
              <Grid item xs={12}>
                <Controller
                  name="photo"
                  control={control}
                  render={({ field }) => <TextField {...field} type="file" fullWidth InputLabelProps={{ shrink: true }} />}
                />
              </Grid> */}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    backgroundColor: '#35b181',fontSize:'18px',  
                    '&:hover': { backgroundColor: '#27a059' }
                  }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateStateBranch;
