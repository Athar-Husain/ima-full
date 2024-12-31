import { configureStore } from "@reduxjs/toolkit";
// import customizationReducer from './features/customization/customizationSlice'; // Import the slice
// import customizationReducer from './features/customization/customizationSlice'; // Import the slice
// import stateReducer from './features/state/stateSlice';
import memberReducer from "./features/auth/memberSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
  },
});
