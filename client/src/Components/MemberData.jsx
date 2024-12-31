// // import React, { useState, useEffect } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllMembers } from "../redux/features/auth/memberSlice";
// // import axios from "axios";
// // // import axios from "axios";

// // const MemberData = () => {
// //   const dispatch = useDispatch();
// //   const [loading, setLoading] = useState(false);
// //   const [otpStatus, setOtpStatus] = useState({});

// //   const { member, allMembers, isLoading, isError } = useSelector(
// //     (state) => state.member
// //   );

// //   // const state = useSelector((state) => state.member);
// //   // console.log("members", state);

// //   useEffect(() => {
// //     dispatch(getAllMembers());
// //   }, [dispatch]);

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (isError) {
// //     return <div>{isError}</div>;
// //   }

// //   const handleSendOtp = async (name, phoneNumber, id) => {
// //     if (!phoneNumber) {
// //       // If the phone number doesn't exist, show an alert and return
// //       alert(`No phone number available for ${name}.`);
// //       return;
// //     }

// //     if (window.confirm(`Do you want to send OTP to ${name}?`)) {
// //       setLoading(true);
// //       setOtpStatus((prevState) => ({
// //         ...prevState,
// //         [id]: "loading", // Set status as loading for this member
// //       }));
// //       try {
// //         // const response = await axios.post(`${OTP_URL} + " send-otp", {
// //         // const response = await axios.post(`${OTP_URL} +" send-otp", {
// //         // const response = await axios.post("http://localhost:9000/send-otp", {
// //         const response = await axios.post(`${OTP_URL}send-otp`, {
// //           name,
// //           phoneNumber,
// //         });

// //         if (response.data.success) {
// //           setOtpStatus((prevState) => ({
// //             ...prevState,
// //             [id]: "sent", // Update status to sent for this member
// //           }));
// //           alert("OTP sent successfully!");
// //           // Redirect to OTP verification page
// //           window.location.href = "/enter-otp";
// //         } else {
// //           setOtpStatus((prevState) => ({
// //             ...prevState,
// //             [id]: "failed", // Update status to failed for this member
// //           }));
// //           alert("Failed to send OTP");
// //         }
// //       } catch (error) {
// //         console.error("Error:", error);
// //         setOtpStatus((prevState) => ({
// //           ...prevState,
// //           [id]: "failed", // Update status to failed for this member
// //         }));
// //         alert("Error sending OTP");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   // const [members, setMembers] = useState([]);  // State to store fetched data
// //   // const [loading, setLoading] = useState(true); // Loading state
// //   // const [error, setError] = useState(null); // Error state

// //   // Fetch data from API when component mounts
// //   // useEffect(() => {
// //   //   axios
// //   //     .get("https://your-api-endpoint.com/members")  // Replace with your actual API URL
// //   //     .then((response) => {
// //   //       setMembers(response.data);  // Set fetched data into state
// //   //       setLoading(false);  // Set loading to false after data is fetched
// //   //     })
// //   //     .catch((err) => {
// //   //       setError("Error fetching data");  // Set error if API call fails
// //   //       setLoading(false);
// //   //     });
// //   // }, []);

// //   // Conditional rendering
// //   // if (loading) {
// //   //   return <div className="container">Loading...</div>;
// //   // }

// //   // if (error) {
// //   //   return <div className="container">Error: {error}</div>;
// //   // }

// //   return (
// //     <div className="container-fluid px-0">
// //       <div className="card shadow-lg rounded">
// //         <div className="card-header">
// //           <h3>Members Details</h3>
// //         </div>
// //         <div className="card-body">
// //           <div className="table-responsive">
// //             <table className="table table-bordered table-striped">
// //               <thead>
// //                 <tr>
// //                   <th>Member ID</th>
// //                   <th>Full Name</th>
// //                   <th>State Branch</th>
// //                   <th>Local Branch</th>
// //                   <th>Contact No</th>
// //                   <th>Email</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {allMembers.map((member, index) => (
// //                   <tr key={index}>
// //                     {/* Member ID */}
// //                     <td>{member.membershipDetails?.memberid || "N/A"}</td>

// //                     {/* Full Name (First Name + Last Name) */}
// //                     <td>{`${member.firstName || ""} ${
// //                       member.lastName || ""
// //                     }`}</td>

// //                     {/* State Branch Name */}
// //                     <td>
// //                       {member.membershipDetails?.stateBranchName || "N/A"}
// //                     </td>

// //                     {/* Local Branch Name */}
// //                     <td>
// //                       {member.membershipDetails?.localBranchName || "N/A"}
// //                     </td>

// //                     {/* Contact Number (if present) */}
// //                     <td>{member.contact?.mobile || "N/A"}</td>

// //                     {/* Email (if present) */}
// //                     <td>{member.contact?.email || "N/A"}</td>
// //                     <td>
// //                       <button
// //                         className="btn btn-success"
// //                         disabled={otpStatus[index] === "loading" || loading}
// //                         onClick={() =>
// //                           handleSendOtp(
// //                             member.firstName,
// //                             member.contact?.mobile,
// //                             index
// //                           )
// //                         }
// //                       >
// //                         {otpStatus[index] === "loading"
// //                           ? "Sending..."
// //                           : otpStatus[index] === "sent"
// //                           ? "OTP Sent"
// //                           : otpStatus[index] === "failed"
// //                           ? "Retry"
// //                           : "Send OTP"}
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MemberData;

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllMembers } from "../redux/features/auth/memberSlice";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { OTP_URL } from "../redux/features/auth/memberService";
// import { setSelectedMember } from "../redux/features/auth/memberSlice"; // Import the action

