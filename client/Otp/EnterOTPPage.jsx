import React, { useEffect, useState } from "react";
import axios from "axios";
// import { OTP_URL } from "";

import "bootstrap/dist/css/bootstrap.min.css";
import { OTP_URL } from "../src/redux/features/auth/memberService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberData } from "../src/redux/features/auth/memberSlice";

const EnterOTPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const selectedMember = useSelector((state) => state.member.selectedMember);
  // const location = useLocation(); // Use the hook to access route state
  const phoneNumber = location.state?.phoneNumber; // Get phoneNumber from state
  const id = location.state?.id; // Get phoneNumber from state
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   if (!selectedMember) {
  //     window.location.href = "/"; // Redirect to home or appropriate page if no member is selected
  //   }
  // }, [selectedMember]);

  // console.log("selectedMember", selectedMember);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setErrorMessage("Phone number is missing. Please try again.");
      return;
    }

    // const response = await axios.post(`${OTP_URL}send-otp`, {
    //   name,
    //   phoneNumber,
    // });

    try {
      const response = await axios.post(`${OTP_URL}verify-otp`, {
        phoneNumber,
        otp,
      });

      if (response.data.success) {
        // window.location.href = "/view-member ";
        // navigate(`/view-member/${id}`);
        navigate(`/view-member/${id}`);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4 mb-5">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Enter OTP</h3>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-success w-100">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterOTPPage;
