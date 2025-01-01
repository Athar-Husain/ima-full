import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './features/customization/customizationSlice'; // Import the slice
// import customizationReducer from './features/customization/customizationSlice'; // Import the slice
import stateReducer from './features/state/stateSlice';
import memberReducer from './features/auth/memberSlice';

export const store = configureStore({
  reducer: {
    states: stateReducer,
    member: memberReducer,
    customization: customizationReducer // Add the slice to the reducer object
  }
});
