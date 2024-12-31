import React from "react";

const EnterOTP = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = e.target.otp.value;
    if (otpValue) {
      alert(`OTP ${otpValue} submitted.`);
    } else {
      alert("Please enter a valid OTP.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header form-heading">
          <h3 className="header-title text-center">Verify OTP</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Verify OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
