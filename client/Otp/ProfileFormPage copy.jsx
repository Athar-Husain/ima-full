import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getMemberData } from "../src/redux/features/auth/memberSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const memberdataFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { memberdata, isLoading, isError } = useSelector(
    (state) => state.member
  );

  // Fetch member data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getMemberData(id)); // Fetch the member data
    }
  }, [dispatch, id]);

  // Check if data is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check for error in data fetching
  if (isError) {
    return <div>Error loading member data!</div>;
  }

  // Handle case when member data is not available
  if (!memberdata) {
    return <div>No member data available</div>;
  }

  const handleDownloadCertificate = () => {
    alert("Downloading certificate...");
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header form-heading d-flex justify-content-between align-items-center">
          <h3 className="header-title">
            {memberdata.firstName} {memberdata.lastName}
          </h3>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  value={memberdata.firstName || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  value={memberdata.lastName || ""}
                  disabled
                />
              </div>
            </div>

            {/* Other fields here */}

            <div className="row">
              <div className="col-md-6 mb-3">
                <button
                  className="btn btn-success w-100"
                  onClick={handleDownloadCertificate}
                >
                  Download Certificate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memberdataFormPage;
