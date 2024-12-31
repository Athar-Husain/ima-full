const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fatherOrHusbandName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
    },
    contact: {
      landline: {
        type: String,
        trim: true,
      },
      mobile: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please add an Email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid Email",
        ],
      },
    },
    paymentDetails: {
      utrNumber: {
        type: String,
        required: true,
        trim: true,
      },
    },
    qualifications: [
      {
        degree: { type: String, required: true, trim: true },
        university: { type: String, required: true, trim: true },
        year: { type: String, required: true, trim: true },
      },
    ],
    experiences: [
      {
        designation: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
        period: { type: String, required: true, trim: true },
      },
    ],
    uploads: {
      photo: {
        type: String,
        required: true,
      },
      documents: [
        {
          type: String,
          required: true,
        },
      ],
      signature: {
        type: String,
        required: true,
      },
    },
    membershipDetails: {
      stateBranch: {
        type: String,
        required: true,
      },
      stateBranchCount: {
        type: String,
        required: true,
      },
      localBranchCode: {
        type: String,
        required: true,
      },
      localBranchCount: {
        type: Number,
        required: true,
      },
      membershipDate: {
        type: Date,
        required: true,
      },
      expired: {
        type: Boolean,
        default: false,
      },
      fellow: {
        type: Boolean,
        default: false,
        required: true,
      },
      fellowYear: {
        type: Number,
        required: true,
      },

      moratorium: {
        type: String,
        required: true,
      },
      specialty: {
        type: String,
        required: true,
      },
      specialtyCode: {
        type: Number,
        required: true,
      },
      stateName: {
        type: String,
        required: true,
      },
      stateCode: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    approvals: {
      headquarters: {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
      statebranch: {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        approver: { type: mongoose.Schema.Types.ObjectId, ref: "statebranch" },
        comments: String,
      },
      localbranch: {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        approver: { type: mongoose.Schema.Types.ObjectId, ref: "localbranch" },
        comments: String,
      },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
