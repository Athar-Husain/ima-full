import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import StateBranch from "./models/stateBrModel.js"; // Import StateBranch model
import LocalBranch from "./models/localBrModel.js"; // Import LocalBranch model
import Member from "./models/memberModel.js"; // Import Member model

async function importDataNewStrategy() {
  const csvFilePath = "./datatest4.csv"; // Path to your CSV file
  const data = [];

  // Read and parse the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row); // Collect data into an array
    })
    .on("end", async () => {
      for (let row of data) {
        const {
          stateBranchName,
          localBranchName,
          firstName,
          lastName,
          street,
          city,
          isExpired,
          isFellow,
          fellowYear,
          stateBranchCode,
          stateBranchCount,
          localBranchCode,
          localBranchCount,
          membershipDate,
          lmoram,
          memberid,
          specialtyCode,
          specialty,
          checked,
          mappliedDate,
          mshiprecpt,
          email, // Take note of email field
          mobile,
          landline,
        } = row;

        try {
          // If email is null, set it as an empty string
          const emailToSave = email ? email.trim() : "";

          // Step 1: Check or create statebranch
          let statebranch = await StateBranch.findOne({
            stateName: stateBranchName,
            stateCode: stateBranchCode,
          });
          if (!statebranch) {
            statebranch = new StateBranch({
              stateuserid: stateBranchCode + "@" + "ima-arguments.com",
              stateName: stateBranchName,
              stateCode: stateBranchCode,
              password: "!!11AAaa", // example password
              contact: { mobile },
              branchType: "statebranch",
            });
            await statebranch.save();
          }

          // Step 2: Check or create localbranch
          let localbranch = await LocalBranch.findOne({ localBranchName });
          if (!localbranch) {
            localbranch = new LocalBranch({
              localuserId: localBranchCode + "@" + "ima-arguments.com",
              localBranchName,
              localBranchCode,
              statebranch: statebranch._id, // Reference to statebranch
              password: "!!11AAaa", // example password
              branchType: "localbranch",
            });
            await localbranch.save();
          }

          // Handle mappliedDate
          let formattedMappliedDate = null;
          if (mappliedDate !== "0" && mappliedDate) {
            const dateParts = mappliedDate.split("-");
            if (dateParts.length === 3) {
              formattedMappliedDate = new Date(
                `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
              );
            }
          }

          // Handle membershipDate
          let formattedMembershipDate = null;
          if (membershipDate !== "0" && membershipDate) {
            const dateParts = membershipDate.split("-");
            if (dateParts.length === 3) {
              formattedMembershipDate = new Date(
                `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
              );
            }
          }

          // Step 3: Create member
          const member = new Member({
            firstName,
            lastName,
            isExpired: isExpired === "TRUE",
            checked: checked === "TRUE",
            specialty,
            specialtyCode: parseInt(specialtyCode) || "",
            contact: {
              landline: landline || "",
              mobile: mobile || "",
              email: emailToSave, // Save email as empty string if it was null
            },
            address: {
              street: street || "Unknown",
              city: city || "Unknown",
              state: stateBranchName,
              address1: row["address1"] || "unknown",
              address2: row["address2"] || "unknown",
            },
            membershipDetails: {
              memberid,
              mappliedDate: formattedMappliedDate,
              membershipDate: formattedMembershipDate,
              membershipYear: row["membershipYear"],
              mshiprecpt: mshiprecpt || 0,
              stateBranchName,
              stateBranchCode,
              stateBranchCount,
              localBranchName,
              status: row["status"] || "active",
              localBranchCode: localBranchCode || "N/A",
              localBranchCount: parseInt(localBranchCount) || 0,
              lmoram: row["lmoram"] || "N/A",
              fellowDetails: {
                isFellow: row["isFellow"] === "TRUE",
                fellowYear:
                  row["fellowYear"] != 0 ? new Date(row["fellowYear"]) : null,
              },
            },
            approvals: {
              headquarters: { status: "approved" },
              statebranch: { status: "approved" },
              localbranch: { status: "approved" },
            },
          });

          // Step 4: Save the member
          await member.save();

          // Step 5: Update statebranch with member ObjectId
          statebranch.mobjid.push(member._id);
          await statebranch.save();

          // Step 6: Update localbranch with member ObjectId
          localbranch.mobjid.push(member._id);
          await localbranch.save();

          // Step 7: Update localbranch in statebranch
          statebranch.localbranches.push(localbranch._id);
          await statebranch.save();

          console.log(`Imported member: ${firstName} ${lastName}`);
        } catch (err) {
          console.error(
            `Error importing data for ${row.memberid}: ${err.message}`
          );
        }
      }
    });
}

mongoose
  .connect("mongodb://localhost:27017/yourdb")
  .then(() => {
    console.log("Connected to MongoDB yourdb");
    importDataNewStrategy(); // Start the data import process
  })
  .catch((err) => console.log(`Database connection error: ${err}`));
