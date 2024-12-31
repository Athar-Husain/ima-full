import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
      enum: ["Male", "Female", "Unknown"],
      default: "Unknown",
    },
    fatherOrHusbandName: {
      type: String,
      // required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    specialtyCode: {
      type: Number,
      // required: true,
    },
    isExpired: {
      type: Boolean,
      // default: false,
      // required: true,
    },
    checked: {
      type: Boolean,
      // default: false,
      // required: true,
    },
    address: {
      street: {
        type: String,
        // required: true,
        trim: true,
      },
      city: {
        type: String,
        // required: true,
        trim: true,
      },
      state: {
        type: String,
        // required: true,
        trim: true,
      },
      pinCode: {
        type: String,
        // required: true,
        trim: true,
        match: [/^\d{6}$/, "Please enter a valid 6-digit pin code"], // Validation for Indian pin codes
      },
      // assress1: {
      assress1: {
        type: String,
        // required: true,
        trim: true,
      },
      assress2: {
        type: String,
        // required: true,
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
        // required: true,
        trim: true,
      },
      email: {
        type: String,
        // required: [true, "Please add an Email"],
        // unique: [true, "Email is already in use"],
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
        // required: true,
        trim: true,
      },
    },
    qualifications: [
      {
        degree: {
          type: String,
          // required: true,
          trim: true,
        },
        university: {
          type: String,
          // required: true,
          trim: true,
        },
        year: {
          type: String,
          // required: true,
          trim: true,
        },
      },
    ],
    experiences: [
      {
        designation: {
          type: String,
          // required: true,
          trim: true,
        },
        institution: {
          type: String,
          // required: true,
          trim: true,
        },
        period: {
          type: String,
          // required: true,
          trim: true,
        },
      },
    ],
    uploads: {
      photo: {
        type: String,
        // required: true,
      },
      documents: [
        {
          type: String,
          // required: true,
        },
      ],
      signature: {
        type: String,
        // required: true,
      },
    },
    membershipDetails: {
      // member id auto generated
      memberid: {
        type: String,
        trim: true,
      },
      // member applied date
      mappliedDate: {
        type: Date,
        // required: true,
      },
      // approved Date
      membershipDate: {
        type: Date,

        // required: true,
      },
      membershipYear: {
        type: Number,

        // required: true,
      },

      // member recipt Number
      mshiprecpt: {
        type: Number,
        // required: true,
      },

      stateBranchName: {
        type: String,
        // required: true,
      },
      stateBranchCode: {
        type: String,
        // required: true,
      },
      stateBranchCount: {
        type: Number,
        // required: true,
      },
      localBranchName: {
        type: String,
        // required: true,
      },
      localBranchCode: {
        type: Number,
        // required: true,
      },
      localBranchCount: {
        type: Number,
        // required: true,
      },
      // life member or fellow Associate Member
      lmoram: {
        type: String,
        // required: true,
      },
      fellowDetails: {
        isFellow: {
          type: Boolean,
          default: false,
          // required: true,
        },
        fellowYear: {
          type: Date,
          // required: function () {
          //   return this.fellowDetails.isFellow; // Require fellowYear only if isFellow is true
          // },
        },
      },
      status: {
        type: String,
        // enum: ["active", "inactive", "suspended"],
        // required: true,
      },
    },
    approvals: {
      headquarters: {
        status: {
          type: String,
          // enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
      statebranch: {
        status: {
          type: String,
          // enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        approver: { type: mongoose.Schema.Types.ObjectId, ref: "statebranch" },
        comments: String,
      },
      localbranch: {
        status: {
          type: String,
          // enum: ["pending", "approved", "rejected"],
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

const Member = mongoose.model("member", memberSchema);

export default Member;
