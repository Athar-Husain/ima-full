import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import logo from "../assets/img/ima-ams-logo.jpg";
import scanner from "../assets/img/ima-ams-qr.jpg";
import SpecialityData from "./SpecialityData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerMember } from "../redux/features/auth/memberSlice";
import { toast } from "react-toastify";

const MemberApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // State to store cities based on selected state
  const [selectedState, setSelectedState] = useState(""); // Track selected state
  const [selectedCity, setSelectedCity] = useState(""); // Track selected city
  const [qualifications, setQualifications] = useState([
    { degree: "", university: "", year: "" },
  ]);
  const [experiences, setExperiences] = useState([
    { designation: "", institution: "", period: "" },
  ]);

  const [formData, setFormData] = useState({
    speciality: "",
    specialityCode: "",
    state: "",
    stateName: "",
    stateCode: "",
    city: "",
  });

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry("IN");
        const allStates = result?.map(({ isoCode, name }) => ({
          value: isoCode,
          label: name,
        }));
        setStates(allStates);
      } catch (error) {
        setStates([]);
      }
    };

    getStates();
  }, []);

  const handleStateChange = async (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);

    // Find the state object from the list of states to get both code and name
    const selectedStateObj = states.find((state) => state.value === stateCode);
    const stateName = selectedStateObj ? selectedStateObj.label : "";

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      state: stateCode,
      stateCode: stateCode,
      stateName: stateName,
    }));

    if (stateCode) {
      try {
        const result = await City.getCitiesOfState("IN", stateCode);
        const allCities = result?.map(({ name }) => ({
          value: name,
          label: name,
        }));
        setCities(allCities);
      } catch (error) {
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      city: cityName,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errorElement = document.getElementById("fileError");
    errorElement.textContent = ""; // Clear previous errors

    // Validate file count
    if (files.length > 5) {
      errorElement.textContent = "You can only upload a maximum of 5 files.";
      e.target.value = ""; // Clear the input
      return;
    }

    // Validate file size
    const isValidSize = files.every((file) => file.size <= 5 * 1024 * 1024); // 5 MB
    if (!isValidSize) {
      errorElement.textContent = "File must be less than 5 MB.";
      e.target.value = ""; // Clear the input
      return;
    }

    console.log("Files selected:", files);
  };

  const handleSpecialityChange = (e) => {
    const selectedSpeciality = e.target.value;
    const matchingSpeciality = SpecialityData.find(
      (item) => item.speciality === selectedSpeciality
    );
    setFormData({
      speciality: selectedSpeciality,
      specialityCode: matchingSpeciality ? matchingSpeciality.code : "",
    });
  };

  const handleSpecialityCodeChange = (e) => {
    const selectedCode = e.target.value;
    const matchingCode = SpecialityData.find(
      (item) => item.code === selectedCode
    );
    setFormData({
      speciality: matchingCode ? matchingCode.speciality : "",
      specialityCode: selectedCode,
    });
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { degree: "", university: "", year: "" },
    ]);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { designation: "", institution: "", period: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Create a FormData object from the form
      const formDataFromTarget = new FormData(e.target);

      // Separate fields into appropriate arrays
      const formObject = {
        qualifications: [],
        experiences: [],
        uploads: [],
      };

      // const stateObj = states.find((state) => state.value === formData.state);
      // console.log("state obj in handle Submit", stateObj);

      // Iterate over the FormData entries
      formDataFromTarget.forEach((value, key) => {
        if (
          key.startsWith("degree") ||
          key.startsWith("university") ||
          key.startsWith("year")
        ) {
          const index = key.match(/\[(\d+)\]/)?.[1]; // Extract the index
          if (index !== undefined) {
            formObject.qualifications[index] = {
              ...formObject.qualifications[index],
              [key.split("[")[0]]: value,
            };
          }
        } else if (
          key.startsWith("designation") ||
          key.startsWith("institution") ||
          key.startsWith("period")
        ) {
          const index = key.match(/\[(\d+)\]/)?.[1]; // Extract the index
          if (index !== undefined) {
            formObject.experiences[index] = {
              ...formObject.experiences[index],
              [key.split("[")[0]]: value,
            };
          }
        } else if (key === "documents[]") {
          formObject.uploads.push(value);
        } else {
          formObject[key] = value;
        }
      });

      // pin code

      const pinCode = formObject["pin-code"];
      if (!/^\d{6}$/.test(pinCode)) {
        errors["pin-code"] = "Pin Code must be exactly 6 digits";
        toast.error("Pin code must be 6 digits");
      }

      // If there are any errors, show a message and return early
      // if (Object.keys(errors).length > 0) {
      //   // Show error messages (you could also use a toast or modal here)
      //   console.log(errors);
      //   return;
      // }

      // Log the processed form data
      console.log("Form submitted with data:", formObject);
      console.log("Form submitted with data:", formData);

      const userData = {
        ...formObject,
        ...formData,
      };

      dispatch(registerMember(userData));

      console.log("userData", userData);

      // Reset the form
      // e.target.reset();
    } catch (error) {
      toast.error(error.message);
      console.log("error in Handle Submit", error.message);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Initialize an empty error object to collect validation errors
  //   const errors = {};

  //   try {
  //     // Create a FormData object from the form
  //     const formDataFromTarget = new FormData(e.target);

  //     // Separate fields into appropriate arrays
  //     const formObject = {
  //       qualifications: [],
  //       experiences: [],
  //       uploads: [],
  //     };

  //     // Iterate over the FormData entries
  //     formDataFromTarget.forEach((value, key) => {
  //       if (
  //         key.startsWith("degree") ||
  //         key.startsWith("university") ||
  //         key.startsWith("year")
  //       ) {
  //         const index = key.match(/\[(\d+)\]/)?.[1]; // Extract the index
  //         if (index !== undefined) {
  //           formObject.qualifications[index] = {
  //             ...formObject.qualifications[index],
  //             [key.split("[")[0]]: value,
  //           };
  //         }
  //       } else if (
  //         key.startsWith("designation") ||
  //         key.startsWith("institution") ||
  //         key.startsWith("period")
  //       ) {
  //         const index = key.match(/\[(\d+)\]/)?.[1]; // Extract the index
  //         if (index !== undefined) {
  //           formObject.experiences[index] = {
  //             ...formObject.experiences[index],
  //             [key.split("[")[0]]: value,
  //           };
  //         }
  //       } else if (key === "documents[]") {
  //         formObject.uploads.push(value);
  //       } else {
  //         formObject[key] = value;
  //       }
  //     });

  //     // Pin code validation: Ensure it is 6 digits long
  //     const pinCode = formObject["pin-code"];
  //     if (!/^\d{6}$/.test(pinCode)) {
  //       errors["pin-code"] = "Pin Code must be exactly 6 digits.";
  //       toast.error("Pin code must be 6 digits");
  //     }

  //     // If there are any errors, show a message and return early
  //     if (Object.keys(errors).length > 0) {
  //       // Show error messages (you could also use a toast or modal here)
  //       console.log(errors);
  //       return;
  //     }

  //     console.log("Form submitted with data:", formObject);

  //     const userData = {
  //       ...formObject,
  //     };

  //     // Dispatch the data (call your action here)
  //     dispatch(registerMember(userData));

  //     // Optionally reset the form
  //     // e.target.reset();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header form-heading">
          <div className="header-logo-left">
            <img src={logo} alt="Logo Left" className="logo" />
          </div>
          <div className="header-title">
            <h3>Application Form for Life Membership</h3>
            <p>IMA Academy of Medical Specialities</p>
          </div>
          <div className="header-logo-right">
            <img src={scanner} alt="Logo Right" className="logo" />
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <h3 className="mt-4 text-center">
              Fill Your Details In Application
            </h3>

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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="fatherHusband" className="form-label">
                  Name of Father/Husband
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fatherHusband"
                  name="fatherHusband"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="speciality" className="form-label">
                  Speciality
                </label>
                <select
                  className="form-select"
                  id="speciality"
                  value={formData.speciality}
                  onChange={handleSpecialityChange}
                >
                  <option value="">Select Speciality</option>
                  {SpecialityData.map((item) => (
                    <option key={item.code} value={item.speciality}>
                      {item.speciality}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="specialityCode" className="form-label">
                  Speciality Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specialityCode"
                  value={formData.specialityCode}
                  readOnly
                  onChange={handleSpecialityCodeChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  className="form-select"
                  id="state"
                  value={formData.state} // Bind to formData.state
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <select
                  className="form-select"
                  id="city"
                  value={formData.city} // Bind to formData.city
                  onChange={handleCityChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="address1" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="pin-code" className="form-label">
                  Pin Code
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pin-code"
                  name="pin-code"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="landline" className="form-label">
                  Landline No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="landline"
                  name="landline"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="stateBranch" className="form-label">
                  State Branch
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stateBranch"
                  name="stateBranch"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="localBranch" className="form-label">
                  Local Branch
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="localBranch"
                  name="localBranch"
                  required
                />
              </div>
            </div>

            {/* Payment Details Section */}
            <h5 className="mt-4 mb-2">Payment Details</h5>
            <div className="mb-3">
              <label htmlFor="utrNo" className="form-label">
                UTR Number
              </label>
              <input
                type="text"
                className="form-control"
                id="utrNo"
                name="utrNo"
                required
              />
            </div>

            {/* Qualification Section */}
            <h5 className="mt-4">Qualifications</h5>
            {qualifications.map((qualification, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`degree[${index}]`}
                    placeholder="Degree/Diploma"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`university[${index}]`}
                    placeholder="University/Institution"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`year[${index}]`}
                    placeholder="Year Obtained"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mb-3"
              onClick={addQualification}
            >
              Add Qualification
            </button>

            {/* Experience Section */}
            <h5 className="mt-4">Experience</h5>
            {experiences.map((experience, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`designation[${index}]`}
                    placeholder="Designation"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`institution[${index}]`}
                    placeholder="Institution"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name={`period[${index}]`}
                    placeholder="Period (From-To)"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mb-3"
              onClick={addExperience}
            >
              Add Experience
            </button>

            {/* File Upload Section */}
            <h5 className="mt-4">Uploads</h5>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                accept="image/*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="documents" className="form-label">
                Upload Documents
              </label>
              <input
                type="file"
                className="form-control"
                id="documents"
                name="documents[]"
                multiple
                required
                onChange={handleFileChange}
              />
              <small className="text-danger" id="fileError"></small>
            </div>

            {/* Signature Section */}
            <div className="mb-3">
              <label htmlFor="signature" className="form-label">
                Signature
              </label>
              <input
                type="file"
                className="form-control"
                id="signature"
                name="signature"
                accept="image/*"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100 p-2">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberApplication;
