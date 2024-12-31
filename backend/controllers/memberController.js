import asyncHandler from "express-async-handler";
import Member from "../models/memberModel.js";
// import bcrypt from "bcryptjs";
import { generateToken, hashToken } from "../utils/index.js";
import jwt from "jsonwebtoken";
// import { addStateBranch } from "./stateBrController";

// Register User

// const registerMember = asyncHandler(async (req, res) => {
//   try {
//     const { firstName, lastName, gender, email, address, contact } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !gender || !email || !address || !contact) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Check if a member with the given email already exists
//     const memberExists = await Member.findOne({ "contact.email": email });

//     if (memberExists) {
//       return res.status(400).json({ error: "Email already in use." });
//     }

//     // Create new member
//     const newMember = await Member.create({
//       firstName,
//       lastName,
//       gender,
//       dateOfBirth,
//       fatherOrHusbandName,
//       specialty,
//       specialtyCode,
//       isExpired,
//       checked,
//       contact: {
//         email: email || "",
//         mobile: contact.mobile || "",
//         landline: contact.landline || "",
//       },
//       address: {
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         pinCode: address.pinCode,
//       },
//       membershipDetails: {
//         // memberid: "",
//         mappliedDate: "",
//         // membershipDate: "",
//         // membershipYear: "",
//         // mshiprecpt: "",
//         stateBranchCode: "",
//         stateBranchCount: "",
//         localBranchName: "",
//         localBranchCode: "",
//         localBranchCount: "",
//         lmoram: "",
//         status: "",
//       },
//       paymentDetails: {
//         utrNumber: "",
//       },
//     });

//     // If member creation is successful
//     if (newMember) {
//       res.status(201).json({
//         message: "Member registered successfully.",
//         member: {
//           _id: newMember._id,
//           firstName: newMember.firstName,
//           lastName: newMember.lastName,
//           gender: newMember.gender,
//           email: newMember.contact.email,
//           mobile: newMember.contact.mobile,
//           address: newMember.address,
//         },
//       });
//     } else {
//       res.status(400).json({ error: "Invalid member data." });
//     }
//   } catch (error) {
//     console.error("Error registering member:", error);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

// const registerMember = asyncHandler(async (req, res) => {
//   try {
//     // const {
//     //   firstName,
//     //   lastName,
//     //   gender,
//     //   dateOfBirth,
//     //   fatherOrHusbandName,
//     //   specialty,
//     //   specialtyCode,
//     //   isExpired,
//     //   checked,
//     //   address,
//     //   contact,
//     //   qualifications,
//     //   experiences,
//     // } = req.body;

//     const memberdata = req.body;

//     console.log("req body in the Reister Member", req.body);

//     // Basic input validation
//     if (
//       !firstName ||
//       !lastName ||
//       !gender ||
//       !contact.email ||
//       !address.street ||
//       !address.pinCode
//     ) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }

//     // Check if a member with the given email already exists
//     const existingMember = await Member.findOne({
//       "contact.email": memberdata.email,
//     });
//     if (existingMember) {
//       return res.status(400).json({ error: "Email already in use." });
//     }

//     // Create a new member instance
//     const newMember = new Member({
//       firstName,
//       lastName,
//       gender,
//       dateOfBirth,
//       fatherOrHusbandName,
//       specialty,
//       specialtyCode,
//       isExpired,
//       checked,
//       address: {
//         street: address.street,
//         city: address.city || "",
//         state: address.state || "",
//         pinCode: address.pinCode,
//       },
//       contact: {
//         landline: contact.landline || "",
//         mobile: contact.mobile,
//         email: contact.email,
//       },
//       qualifications: qualifications || [], // Initialize as an empty array if not provided
//       experiences: experiences || [], // Initialize as an empty array if not provided

