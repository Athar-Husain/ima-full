import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import StateBranch from "./models/stateBrModel.js"; // Import StateBranch model
import LocalBranch from "./models/localBrModel2.js"; // Import LocalBranch model
import Member from "./models/memberModel.js"; // Import Member model

const csvFilePath = "./datatest4.csv";

mongoose
  .connect("mongodb://localhost:27017/yourdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB yourdb hohohoh");
    importdata2(); // Start the data import process
  })
  .catch((err) => console.log(`Database connection error: ${err}`));

const importdata2 = async () => {
  // Path to your CSV file
  const data = [];

  console.log("csvfilepath", csvFilePath);

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
          email,
          mobile,
          landline,
        } = row;

        try {
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
          // let localbranch = await LocalBranch.findOne({ localBranchName });
          // if (!localbranch) {
          //   localbranch = new LocalBranch({
          //     localuserId: localBranchCode + "@" + "ima-arguments.com",
          //     localBranchName,
          //     localBranchCode,
          //     statebranch: statebranch._id, // Reference to statebranch
          //     // email,
          //     password: "!!11AAaa", // example password
          //     // phone,
          //     branchType: "localbranch",
          //   });
          //   await localbranch.save();
          // }

          // Step 2: Check or create localbranch (no email included)
          let localbranch = await LocalBranch.findOne({
            localBranchName,
          });
          if (!localbranch) {
            localbranch = new LocalBranch({
              localuserId: localBranchCode + "@" + "ima-arguments.com",
              localBranchName,
              localBranchCode,
              statebranch: statebranch._id,
              password: "!!11AAaa", // example password
              branchType: "localbranch",
            });
            await localbranch.save();
          }

          // let mappliedDate = "";
          // let membershipDate = "";

          if (mappliedDate !== 0) {
            const dateParts = row["mappliedDate"].split("-");
            if (dateParts.length === 3) {
              // Convert DD-MM-YYYY to YYYY-MM-DD
              const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T23:59:59.999Z`;
              mappliedDate = new Date(formattedDate); // Create a full Date object
            }
          }

          if (membershipDate !== 0) {
            const datePart = row["membershipDate"].split("-");
            if (datePart.length === 3) {
              console.log("datePart", datePart);
              // Convert DD-MM-YYYY to YYYY-MM-DD
              const formattedDat = `${datePart[2]}-${datePart[1]}-${datePart[0]}T23:59:59.999Z`;
              membershipDate = new Date(formattedDat); // Create a full Date object
            }
          }

          // Step 3: Create member
          // const member = new Member({
          //   firstName,
          //   lastName,
          //   street,
          //   city,
          //   isExpired: isExpired === "TRUE",
          //   isFellow: isFellow === "TRUE",
          //   fellowYear: fellowYear,
          //   specialtyCode: parseInt(specialtyCode),
          //   specialty,
          //   checked: checked === "TRUE",
          //   mappliedDate: new Date(mappliedDate),
          //   mshiprecpt,
          //   membershipDate: new Date(membershipDate),
          //   email,
          //   contact: { mobile, landline },
          //   membershipDetails: {
          //     memberid,
          //     stateBranchName: stateBranchName,
          //     localBranchName: localBranchName,
          //     lmoram,
          //   },
          // });

          const member = new Member({
            firstName: row["firstName"],
            lastName: row["lastName"],
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
              street: row["street"] || "Unknown",
              city: row["city"] || "Unknown",
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
          console.error(`Error importing data for ${row.memberid}: ${err}`);
        }
      }
    });
};

importdata2();
