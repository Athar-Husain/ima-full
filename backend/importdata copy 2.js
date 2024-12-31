import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Member from "./models/memberModel.js";

const filePath = "./datatest.csv";

mongoose
  .connect("mongodb://localhost:27017/technosoft")
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
          if (!row["firstName"] || !row["lastName"] || !row["city"]) {
            console.warn(
              `Skipping record due to missing fields: ${JSON.stringify(row)}`
            );
            return;
          }

          // Construct the Member document
          const memberData = new Member({
            firstName: row["firstName"],
            lastName: row["lastName"],
            specialtyCode: parseInt(row["specialtyCode"]) || 0,
            address: {
              street: row["street"] || "Unknown",
              city: row["city"] || "Unknown",
              state: row["stateBranchName"],
            },
            membershipDetails: {
              memberid: row["memberid"],
              mappliedDate: row["mappliedDate"],
              membershipDate: row["membershipDate"] || 0,
              mshiprecpt: row["mshiprecpt"] || 0,
              localBranchCode: row["localBranchCode"] || "N/A",
              localBranchCount: parseInt(row["localBranchCount"]) || 0,
              lmoram: row["lmoram"] || "N/A",
            },
            fellowDetails: {
              isFellow: row["isFellow"] === "true",
              fellowYear: parseInt(row["fellowYear"]) || null,
            },
            isExpired: row["isExpired"] === "TRUE",
            isFellow: row["isFellow"] === "TRUE",
            fellowYear: row["fellowYear"] ? parseInt(row["fellowYear"]) : null,
            specialty: row["specialty"] || "General",
            membershipDate: row["membershipDate"]
              ? new Date(row["membershipDate"])
              : null,
            contact: {
              email: row["email"] || "",
              mobile: row["mobile"] || "",
              landline: row["landline"] || "",
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
