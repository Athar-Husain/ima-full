import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './features/customization/customizationSlice'; // Import the slice
// import customizationReducer from './features/customization/customizationSlice'; // Import the slice
import stateReducer from './features/state/stateSlice';
import memberReducer from './features/auth/memberSlice';
import localReducer from './features/local/localSlice';

export const store = configureStore({
  reducer: {
    states: stateReducer,
    member: memberReducer,
    local: localReducer,
    customization: customizationReducer // Add the slice to the reducer object
  }
});
