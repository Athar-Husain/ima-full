import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import memberService from "./memberService";

const initialState = {
  member: null,
  selectedMember: null, // Add this field to store the selected member's details
  allMembers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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

export const loginMember = createAsyncThunk(
  "member/loginMember",
  async (userData, thunkAPI) => {
    try {
      return await memberService.loginMember(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        "An unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

const memberSlice = createSlice({
  name: "member", // Updated name to match the store key
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.message = "";
      state.selectedMember = null; // Reset selected member
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerMember.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.member = action.payload; // Set the registered member
        toast.success("Member registered successfully");
      })
      .addCase(registerMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.member = null;
        toast.error(action.payload);
      })
      .addCase(getAllMembers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMembers = action.payload;
        toast.success("Successfully fetched members");
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET } = memberSlice.actions;
export const selectMember = (state) => state.member.member;
export default memberSlice.reducer;
