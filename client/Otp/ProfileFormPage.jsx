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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={memberdata.gender || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={memberdata.contact?.mobile || ""}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={memberdata.contact?.email || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={memberdata.address?.state || ""}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="street" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={memberdata.address?.street || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={memberdata.address?.city || ""}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="specialty" className="form-label">
                  Specialty
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specialty"
                  name="specialty"
                  value={memberdata.specialty || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="specialtyCode" className="form-label">
                  Specialty Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specialtyCode"
                  name="specialtyCode"
                  value={memberdata.specialtyCode || ""}
                  disabled
                />
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="headquartersStatus" className="form-label">
                  Headquarters Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="headquartersStatus"
                  name="headquartersStatus"
                  value={memberdata.approvals?.headquarters?.status || ""}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="stateBranchStatus" className="form-label">
                  State Branch Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stateBranchStatus"
                  name="stateBranchStatus"
                  value={memberdata.approvals?.statebranch?.status || ""}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="localBranchStatus" className="form-label">
                  Local Branch Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="localBranchStatus"
                  name="localBranchStatus"
                  value={memberdata.approvals?.localbranch?.status || ""}
                  disabled
                />
              </div>
            </div> */}

            <div className="row">
              <div className="col-md-12 mb-3">
                <button
                  className="btn btn-success w-100"
                  // onClick={handleDownloadCertificate}
                >
                  Update Certificate
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
