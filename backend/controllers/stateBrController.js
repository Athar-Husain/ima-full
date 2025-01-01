// const asyncHandler = require("express-async-handler");
// const StateBranch = require("../models/stateBranch"); // Adjust the path if necessary
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

import asyncHandler from "express-async-handler";
import StateBranch from "../models/stateBrModel.js";
import LocalBranch from "../models/localBrModel.js";
// import stateBrModel from "../models/stateBrModel.js";
import jwt from "jsonwebtoken";
// import Token from "../models/tokenModel.js";
import bcrypt from "bcryptjs";

// Controller to add state branch
const addStateBranch = asyncHandler(async (req, res) => {
  try {
    // console.log(
    //   "console for req bosy in addStateBranch in stbrcontroller",
    //   req.body
    // );
    const { stateuserid, stateName, phoneNumber, stateCode, email, password } =
      req.body;
    // Check if all required fields are provided
    if (
      !stateuserid ||
      !stateName ||
      !stateCode ||
      !email ||
      !phoneNumber ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the state branch already exists by stateCode or email
    // const stateBranchExists = await StateBranch.findOne({
    //   $or: [{ stateCode }, { email }],
    // });
    const stateBranchExists = await StateBranch.findOne({ stateCode });
    if (stateBranchExists) {
      return res.status(400).json({
        error: "State branch with this state code exists.",
      });
    }

    const emaiExists = await StateBranch.findOne({ email });

    if (emaiExists) {
      return res.status(400).json({
        error: "email already exists.",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new state branch with the contact object destructured
    const branch = await StateBranch.create({
      stateuserid,
      stateName,
      stateCode,
      email,
      password: hashedPassword,
      contact: {
        landline: req.body.landline, // Assuming landline is optional
        mobile: phoneNumber,
      },
    });

    // No need to save again, create already persists the data

    // Return the response
    res.status(201).json({
      message: "State Branch added successfully.",
      stateBranch: {
        stateuserId: branch.stateuserid,
        stateName: branch.stateName,
        stateCode: branch.stateCode,
        email: branch.email,
        contact: {
          mobile: branch.phoneNumber,
        },
      },
    });
    // console.log("db created ");
  } catch (error) {
    console.error("Error adding state branch:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

const loginStateBranch = asyncHandler(async (req, res) => {
  try {
    const { stateuserId, password } = req.body;

    // Validate the required fields
    if (!stateuserId || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both user ID and password." });
    }

    // Check if state branch exists with the given userId
    const stateBranch = await StateBranch.findOne({ stateuserId });
    if (!stateBranch) {
      return res
        .status(400)
        .json({ error: "State branch with this user ID does not exist." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, stateBranch.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = generateToken(stateBranch._id);

    if (stateBranch && isMatch) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });
    }

    // Generate a JWT token (you can adjust the payload and expiration as needed)
    // const token = jwt.sign(
    //   { stateuserId: stateBranch.stateuserId, email: stateBranch.email },
    //   process.env.JWT_SECRET, // Use an environment variable for the secret key
    //   { expiresIn: "1h" }
    // );

    // Respond with the token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      stateBranch: {
        stateuserId: stateBranch.stateuserId,
        stateName: stateBranch.stateName,
        stateCode: stateCode.stateCode,
        email: stateBranch.email,
        contact: stateBranch.contact,
      },
    });
  } catch (error) {
    console.error("Error logging in state branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

const updateStateBranch = asyncHandler(async (req, res) => {
  try {
    const { stateuserId } = req.params; // Get the stateuserId from URL params
    const updates = req.body; // Get the fields to update from the request body

    // Fields that can't be updated
    const forbiddenFields = ["stateuserId", "stateName"];

    // Check for forbidden fields in the update request
    for (const field of forbiddenFields) {
      if (updates[field]) {
        return res.status(400).json({ error: `${field} cannot be updated.` });
      }
    }

    // Find the StateBranch by stateuserId
    const stateBranch = await StateBranch.findOne({ stateuserId });
    if (!stateBranch) {
      return res.status(404).json({ error: "State branch not found." });
    }

    // Update the fields
    Object.keys(updates).forEach((key) => {
      stateBranch[key] = updates[key];
    });

    // Save the updated StateBranch
    await stateBranch.save();

    res.status(200).json({
      message: "State branch updated successfully.",
      stateBranch,
    });
  } catch (error) {
    console.error("Error updating state branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Controller to get all state branches
// const getAllStateBranches = asyncHandler(async (req, res) => {
//   try {
//     // Fetch all state branches from the database
//     const stateBranches = await StateBranch.find();

//     // If no state branches found
//     if (stateBranches.length === 0) {
//       return res.status(404).json({ message: "No state branches found." });
//     }

//     // Return the list of state branches
//     res.status(200).json({
//       // message: "State branches fetched successfully.",
//       stateBranches,
//     });
//   } catch (error) {
//     console.error("Error fetching state branches:", error);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

const getAllStateBranches = asyncHandler(async (req, res) => {
  try {
    const stateBranches = await StateBranch.find().populate(
      "localbranches",
      "localbranchName"
    );
    if (stateBranches) {
      res.status(200).json(stateBranches);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Controller to get a single state branch by stateuserId
const getStateBranch = asyncHandler(async (req, res) => {
  try {
    const { stateuserId } = req.params; // Get the stateuserId from URL params

    // Find the state branch with the provided stateuserId
    const stateBranch = await StateBranch.findOne({ stateuserId });

    // If the state branch doesn't exist
    if (!stateBranch) {
      return res.status(404).json({ message: "State branch not found." });
    }

    // Return the state branch details
    res.status(200).json({
      message: "State branch details fetched successfully.",
      stateBranch,
    });
  } catch (error) {
    console.error("Error fetching state branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

const loginStatusState = asyncHandler(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.json(false);
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.json(false);
  }

  try {
    // Verify token for state branch
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    // Handle token verification error
    console.log(
      "Error in backend at loginStatus (State Branch):",
      error.message
    );
    return res.json(false);
  }
});

// module.exports = {
//   addStateBranch,
//   getStateBranch,
//   getStateBranches,
//   loginStateBranch,
//   updateStateBranch,
//   loginStatusState,
// };
export { addStateBranch, getAllStateBranches };
