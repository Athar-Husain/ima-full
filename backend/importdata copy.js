const fs = require("fs");
const csv = require("csv-parser");

const mongoose = require("mongoose");
const Member = require("./models/memberModel"); // assuming your member schema is in a file named member.js

// Replace with your actual CSV file path
const filePath = "./Data.csv";

mongoose
  .connect("mongodb://127.0.0.1:27017/techosoft", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const importData = async () => {
  try {
    const stream = fs.createReadStream(filePath);
    const records = [];

    // Parse the CSV file
    stream
      .pipe(csv())
      .on("data", (row) => {
        // Skip the header row (optional)
        if (row["S.No"] !== "S.No") {
          // Map CSV data to member schema structure
          const Member = {
            firstName: row["firstName"],
            lastName: row["lastName"],
            isExpired: row["isExpired"],
            specialty: row["specialty"],
            specialtyCode: row["specialtyCode"],
            checked: row["checked"],

            // ... (map other relevant fields)
            address: {
              street: row["street"],
              city: row["city"],
              state: row["stateBranchName"],
            },
            contact: {
              email: row["email"],
              mobile: row["mobile"],
              landline: row["landline"],
            },
            membershipDetails: {
              memberid: row["memberid"],
              mappliedDate: row["mappliedDate"],
              mshiprecpt: row["mshiprecpt"],
              membershipDate: row["membershipDate"],
              stateBranchName: row["stateBranchName"],
              stateBranchCode: row["stateBranchCode"],
              stateBranchCount: row["stateBranchCount"],
              localBranchName: row["localBranchName"],
              localBranchCode: row["localBranchCode"],
              localBranchCount: row["localBranchCount"],
              lmoram: row["lmoram"],
              fellowDetails: {
                isFellow: row["isFellow"],
                fellowYear: row["fellowYear"],
              },
              status: row["Status"],
            },
            // ... (map other relevant fields based on your schema)
          };
          records.push(Member);
        }
      })
      .on("end", async () => {
        // Insert data into MongoDB after parsing is complete
        await Member.insertMany(records);
        console.log(`${records.length} records imported successfully!`);
        process.exit(); // Exit after import
      })
      .on("error", (err) => console.error("Error parsing CSV:", err));
  } catch (err) {
    console.error("Error importing data:", err);
  }
};

importData();
