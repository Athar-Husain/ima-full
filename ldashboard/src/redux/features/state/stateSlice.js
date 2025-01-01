import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import { RESET } from '../auth/authSlice';
import stateService from './stateService';

const initialState = {
  stateBranch: null,
  stateBranches: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// export const addStateBranch = createAsyncThunk({
//   ""
// });

export const addStateBranch = createAsyncThunk('state/addStateBranch', async (userData, thunkAPI) => {
  try {
    return await stateService.addStateBranch(userData);
  } catch (error) {
    // Extract the error message properly
    const message =
      (error.response && error.response.data && error.response.data.error) || // Adjust based on your backend response
      error.message ||
      'An unexpected error occurred.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllStateBranches = createAsyncThunk('state/getAllStateBranches', async (_, thunkAPI) => {
  try {
    return await stateService.getAllStateBranches();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const register = createAsyncThunk('state/loginStateBranch', async (userData, thunkAPI) => {
//   try {
//     return await authService.register(userData);
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStateBranch.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(addStateBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // state.user = action.payload;
        toast.success('State Branch Created Successfully');
        // console.log(action.payload);
      })
      .addCase(addStateBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
        toast.error(action.payload);
      })

      //get all state Branches
      .addCase(getAllStateBranches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStateBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.stateBranches = action.payload;
        // state.stateBranches = Array.isArray(action.payload) ? action.payload : [];
        state.stateBranches = action.payload;
      })
      .addCase(getAllStateBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

// stateSlice.js (add this section)
export const selectStateBranch = (state) => state.states.stateBranch;
export const selectIsLoading = (state) => state.states.isLoading;
export const selectMessage = (state) => state.states.message;

export default stateSlice.reducer;
