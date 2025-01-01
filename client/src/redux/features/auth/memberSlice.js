import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import memberService from "./memberService";

const initialState = {
  memberdata: null,
  selectedMember: null, // Store the selected member for OTP operations
  allMembers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
  totalMembers: 0,
  // checkMembers
};

// Register member (already implemented)
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

// Get all members (already implemented)
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
      state.selectedMember = null; // Reset selected member when resetting state
    },
    setSelectedMember(state, action) {
      state.selectedMember = action.payload; // Store the selected member details
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
        state.member = action.payload; // Set the registered member
        toast.success("Member registered successfully");
      })
      .addCase(registerMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.member = null;
        // toast.error(action.payload);
        toast.error(action.payload);
        // toast.error(stamessage);
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
        toast.success("Successfully fetched members");
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get member data

      .addCase(getMemberData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getMemberData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.memberdata = action.payload;
        console.log("member data slice ", action.payload);
        toast.success("Member Details found");
      })
      .addCase(getMemberData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.memberdata = null;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET, setSelectedMember } = memberSlice.actions;
export const selectMember = (state) => state.member.member;
export const selectSelectedMember = (state) => state.member.selectedMember; // Selector for selected member
export default memberSlice.reducer;
