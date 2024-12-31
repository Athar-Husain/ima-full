import mongoose from "mongoose";
import csv from "csv-parser";
import fs from "fs";
import Member from "./models/memberModel.js"; // Import Member model
import StateBranch from "./models/stateBrModel.js"; // Import StateBranch model
import LocalBranch from "./models/localBrModel.js"; // Import LocalBranch model

// MongoDB connection string (replace with your actual MongoDB URI)
const mongoURI = "mongodb://localhost:27017/test8"; // Or use MongoDB Atlas URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully", mongoURI))
  .catch((err) => console.error("MongoDB connection error:", err));

// Path to the CSV file
const csvFilePath = "./test4.csv"; // Update this with the actual path to your CSV file

// Utility function to parse dates from CSV (DD-MM-YYYY format)
function parseDate(dateString) {
  if (dateString && dateString !== "0" && dateString !== "") {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      // Convert DD-MM-YYYY to YYYY-MM-DD
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T23:59:59.999Z`;
      return new Date(formattedDate); // Convert to Date object
    } else {
      console.error(`Invalid date format: ${dateString}`);
    }
  }
  return null; // Return null if the date is invalid or empty
}

async function importCSV() {
  const results = [];

  // Read CSV file and parse the rows
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      results.push(row); // Push each row into the results array
    })
    .on("end", async () => {
      // Process each row
      for (const row of results) {
        try {
          // Look up or create StateBranch
          let stateBranch = await StateBranch.findOne({
            stateName: row.stateBranchName,
          });

          if (!stateBranch) {
            stateBranch = new StateBranch({
              stateName: row.stateBranchName,
              stateCode: row.stateBranchCode,
              members: [], // Ensure members is initialized as an empty array
              localbranches: [], // Ensure localbranches is initialized as an empty array
            });
            await stateBranch.save();
          }

          // Look up or create LocalBranch
          let localBranch = await LocalBranch.findOne({
            localbranchName: row.localBranchName,
            stateBranch: stateBranch._id, // Check if localBranch already exists for this specific stateBranch
          });

          if (!localBranch) {
            localBranch = new LocalBranch({
              localbranchName: row.localBranchName,
              localbranchCode: row.localBranchCode,
              members: [], // Ensure members is initialized as an empty array
            });
            await localBranch.save();
          }

          // Handle dates: mappliedDate and membershipDate
          let mappliedDate = parseDate(row.mappliedDate); // Parse mappliedDate
          let membershipDate = parseDate(row.membershipDate); // Parse membershipDate

          // Create the Member object
          const member = new Member({
            firstName: row.firstName,
            lastName: row.lastName,
            isExpired: row.isExpired === "TRUE",
            isFellow: row.isFellow === "TRUE",
            fellowYear: row.fellowYear ? new Date(row.fellowYear, 0) : null, // Handling fellowYear properly
            specialtyCode: row.specialtyCode,
            specialty: row.specialty,
            checked: row.checked === "TRUE",
            membershipDetails: {
              memberid: row.memberid,
              mappliedDate: mappliedDate, // Set parsed mappliedDate
              membershipDate: membershipDate, // Set parsed membershipDate
              membershipYear: row.membershipYear,
              mshiprecpt: row.mshiprecpt,
              stateBranchName: row.stateBranchName,
              stateBranchCode: row.stateBranchCode,
              stateBranchCount: row.stateBranchCount,
              localBranchName: row.localBranchName,
              localBranchCode: row.localBranchCode,
              localBranchCount: row.localBranchCount,
              lmoram: row.lmoram,
              status: row.status,
              fellowDetails: {
                isFellow: row.isFellow === "TRUE",
                fellowYear: row.fellowYear != 0 ? new Date(row.fellowYear) : "", // Only set if isFellow is true
              },
            },
            contact: {
              email: row.email,
              mobile: row.mobile,
              landline: row.landline,
            },
            address: {
              street: row.street || "",
              city: row.city || "",
              state: row.state || "",
              address1: row.address1 || "",
              address2: row.address2 || "",
            },
            approvals: {
              headquarters: {
                status: "approved",
              },
              statebranch: {
                status: "approved",
                approver: stateBranch._id,
              },
              localbranch: {
                status: "approved",
                approver: localBranch._id,
              },
            },
          });

          await member.save(); // Save the new member

          // Ensure members is an array before using `indexOf`
          localBranch.members = localBranch.members || []; // Initialize if undefined
          if (!localBranch.members.includes(member._id)) {
            localBranch.members.push(member._id); // Only push if not already added
            await localBranch.save();
          }

          // Ensure that the local branch is correctly linked to the state branch
          if (
            !localBranch.stateBranch ||
            !localBranch.stateBranch.equals(stateBranch._id)
          ) {
            localBranch.stateBranch = stateBranch._id; // Link localBranch to the correct stateBranch
            await localBranch.save(); // Save the updated localBranch
          }

          // Ensure members is an array before using `indexOf`
          stateBranch.members = stateBranch.members || []; // Initialize if undefined
          if (!stateBranch.members.includes(member._id)) {
            stateBranch.members.push(member._id); // Only push if not already added
            stateBranch.memberCount = stateBranch.members.length; // Update the member count
            await stateBranch.save();
          }

          // Ensure LocalBranch is linked to StateBranch
          if (!stateBranch.localbranches.includes(localBranch._id)) {
            stateBranch.localbranches.push(localBranch._id);
            await stateBranch.save();
          }

          console.log(`Imported Member: ${row.firstName} ${row.lastName}`);
        } catch (error) {
          console.error("Error processing row:", row, error);
        }
      }

      console.log("CSV import completed.");
    });
}

importCSV().catch((error) => console.error("Error importing data:", error));
