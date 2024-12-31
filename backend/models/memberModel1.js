const mongoose = require("mongoose");

const memberApplicationSchema = new mongoose.Schema(
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
      enum: ["Male", "Female", "Other"],
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
        required: true,
        trim: true,
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
  },
  { timestamps: true }
);

const MemberApplication = mongoose.model(
  "MemberApplication",
  memberApplicationSchema
);

module.exports = MemberApplication;
