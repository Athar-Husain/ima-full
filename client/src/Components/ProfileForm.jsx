import React from "react";

const ProfileForm = ({ onDownloadCertificate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log("Form submitted with data:", formObject);
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header form-heading d-flex justify-content-between align-items-center">
          <h3 className="header-title">Dr. Moin Khan</h3>
        </div>
        <div className="text-end p-2">
          <button className="btn btn-success" onClick={onDownloadCertificate}>
            Download Certificate
          </button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="fname" name="fname" readOnly defaultValue="Moin" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lname" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lname" name="lname" readOnly defaultValue="Khan" />
              </div>
            </div>

            {/* Add more form fields if needed */}
            
            <button type="submit" className="btn btn-success w-100 p-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
