import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import localService from './localService';

const initialState = {
  localBranch: null,
  localBranches: [],
  isLocalError: false,
  isLocalSuccess: false,
  isLocalLoading: false,
  localMessage: '',
  snackbar: {
    // To manage Snackbar state
    open: false,
    message: '',
    severity: '' // Can be 'success', 'error', etc.
  }
};

export const addLocalBranch = createAsyncThunk('local/addLocalBranch', async (userData, thunkAPI) => {
  try {
    return await localService.addLocalBranch(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllLocalBranches = createAsyncThunk('state/getAllStateBranches', async (_, thunkAPI) => {
  try {
    return await localService.getAllLocalBranches();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    LOCALRESET(state) {
      state.isLocalError = false;
      state.isLocalSuccess = false;
      state.isLocalLoading = false;
      state.localMessage = '';
      state.isLocalError = false;
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
      .addCase(addLocalBranch.pending, (state) => {
        state.isLocalLoading = true;
        state.isLocalError = false;
        state.localMessage = '';
      })
      .addCase(addLocalBranch.fulfilled, (state, action) => {
        state.isLocalLoading = false;
        state.isLocalSuccess = true;
        state.snackbar = { open: true, message: 'State Branch Created Successfully', severity: 'success' };
      })
      .addCase(addLocalBranch.rejected, (state, action) => {
        state.isLocalLoading = false;
        state.isLocalError = true;
        state.localMessage = action.payload;
        state.snackbar = { open: true, message: action.payload, severity: 'error' };
      })
      .addCase(getAllLocalBranches.pending, (state) => {
        state.isLocalLoading = true;
      })
      .addCase(getAllLocalBranches.fulfilled, (state, action) => {
        state.isLocalLoading = false;
        state.isLocalSuccess = true;
        state.localBranches = action.payload;
      })
      .addCase(getAllLocalBranches.rejected, (state, action) => {
        state.isLocalLoading = false;
        state.isLocalError = true;
        state.localMessage = action.payload;
        state.snackbar = { open: true, message: action.payload, severity: 'error' };
      });
  }
});

export const { LOCALRESET, setSnackbar, closeSnackbar } = localSlice.actions;
export default localSlice.reducer;
