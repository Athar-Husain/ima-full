import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Breadcrumb from "../Components/Breadcrumb.jsx";

import EnterOTPPage from "../../Otp/EnterOTPPage.jsx";

const EnterOTPPages = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Enter OTP" description="Please verify your OTP here" />
      <EnterOTPPage />
      <Footer />
    </>
  );
};

export default EnterOTPPages;
