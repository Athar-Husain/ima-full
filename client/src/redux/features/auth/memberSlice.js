import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  memberdata: null,
  selectedMember: null,
  allMembers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
  totalMembers: 0,
  // checkMembers
  snackbar: {
    open: false,
    message: "",
    severity: "success", // success, error, info, warning
  },
};

// Register member
export const registerMember = createAsyncThunk(
  "member/registerMember",
  async (userData, thunkAPI) => {
    try {
      return await memberService.registerMember(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        "An unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all members
export const getAllMembers = createAsyncThunk(
  "member/getAllMembers",
  async (_, thunkAPI) => {
    try {
      return await memberService.getAllMembers();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        "An unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMemberData = createAsyncThunk(
  "member/getMemberData",
  async (id, thunkAPI) => {
    try {
      return await memberService.getMemberData(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice for managing member data
const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.selectedMember = null;
      state.snackbar = { open: false, message: "", severity: "success" };
    },
    setSelectedMember(state, action) {
      state.selectedMember = action.payload;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Member
      .addCase(registerMember.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
        state.snackbar = {
          open: true,
          message: "Member Application Submitted Successfully",
          severity: "success",
        };
      })
      .addCase(registerMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.member = null;
        state.snackbar = {
          open: true,
          message: action.payload,
          severity: "error",
        };
      })

      // Get All Members
      .addCase(getAllMembers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMembers = action.payload;
        state.totalMembers = action.payload.length;
        // toast.success("Successfully fetched members");
        state.snackbar = {
          open: true,
          message: "Successfully fetched members",
          severity: "success",
        };
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.snackbar = {
          open: true,
          message: action.payload,
          severity: "error",
        };
      })

      // Get Member Data
      .addCase(getMemberData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getMemberData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.snackbar = {
          open: true,
          message: "Member Details found",
          severity: "success",
        };
      })
      .addCase(getMemberData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.memberdata = null;
        state.message = action.payload;
        state.snackbar = {
          open: true,
          message: action.payload,
          severity: "error",
        };
      });
  },
});

export const { RESET, setSelectedMember, closeSnackbar } = memberSlice.actions;
export const selectMember = (state) => state.member.member;
export const selectSelectedMember = (state) => state.member.selectedMember;
export const selectSnackbar = (state) => state.member.snackbar;
export default memberSlice.reducer;