// const MemberData = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State for search inputs
//   const [searchName, setSearchName] = useState("");
//   const [searchPhone, setSearchPhone] = useState("");
//   const [filteredMembers, setFilteredMembers] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [otpStatus, setOtpStatus] = useState({});

//   const { memberdata, allMembers, isLoading, isError } = useSelector(
//     (state) => state.member
//   );

//   // console.log("member", member)

//   useEffect(() => {
//     dispatch(getAllMembers());
//   }, [dispatch]);

//   const handleSearch = () => {
//     const filtered = allMembers.filter((member) => {
//       const fullName = `${member.firstName || ""} ${
//         member.lastName || ""
//       }`.toLowerCase();
//       const phone = member.contact?.mobile || "";
//       return (
//         fullName.includes(searchName.toLowerCase()) &&
//         phone.includes(searchPhone)
//       );
//     });
//     setFilteredMembers(filtered);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>{isError}</div>;
//   }

//   const formatPhoneNumber = (phoneNumber) => {
//     if (!phoneNumber) return "N/A";
//     // Assuming phone number is in the form of a string like "1234567895"
//     return "######" + phoneNumber.slice(-4);
//   };

//   const handleSendOtp = async (name, phoneNumber, index, id) => {
//     if (!phoneNumber) {
//       // If the phone number doesn't exist, show an alert and return
//       alert(
//         `No phone number available for ${name}.\nPlease contact the office for an update.`
//       );
//       return;
//     }

//     if (window.confirm(`Do you want to send OTP to ${name}?`)) {
//       setLoading(true);
//       setOtpStatus((prevState) => ({
//         ...prevState,
//         [index]: "loading", // Set status as loading for this member
//       }));

//       try {
//         // Assuming OTP_URL is a predefined URL base for the OTP service
//         const response = await axios.post(`${OTP_URL}send-otp`, {
//           name,
//           phoneNumber,
//         });

