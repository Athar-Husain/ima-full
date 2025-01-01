import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

const LOCAL_API_URL = `${BASE_API_URL}/api/locals/`;

const addLocalBranch = async (userData) => {
  try {
    const response = await axios.post(LOCAL_API_URL + 'addLocalBranch', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getAllLocalBranches = async (userData) => {
  try {
    const response = await axios.get(LOCAL_API_URL + 'getAllLocalBranches', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const localService = {
  addLocalBranch,
  getAllLocalBranches
};

export default localService;
