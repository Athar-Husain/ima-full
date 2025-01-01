import axios from 'axios';
import { toast } from 'react-toastify';
import { Snackbar } from '@mui/material';
// import { BASE_API_URL } from '../../../Components/Utils';
// const BASE_API_URL = import.meta.env.BACKEND_URL;
const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

export const API_URL = `${BASE_API_URL}/api/states/`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
// const addStateBranch = async (userData) => {
//   const response = await axios.post(API_URL + 'addStateBranch', userData);
//   console.log('Base API URL:', BASE_API_URL);
//   return response.data;
// };

const addStateBranch = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'addStateBranch', userData);
    return response.data;
  } catch (error) {
    // toast.error('Error in Add State Branch in Service', error);
    throw error;
  }
};

// // Login User
const statelogin = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// // Logout User
const statelogout = async () => {
  const response = await axios.get(API_URL + 'statelogout');
  return response.data.message;
};

// // Get Login Status
const stateloginstatus = async () => {
  const response = await axios.get(API_URL + 'stateloginstatus');
  return response.data;
};

// // Get user profile
const getUser = async () => {
  // const response = await axios.get(API_URL + "getUser");
  const response = await axios.get(API_URL + 'getUser');
  return response.data;
};

// Update profile
const updateStateBranch = async (userData) => {
  const response = await axios.patch(API_URL + 'updateStateBranch');
  return response.data;
};

const getAllStateBranches = async () => {
  const response = await axios.get(API_URL + 'getAllStateBranches');
  return response.data;
};

const stateService = {
  addStateBranch,
  getAllStateBranches
};

export default stateService;