//         if (response.data.success) {
//           setOtpStatus((prevState) => ({
//             ...prevState,
//             [index]: "sent", // Update status to sent for this member
//           }));
//           alert("OTP sent successfully!");
//           // Navigate to OTP verification page and pass phoneNumber via state
//           navigate("/enter-otp", { state: { phoneNumber, id } });
//           // alert("OTP sent successfully!");
//           // // Redirect to OTP verification page
//           // window.location.href = "/enter-otp";
//         } else {
//           setOtpStatus((prevState) => ({
//             ...prevState,
//             [index]: "failed", // Update status to failed for this member
//           }));
//           alert("Failed to send OTP");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setOtpStatus((prevState) => ({
//           ...prevState,
//           [index]: "failed", // Update status to failed for this member
//         }));
//         alert("Error sending OTP");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="container-fluid px-10 justify-content-center align-items-center">
//       {/* Search Form */}
//       <div className="container-fluid d-flex justify-content-center align-items-center mt-3">
//         {/* Search Form */}
//         <div
//           className="member-search-card mb-4 p-4 shadow-lg"
//           style={{ maxWidth: "500px", width: "100%" }}
//         >
//           <h2 className="member-search-title text-center mb-4">
//             IMA-AMS Members{" "}
//           </h2>
//           <hr />
//           <form
//             className="member-search-form"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSearch();
//             }}
//           >
//             <div className="form-group mb-3">
//               <label htmlFor="memberName" className="form-label">
//                 Member Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="memberName"
//                 placeholder="Enter member's name"
//                 value={searchName}
//                 onChange={(e) => setSearchName(e.target.value)}
//               />
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="phoneNumber" className="form-label">
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phoneNumber"
//                 placeholder="Enter phone number"
//                 value={searchPhone}
//                 onChange={(e) => setSearchPhone(e.target.value)}
//               />
//             </div>
//             <div className="form-group text-center">
//               <button type="submit" className="btn btn-success w-100">
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="card shadow-lg rounded">
//         <div className="card-header">
//           <h3>Members Details</h3>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   {/* <th>Member ID</th> */}
//                   <th>Member Name</th>
//                   <th>State Branch</th>
//                   <th>Local Branch</th>
//                   <th>Contact No</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                   {/* <th>id</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//               {filteredMembers.length > 0 ? (
//                   filteredMembers.map((member, index) => (
//                 // {allMembers.map((member, index) => (
//                   <tr key={index}>
//                     {/* Member ID */}
//                     {/* <td>{member.membershipDetails?.memberid || "N/A"}</td> */}

//                     {/* Full Name (First Name + Last Name) */}
//                     <td>{`${member.firstName || ""} ${
//                       member.lastName || ""
//                     }`}</td>

//                     {/* State Branch Name */}
//                     <td>
//                       {member.membershipDetails?.stateBranchName || "N/A"}
//                     </td>

//                     {/* Local Branch Name */}
//                     <td>
//                       {member.membershipDetails?.localBranchName || "N/A"}
//                     </td>

//                     {/* Contact Number (if present) */}
//                     {/* <td>{member.contact?.mobile || "N/A"}</td> */}
//                     <td>{formatPhoneNumber(member.contact?.mobile)}</td>

//                     {/* Email (if present) */}
//                     <td>{member.contact?.email || "N/A"}</td>

//                     {/* Actions */}
//                     <td>
//                     <button
//                           className="btn btn-success"
//                           disabled={otpStatus[index] === "loading" || loading}
//                           onClick={() =>
//                             handleSendOtp(
//                               member.firstName,
//                               member.contact?.mobile,
//                               index
//                             )
//                           }
//                         >
//                           {otpStatus[index] === "loading"
//                             ? "Sending..."
//                             : otpStatus[index] === "sent"
//                             ? "OTP Sent"
//                             : otpStatus[index] === "failed"
//                             ? "Retry"
//                             : "Send OTP"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">
//                       No members found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberData;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllMembers } from "../redux/features/auth/memberSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OTP_URL } from "../redux/features/auth/memberService";

