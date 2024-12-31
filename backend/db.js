import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host} / ${process.env.MONGO_URI}`
    );
  } catch (error) {
    // // console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the ConnectDB function
export default ConnectDB;
