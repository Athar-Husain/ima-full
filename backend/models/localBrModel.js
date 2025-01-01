import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const localbranchSchema = mongoose.Schema(
  {
    localuserId: {
      type: String,
      // required: [true, "Please add a Name"],
      // unique: true,
      trim: true,
    },
    localbranchName: {
      type: String,
      // required: [true, "Please add a Name"],
      trim: true,
    },
    localbranchCode: {
      type: String,
      // required: [true, "Please add a Name"],
      trim: true,
    },
    email: {
      type: String,
      default: "no-email@domain.com",
      //   // required: [true, "Please add an email"],
      //   // unique: true,
      //   // trim: true,
      //   // match: [
      //   //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //   //   "Please enter a valid email",
      //   // ],
    },
    password: {
      type: String,
      trim: true,
      // required: [true, "Please add a Password"],
    },
    phone: {
      type: String,
      trim: true,
    },
    branchType: {
      type: String,
      // enum: ['state', 'local'],
      default: "localbranch",
    },
    stateBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "statebranch",
    },
    //  ember ID storing in the local Chapter
    members: [
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

// const localbranch = mongoose.model("localbranch", localbranchSchema);
// module.exports = localbranch;

const localbranch = mongoose.model("localbranch", localbranchSchema);

export default localbranch;