//       // Add other fields with default values or logic here
//       membershipDetails: {
//         memberid: "", // Auto-generated later
//         mappliedDate: new Date(),
//         membershipDate: "",
//         membershipYear: "",
//         mshiprecpt: "",
//         stateBranchName: "",
//         stateBranchCode: "",
//         stateBranchCount: "",
//         localBranchName: "",
//         localBranchCode: "",
//         localBranchCount: "",
//         lmoram: "",
//         status: "pending",
//         fellowDetails: {
//           isFellow: false,
//           fellowYear: null,
//         },
//       },

//       uploads: {
//         photo: "",
//         documents: [],
//         signature: "",
//       },

//       approvals: {
//         headquarters: {
//           status: "pending",
//         },
//         statebranch: {
//           status: "pending",
//           approver: null,
//           comments: "",
//         },
//         localbranch: {
//           status: "pending",
//           approver: null,
//           comments: "",
//         },
//       },
//     });

//     // Save the new member to the database
//     const savedMember = await newMember.save();

//     res.status(201).json({
//       message: "Member registered successfully.",
//       member: {
//         _id: savedMember._id,
//         firstName: savedMember.firstName,
//         lastName: savedMember.lastName,
//         gender: savedMember.gender,
//         email: savedMember.contact.email,
//         mobile: savedMember.contact.mobile,
//         address: savedMember.address,
//       },
//     });
//   } catch (error) {
//     console.error("Error registering member:", error.message);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

