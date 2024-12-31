import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Member from "./models/memberModel.js";
// import moment from "moment"; // To parse dates properly

const filePath = "./datatest4.csv";

mongoose
  // .connect("mongodb://localhost:27017/technosoft")
  .connect("mongodb://localhost:27017/prev")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const importData = async () => {
  try {
    const stream = fs.createReadStream(filePath);
    const records = [];

    stream
      .pipe(csv())
      .on("data", async (row) => {
        try {
          // Skip rows with missing required fields
          // if (!row["firstName"] || !row["lastName"] || !row["city"]) {
          //   console.warn(
          //     `Skipping record due to missing fields: ${JSON.stringify(row)}`
          //   );
          //   return;
          // }
          let mappliedDate = "";
          let membershipDate = "";

          if (row["mappliedDate"] !== 0) {
            const dateParts = row["mappliedDate"].split("-");
            if (dateParts.length === 3) {
              // Convert DD-MM-YYYY to YYYY-MM-DD
              const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T23:59:59.999Z`;
              mappliedDate = new Date(formattedDate); // Create a full Date object
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

          // Construct the Member document
          const memberData = new Member({
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
          records.push(memberData);
        } catch (error) {
          console.error(
            `Error processing row: ${JSON.stringify(row)}, Error:`,
            error
          );
        }
      })
      .on("end", async () => {
        try {
          await Member.insertMany(records);
          console.log(`${records.length} records imported successfully!`);
        } catch (insertError) {
          console.error("Error inserting records:", insertError);
        }
        process.exit();
      })
      .on("error", (err) => console.error("Error parsing CSV:", err));
  } catch (err) {
    console.error("Error importing data:", err);
  }
};

importData();
