import axios from "axios";
// import { BASE_API_URL } from "../../../Components/Utils";

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

// export const API_URL = `${BASE_API_URL}/api/states/`;
export const OTP_URL = `${BASE_API_URL}/api/otp/`;

export const API_URL = `${BASE_API_URL}/api/members/`;

const registerMember = async (userData) => {
  try {
    const response = await axios.post(API_URL + "registerMember", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginMember = async (userData) => {
  try {
    const response = await axios.response(API_URL + "loginMember", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllMembers = async (userData) => {
  try {
    const response = await axios.get(API_URL + "getAllMembers", userData);
    return response.data;
  } catch (error) {
    console.log("getALLmember error", error.message);
    throw error;
  }
};

const getMember = async () => {
  try {
    const response = await axios.get(API_URL + "getMember");
    return response.data;
  } catch (error) {
    console.log("get member error", error.message);
    throw error;
  }
};
const getMemberData = async (id) => {
  try {
    const response = await axios.get(API_URL + `getMemberData/${id}`);
    return response.data;
  } catch (error) {
    console.log("get member error", error.message);
    throw error;
  }
};

const memberService = {
  registerMember,
  getAllMembers,
  getMember,
  getMemberData,
  // loginMember,
};

export default memberService;
