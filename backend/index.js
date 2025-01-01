import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ConnectDB from "./db.js"; //

import errorHandler from "./middlewares/errorMiddleware.js"; // Ensure you include .js
import stateRoute from "./routes/stateBrRoute.js";
import memberRoute from "./routes/memberRoute.js";
import localRoute from "./routes/localBrRoute.js";
import otpRoute from "./routes/otpRoute.js";

// ConnectDB();

// api/otp/sent-otp
ConnectDB();

const app = express();
const PORT = process.env.MY_PORT || 8000;

// console.log("port clg", process.env.MY_PORT);

// ============  Middle Wares ==============
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:5173",

      // "http://localhost:3001",
    ],
    credentials: true,
  })
);

// app.use("/api/members", memberRoute);
app.use("/api/states", stateRoute);
app.use("/api/members", memberRoute);
app.use("/api/otp", otpRoute);
app.use("/api/locals", localRoute);

app.get("/", (req, res) => {
  res.send("<h1>THis is from Server/index.js</h1>");
});

app.use(errorHandler);
// .listen(8081, (e) => e && console.log(e))

app.listen(PORT, () => {
  console.log(`Server is Started at PORT ${PORT}`);
});
