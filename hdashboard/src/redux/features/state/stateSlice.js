import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stateService from './stateService';

const initialState = {
  stateBranch: null,
  stateBranches: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  snackbar: { // To manage Snackbar state
    open: false,
    message: '',
    severity: '' // Can be 'success', 'error', etc.
  }
};

export const addStateBranch = createAsyncThunk('state/addStateBranch', async (userData, thunkAPI) => {
  try {
    return await stateService.addStateBranch(userData);
  } catch (error) {
    const message = 
      (error.response && error.response.data && error.response.data.error) ||
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

const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.snackbar = { open: false, message: '', severity: '' }; // Reset snackbar state
    },
    setSnackbar(state, action) {
      state.snackbar = action.payload; // Set snackbar message and visibility
    },
    closeSnackbar(state) {
      state.snackbar.open = false; // Close snackbar
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
        state.snackbar = { open: true, message: 'State Branch Created Successfully', severity: 'success' };
      })
      .addCase(addStateBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.snackbar = { open: true, message: action.payload, severity: 'error' };
      })
      .addCase(getAllStateBranches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStateBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stateBranches = action.payload;
      })
      .addCase(getAllStateBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.snackbar = { open: true, message: action.payload, severity: 'error' };
      });
  }
});

// Export actions and reducers
export const { RESET, setSnackbar, closeSnackbar } = stateSlice.actions;

export const selectStateBranch = (state) => state.states.stateBranch;
export const selectIsLoading = (state) => state.states.isLoading;
export const selectSnackbar = (state) => state.states.snackbar; // Access snackbar state

export default stateSlice.reducer;