const MemberData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for search inputs
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState({});

  const { allMembers, isLoading, isError } = useSelector(
    (state) => state.member
  );

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  // const formatPhoneNumber = (phoneNumber) => {
  //   if (!phoneNumber) return "N/A";
  //   return "######" + phoneNumber.slice(-4);
  // };

  const handleSearch = () => {
    const filtered = allMembers.filter((member) => {
      const fullName = `${member.firstName || ""} ${
        member.lastName || ""
      }`.toLowerCase();
      const phone = member.contact?.mobile || "";
      return (
        fullName.includes(searchName.toLowerCase()) &&
        phone.includes(searchPhone)
      );
    });
    setFilteredMembers(filtered);
  };

  const handleSendOtp = async (name, phoneNumber, index, id) => {
    if (!phoneNumber) {
      alert(`No phone number available for ${name}.`);
      return;
    }

    if (window.confirm(`Do you want to send OTP to ${name}?`)) {
      setLoading(true);
      setOtpStatus((prevState) => ({
        ...prevState,
        [index]: "loading",
      }));

      try {
        const response = await axios.post(`${OTP_URL}send-otp`, {
          name,
          phoneNumber,
        });

        if (response.data.success) {
          setOtpStatus((prevState) => ({
            ...prevState,
            [index]: "sent",
          }));
          alert("OTP sent successfully!");
          navigate("/enter-otp", { state: { phoneNumber, id } });
        } else {
          setOtpStatus((prevState) => ({
            ...prevState,
            [index]: "failed",
          }));
          alert("Failed to send OTP");
        }
      } catch (error) {
        console.error("Error:", error);
        setOtpStatus((prevState) => ({
          ...prevState,
          [index]: "failed",
        }));
        alert("Error sending OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError}</div>;

  return (
    <div className="container-fluid px-10 justify-content-center align-items-center">
      {/* Search Form */}
      <div className="container-fluid d-flex justify-content-center align-items-center mt-3">
        {/* Search Form */}
        <div
          className="member-search-card mb-4 p-4 shadow-lg"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="member-search-title text-center mb-4">
            IMA-AMS Members{" "}
          </h2>
          <hr />
          <form
            className="member-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="form-group mb-3">
              <label htmlFor="memberName" className="form-label">
                Member Name
              </label>
              <input
                type="text"
                className="form-control"
                id="memberName"
                placeholder="Enter member's name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-success w-100">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Member Data Table */}
      <div className="card shadow-lg rounded">
        <div className="card-header">
          <h3>Members Details</h3>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {/* <th>Member ID</th> */}
                  <th>Full Name</th>
                  <th>State Branch</th>
                  <th>Local Branch</th>
                  <th>Contact No</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr key={index}>
                      {/* <td>{member.membershipDetails?.memberid || "N/A"}</td> */}
                      <td>{`${member.firstName || ""} ${
                        member.lastName || ""
                      }`}</td>
                      <td>
                        {member.membershipDetails?.stateBranchName || "N/A"}
                      </td>
                      <td>
                        {member.membershipDetails?.localBranchName || "N/A"}
                      </td>
                      <td>{member.contact?.mobile}</td>
                      <td>{member.contact?.email || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          disabled={otpStatus[index] === "loading" || loading}
                          onClick={() =>
                            handleSendOtp(
                              member.firstName,
                              member.contact?.mobile,
                              index,
                              member._id
                            )
                          }
                        >
                          {otpStatus[index] === "loading"
                            ? "Sending..."
                            : otpStatus[index] === "sent"
                            ? "OTP Sent"
                            : otpStatus[index] === "failed"
                            ? "Retry"
                            : "Send OTP"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberData;

// Live search// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllMembers } from "../redux/features/auth/memberSlice";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { OTP_URL } from "../redux/features/auth/memberService";

// const MemberData = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State for search inputs
//   const [searchName, setSearchName] = useState("");
//   const [searchPhone, setSearchPhone] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [otpStatus, setOtpStatus] = useState({});

//   const { allMembers, isLoading, isError } = useSelector((state) => state.member);

//   useEffect(() => {
//     dispatch(getAllMembers());
//   }, [dispatch]);

//   const formatPhoneNumber = (phoneNumber) => {
//     if (!phoneNumber) return "N/A";
//     return "######" + phoneNumber.slice(-4);
//   };

//   const handleSendOtp = async (name, phoneNumber, index) => {
//     if (!phoneNumber) {
//       alert(`No phone number available for ${name}.`);
//       return;
//     }

//     if (window.confirm(`Do you want to send OTP to ${name}?`)) {
//       setLoading(true);
//       setOtpStatus((prevState) => ({
//         ...prevState,
//         [index]: "loading",
//       }));

//       try {
//         const response = await axios.post(`${OTP_URL}send-otp`, {
//           name,
//           phoneNumber,
//         });

//         if (response.data.success) {
//           setOtpStatus((prevState) => ({
//             ...prevState,
//             [index]: "sent",
//           }));
//           alert("OTP sent successfully!");
//           navigate("/enter-otp", { state: { phoneNumber } });
//         } else {
//           setOtpStatus((prevState) => ({
//             ...prevState,
//             [index]: "failed",
//           }));
//           alert("Failed to send OTP");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setOtpStatus((prevState) => ({
//           ...prevState,
//           [index]: "failed",
//         }));
//         alert("Error sending OTP");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Filter members based on search inputs
//   const filteredMembers = allMembers.filter((member) => {
//     const fullName = `${member.firstName || ""} ${member.lastName || ""}`.toLowerCase();
//     const phone = member.contact?.mobile || "";
//     return (
//       fullName.includes(searchName.toLowerCase()) &&
//       phone.includes(searchPhone)
//     );
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{isError}</div>;

//   return (
//     <div className="container-fluid px-0">
//       {/* Search Form */}
//       <div className="member-search-container mb-4">
//         <h2 className="member-search-title">IMA-AMS Members - Member Area</h2>
//         <hr />
//         <form className="row g-3">
//           <div className="col-md-6">
//             <label htmlFor="memberName" className="form-label">
//               Member Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="memberName"
//               placeholder="Enter member's name"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="phoneNumber" className="form-label">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="phoneNumber"
//               placeholder="Enter phone number"
//               value={searchPhone}
//               onChange={(e) => setSearchPhone(e.target.value)}
//             />
//           </div>
//         </form>
//       </div>

//       {/* Member Data Table */}
//       <div className="card shadow-lg rounded">
//         <div className="card-header">
//           <h3>Members Details</h3>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Member ID</th>
//                   <th>Full Name</th>
//                   <th>State Branch</th>
//                   <th>Local Branch</th>
//                   <th>Contact No</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredMembers.length > 0 ? (
//                   filteredMembers.map((member, index) => (
//                     <tr key={index}>
//                       <td>{member.membershipDetails?.memberid || "N/A"}</td>
//                       <td>{`${member.firstName || ""} ${member.lastName || ""}`}</td>
//                       <td>{member.membershipDetails?.stateBranchName || "N/A"}</td>
//                       <td>{member.membershipDetails?.localBranchName || "N/A"}</td>
//                       <td>{formatPhoneNumber(member.contact?.mobile)}</td>
//                       <td>{member.contact?.email || "N/A"}</td>
//                       <td>
//                         <button
//                           className="btn btn-success"
//                           disabled={otpStatus[index] === "loading" || loading}
//                           onClick={() =>
//                             handleSendOtp(
//                               member.firstName,
//                               member.contact?.mobile,
//                               index
//                             )
//                           }
//                         >
//                           {otpStatus[index] === "loading"
//                             ? "Sending..."
//                             : otpStatus[index] === "sent"
//                             ? "OTP Sent"
//                             : otpStatus[index] === "failed"
//                             ? "Retry"
//                             : "Send OTP"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">
//                       No members found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberData;
