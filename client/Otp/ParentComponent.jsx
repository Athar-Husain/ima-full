import React, { useState } from "react";
import EnterOTPPage from "./EnterOTPPage";

const ParentComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("7996734895");  // Example phone number

  return (
    <div>
      <h1>Enter OTP Page</h1>
      <p>Phone Number: {phoneNumber}</p>  {/* Display phone number for debugging */}
      <EnterOTPPage phoneNumber={phoneNumber} />
    </div>
  );
};

export default ParentComponent;
