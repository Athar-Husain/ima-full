import React, { useState } from "react";
import axios from "axios";

const MemberTable = () => {
  const [loading, setLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState({}); // Track OTP status for each member

  const members = [
    { id: 1, name: "John Doe", phone: "7996734895" },
    { id: 2, name: "Jane Smith", phone: "9164873328" },
    // Add more members here
  ];

  const handleSendOtp = async (name, phoneNumber, id) => {
    if (window.confirm(`Do you want to send OTP to ${name}?`)) {
      setLoading(true);
      setOtpStatus((prevState) => ({
        ...prevState,
        [id]: "loading", // Set status as loading for this member
      }));
      try {
        const response = await axios.post("http://localhost:9000/send-otp", {
          name,
          phoneNumber,
        });

        if (response.data.success) {
          setOtpStatus((prevState) => ({
            ...prevState,
            [id]: "sent", // Update status to sent for this member
          }));
          alert("OTP sent successfully!");
          // Redirect to OTP verification page
          window.location.href = "/enter-otp";
        } else {
          setOtpStatus((prevState) => ({
            ...prevState,
            [id]: "failed", // Update status to failed for this member
          }));
          alert("Failed to send OTP");
        }
      } catch (error) {
        console.error("Error:", error);
        setOtpStatus((prevState) => ({
          ...prevState,
          [id]: "failed", // Update status to failed for this member
        }));
        alert("Error sending OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Members List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>
                <button
                  disabled={otpStatus[member.id] === "loading" || loading}
                  onClick={() => handleSendOtp(member.name, member.phone, member.id)}
                >
                  {otpStatus[member.id] === "loading"
                    ? "Sending OTP..."
                    : otpStatus[member.id] === "sent"
                    ? "OTP Sent"
                    : otpStatus[member.id] === "failed"
                    ? "Retry OTP"
                    : "Send OTP"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
