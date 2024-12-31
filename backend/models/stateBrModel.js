import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const statebranchSchema = mongoose.Schema(
  {
    stateuserid: {
      type: String,
      // required: [true, "Please add a UserId"],
      trim: true,
    },
    stateName: {
      type: String,
      // required: [true, "Please add a State Name"],
      trim: true,
    },
    stateCode: {
      type: String,
      // required: [true, "Please add a state Code"],
      trim: true,
      // match: [/^[A-Z]{2}$/, "State code must be exactly 2 uppercase letters"],
    },
    email: {
      type: String,
      // required: [true, "Please add an email"],
      // unique: [true, "This Email is already in Use"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      // required: [true, "Please add a Password"],
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
    },
    branchType: {
      type: String,
      // enum: ['state', 'local'],
      default: "statebranch",
    },
    localbranches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "localbranch",
      },
    ],
    mobjid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "member",
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Hash password before saving
statebranchSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const statebranch = mongoose.model("statebranch", statebranchSchema);

export default statebranch;
