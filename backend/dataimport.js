import fs from "fs";
import csv from "csv-parser";
// import mongoose0 from "mongoose";
import mongoose from "mongoose";
import stateBranch from "./models/stateBrModel.js";
import localBranch from "./models/localBrModel.js";
import Member from "./models/memberModel.js";

const filePath = "./datatest4.csv";

mongoose
  .connect("mongodb://localhost:27017/v")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const dataimport = async () => {
  try {
    const stream = fs.createReadStream(filePath);
    const records = [];

    stream.pipe(csv()).on("data", async (row) => {
      try {
        let mappliedDate = "";
        let membershipDate = "";

        // Handle missing firstName and lastName gracefully
        const firstName = row?.firstName || ""; // Default to 'Unknown' if not found
        const lastName = row?.lastName || "";

        if (row["membershipDate"] !== 0) {
          const datePart = row["membershipDate"].split("-");

          if (datePart.length === 3) {
            const formattedDate = `${datePart[2]}-${datePart[1]}-${datePart[0]}}T23:59:59.999Z`;
            mappliedDate = new Date(formattedDate);
          }
        }
        if (row["membershipDate"] !== 0) {
          const datePart = row["membershipDate"].split("-");
          if (datePart.length === 3) {
            console.log("datePart", datePart);
            // Convert DD-MM-YYYY to YYYY-MM-DD
            const formattedDat = `${datePart[2]}-${datePart[1]}-${datePart[0]}T23:59:59.999Z`;
            membershipDate = new Date(formattedDat); // Create a full Date object
          }
        }

        let statebranch = await stateBranch.findOne({
          stateName: row["stateBranchName"],
          stateCode: row["stateBranchCode"],
        });
        if (!statebranch) {
          statebranch = new stateBranch({
            stateuserid: row["stateBranchCode"] + "@" + "ima-ams.com",
            stateName: row["stateBranchName"],
            stateCode: row["stateBranchCode"],
            password: "!!11AAaa",
            branchType: "statebranch",
          });
          await statebranch.save();
        }

        let localbranch = await localBranch.findOne({
          localbranchName: row["localBranchName"],
          //   localbranchCode: row["localbranchCode"],
        });
        if (!localbranch) {
          localbranch = new localBranch({
            // localuserId:
            //   row["localBranchName"] +
            //   row["localBranchCode"] +
            //   "@" +
            //   "ima-ams.com",
            localbranchName: row["localBranchName"],
            localbranchCode: row["localBranchCode"],
            password: "!!11AAaa",
            branchType: "localbranch",
          });
          await localbranch.save();
        }

        // console.log("firstName in console", row["firstName"]);
        const member = new Member({
          firstName: firstName,
          //   firstName: row["firstName"] ? row["firstName"] : "",
          //   lastName: row["lastName"] ? row["lastName"] : "",
          lastName: lastName,
          isExpired: row["isExpired"] === "TRUE",
          checked: row["checked"] === "TRUE",
          specialty: row["specialty"],
          specialtyCode: parseInt(row["specialtyCode"])
            ? row["specialtyCode"]
            : "",
          contact: {
            landline: row["landline"] ? row["landline"] : "",
            mobile: row["mobile"] ? row["mobile"] : "",
            email: row["email"] ? row["email"] : "",
          },
          address: {
            street: row["street"] || "unknown",
            city: row["city"] || "unknown",
            state: row["stateBranchName"],
            address1: row["address1"] || "unknown",
            address2: row["address2"] || "unknown",
          },
          membershipDetails: {
            memberid: row["memberid"],
            mappliedDate: mappliedDate, // Use the helper function here
            membershipDate: membershipDate, // Use the helper function here
            membershipYear: row["membershipYear"], // Use the helper function here
            mshiprecpt: row["mshiprecpt"] || 0,
            stateBranchName: row["stateBranchName"],
            stateBranchCode: row["stateBranchCode"],
            stateBranchCount: row["stateBranchCount"],
            localBranchName: row["localBranchName"]
              ? row["localBranchName"]
              : "",
            status: row["status"] ? row["status"] : "active",
            localBranchCode: row["localBranchCode"] || "N/A",
            localBranchCount: parseInt(row["localBranchCount"]) || 0,
            lmoram: row["lmoram"] || "N/A",
            fellowDetails: {
              isFellow: row["isFellow"] === "TRUE",
              fellowYear:
                row["fellowYear"] != 0 ? new Date(row["fellowYear"]) : null, // Convert to Date
            },
          },
          approvals: {
            headquarters: {
              status: "approved",
            },
            statebranch: {
              status: "approved",
            },
            localbranch: {
              status: "approved",
            },
          },
        });
        await member.save();

        statebranch.mobjid.push(member._id);
        await statebranch.save();

        localbranch.mobjid.push(member._id);
        await localbranch.save();

        // Step 7: Update localbranch in statebranch
        statebranch.localbranches.push(localbranch._id);
        await statebranch.save();

        // console.log(`Imported Member : ${firstName} ${lastName}`);
        console.log(`${records.length}  Imported Member : `);
      } catch (error) {
        console.error(
          `Error Importing data for ${row.memberid} : ${error.message} `
        );
      }
    });
  } catch (error) {
    console.error(
      `Error Importing data for ${row.memberid} : ${error.message} `
    );
  }
};

dataimport();