const registerMember = asyncHandler(async (req, res) => {
  try {
    const memberData = req.body;

    console.log("req body in the Register Member", req.body);

    // Basic input validation (add any additional fields as required)
    if (
      !memberData.fname ||
      !memberData.lname ||
      !memberData.gender ||
      !memberData.email ||
      !memberData.address1 ||
      !memberData["pin-code"]
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if a member with the given email already exists
    const existingMember = await Member.findOne({
      "contact.email": memberData.email,
    });
    if (existingMember) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Create a new member instance based on the schema
    const newMember = new Member({
      firstName: memberData.fname,
      lastName: memberData.lname,
      dateOfBirth: new Date(memberData.dob), // convert string to Date
      gender: memberData.gender,
      fatherOrHusbandName: memberData.fatherHusband,
      specialty: memberData.speciality,
      specialtyCode: memberData.specialityCode,
      address: {
        street: memberData.address1,
        city: memberData.city || "", // Default to an empty string if not provided
        state: memberData.state || "",
        pinCode: memberData["pin-code"],
      },
      contact: {
        landline: memberData.landline || "", // Default to empty string if not provided
        mobile: memberData.mobile,
        email: memberData.email,
      },
      qualifications: memberData.qualifications || [], // Handle qualifications as an empty array if not provided
      experiences: memberData.experiences || [], // Handle experiences as an empty array if not provided
      // uploads: {
      //   photo: memberData.photo || "", // Default to an empty string or actual value as per the file upload
      //   documents: memberData.uploads?.documents || [], // Handle document uploads array
      //   signature: memberData.signature || "", // Default to empty string if signature is not provided
      // },
      paymentDetails: {
        utrNumber: memberData.utrNo || "", // Handle the utrNo field
      },
      membershipDetails: {
        memberid: "", // This will be auto-generated later
        mappliedDate: new Date(), // Set applied date to current date
        status: "pending", // Default membership status
      },
      approvals: {
        headquarters: { status: "pending" },
        statebranch: { status: "pending", approver: null, comments: "" },
        localbranch: { status: "pending", approver: null, comments: "" },
      },
    });

    // Save the new member to the database
    const savedMember = await newMember.save();

    res.status(201).json({
      message: "Member registered successfully.",
      member: {
        _id: savedMember._id,
        firstName: savedMember.firstName,
        lastName: savedMember.lastName,
        gender: savedMember.gender,
        email: savedMember.contact.email,
        mobile: savedMember.contact.mobile,
        address: savedMember.address,
      },
    });
  } catch (error) {
    console.error("Error registering member:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// for users
const loginStatus = asyncHandler(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.json(false);
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.json(false);
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    // Handle token verification error
    console.log("error in backedn at loginStatus", error.message);
    return res.json(false);
  }
});

// const getAllMembers = asyncHandler(async (req, res) => {
//   try {
//     const members = await Member.find();
//     if (members) {
//       res.status(200).json(members);
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

const getAllMembers = asyncHandler(async (req, res) => {
  // member Data for all approved
  try {
    // Fetch members who are approved by all branches
    const members = await Member.find({
      "approvals.headquarters.status": "approved",
      "approvals.statebranch.status": "approved",
      "approvals.localbranch.status": "approved",
    });

    if (members && members.length > 0) {
      res.status(200).json(members);
    } else {
      res.status(404).json({
        message: "No members found who are approved by all branches.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAppliedMembers = asyncHandler(async (req, res) => {
  try {
    // Fetch members who are not yet approved by all branches
    const members = await Member.find({
      $or: [
        { "approvals.headquarters.status": { $ne: "approved" } },
        { "approvals.statebranch.status": { $ne: "approved" } },
        { "approvals.localbranch.status": { $ne: "approved" } },
      ],
    });

    if (members && members.length > 0) {
      res.status(200).json(members);
    } else {
      res.status(404).json({
        message: "No members found who are not approved by all branches.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getMemberData = asyncHandler(async (req, res) => {
  try {
    // Fetch the member by ID from the request parameters
    const member = await Member.findById(req.params.id);

    // If member found, send the member data as response
    if (member) {
      res.status(200).json(member);
      console.log("memberData", member);
    } else {
      // If no member is found with the given ID, return 404
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    // Catch any error that occurs during the database query or processing
    console.error("Error fetching member:", error);
    res
      .status(500)
      .json({ message: "Server Error, unable to fetch member data" });
  }
});

const getFinancialYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based (0 for January, 11 for December)

  let startYear, endYear;

  if (currentMonth >= 4) {
    // April to December, financial year is from current year to next year
    startYear = currentYear;
    endYear = currentYear + 1;
  } else {
    // January to March, financial year is from previous year to current year
    startYear = currentYear - 1;
    endYear = currentYear;
  }

  return `${startYear}-${endYear}`;
};

const generateMemberId = async (member) => {
  const stateBranch = member.membershipDetails.stateBranchCode;
  const stateBranchCount = member.membershipDetails.stateBranchCount;
  const localBranchCode = member.membershipDetails.localBranchCode;
  const localBranchCount = member.membershipDetails.localBranchCount;

  // Get the financial year
  const financialYear = getFinancialYear();

  // Get the year from membership approval date
  const membershipApprovedYear = member.membershipDetails.membershipDate
    ? new Date(member.membershipDetails.membershipDate).getFullYear()
    : new Date().getFullYear();

  // Construct the member ID
  const memberId = `${stateBranch}/${stateBranchCount}/${localBranchCode}/${localBranchCount}/${membershipApprovedYear}-${financialYear}/L`;

  return memberId;
};

// const updateApprovalStatus = asyncHandler(async (req, res) => {
//   const { memberId, branchType, status, approverId, comments } = req.body;

//   if (!['headquarters', 'statebranch', 'localbranch'].includes(branchType)) {
//     return res.status(400).json({ message: "Invalid branch type" });
//   }

//   const member = await Member.findById(memberId);
//   if (!member) {
//     return res.status(404).json({ message: "Member not found" });
//   }

//   // Update the specific approval status
//   if (branchType === 'headquarters') {
//     member.approvals.headquarters.status = status;
//   } else if (branchType === 'statebranch') {
//     member.approvals.statebranch.status = status;
//     member.approvals.statebranch.approver = approverId;
//     member.approvals.statebranch.comments = comments;
//   } else if (branchType === 'localbranch') {
//     member.approvals.localbranch.status = status;
//     member.approvals.localbranch.approver = approverId;
//     member.approvals.localbranch.comments = comments;
//   }

//   // Save the changes to the member
//   await member.save();

//   // Check if all approvals are done
//   if (
//     member.approvals.headquarters.status === 'approved' &&
//     member.approvals.statebranch.status === 'approved' &&
//     member.approvals.localbranch.status === 'approved'
//   ) {
//     // All approvals are done, generate the member ID
//     const memberId = await generateMemberId(member);

//     // Update the member document with the generated member ID
//     member.membershipDetails.memberid = memberId;
//     await member.save();

//     res.status(200).json({
//       message: "All approvals done and Member ID generated.",
//       memberId: memberId,
//       member: member,
//     });
//   } else {
//     res.status(200).json({ message: "Waiting for all approvals." });
//   }
// });

// const updateApprovalStatus = async (req, res) => {
//   try {
//     const { status, approverId } = req.body;

//     // Get the logged-in user's role/branch type (this depends on your authentication system)
//     const user = req.user; // Assuming the user is authenticated and their data is in req.user

//     // Find the member by ID
//     const member = await Member.findById(memberId);

//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     let approvalType;
//     if (user.role === "statebranch") {
//       approvalType = "statebranch";
//     } else if (user.role === "localbranch") {
//       approvalType = "localbranch";
//     } else {
//       return res.status(400).json({ message: "Unknown branch type" });
//     }

//     // Based on the approvalType, update the appropriate approval status
//     if (approvalType === "statebranch") {
//       member.approvals.statebranch.status = status;
//       member.approvals.statebranch.approver = approverId;
//     } else if (approvalType === "localbranch") {
//       member.approvals.localbranch.status = status;
//       member.approvals.localbranch.approver = approverId;
//     }

//     // If all approvals are approved, generate the member ID
//     if (
//       member.approvals.headquarters.status === "approved" &&
//       member.approvals.statebranch.status === "approved" &&
//       member.approvals.localbranch.status === "approved"
//     ) {
//       member.membershipDetails.memberid = generateMemberId(member);
//     }

//     await member.save();
//     res.status(200).json({ message: "Approval updated successfully", member });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

const updateApprovalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Get the logged-in user's information from the session (or token)
    const user = req.user; // Assuming the user is authenticated, and their data is in req.user

    // Get the memberId from the URL parameters (assuming you pass the memberId in the route)
    const { memberId } = req.params; // e.g., /approve/:memberId

    // Find the member by ID (use _id for querying)
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    let approvalType;
    let approverId = null;

    // Determine the approval type based on the user's role
    if (user.role === "statebranch") {
      approvalType = "statebranch";
      approverId = user._id; // For statebranch, we need approverId
    } else if (user.role === "localbranch") {
      approvalType = "localbranch";
      approverId = user._id; // For localbranch, we need approverId
    } else if (user.role === "headquarters") {
      approvalType = "headquarters";
      // No approverId for headquarters, so it stays null
    } else {
      return res.status(400).json({ message: "Unknown branch type" });
    }

    // Based on the approvalType, update the corresponding approval status
    if (approvalType === "statebranch") {
      member.approvals.statebranch.status = status;
      member.approvals.statebranch.approver = approverId;
    } else if (approvalType === "localbranch") {
      member.approvals.localbranch.status = status;
      member.approvals.localbranch.approver = approverId;
    } else if (approvalType === "headquarters") {
      member.approvals.headquarters.status = status;
      // No approverId needed for headquarters
    }

    // If all approvals are approved, generate the member ID
    if (
      member.approvals.headquarters.status === "approved" &&
      member.approvals.statebranch.status === "approved" &&
      member.approvals.localbranch.status === "approved"
    ) {
      member.membershipDetails.memberid = generateMemberId(member);
    }

    // Save the updated member record
    await member.save();

    // Return the updated member information
    res.status(200).json({ message: "Approval updated successfully", member });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export {
  registerMember,
  loginStatus,
  getAllMembers,
  getMemberData,
  getAppliedMembers,
  updateApprovalStatus,
};
