// import
import asyncHandler from "express-async-handler";
import axios from "axios";

// In-memory OTP store with expiration logic
const otpStore = new Map();

const sendOtp = asyncHandler(async (req, res) => {
  const { name, phoneNumber } = req.body;
  console.log("Received data in sendOtp:", req.body);

  if (!phoneNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const message = `Dear Member ${name}, your OTP is ${otp} to access main details IMA AMS`;

  const nimbusApiUrl = `http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=gakhanbiz&Password=dnes2378DN&SenderID=AMSIMA&Phno=${phoneNumber}&Msg=${encodeURIComponent(
    message
  )}&EntityID=1701159144155090480&TemplateID=1107173511324056679`;

  try {
    const response = await axios.get(nimbusApiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Nimbus API response:", response.data);

    if (response.data) {
      otpStore.set(phoneNumber, { otp, expires: Date.now() + 5 * 60 * 1000 });
      console.log(`OTP sent to ${phoneNumber}: ${otp}`);

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully!" });
    } else {
      console.log("else part in send otp", response.data);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending OTP",
    });
  }
});

// Controller to verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;
  console.log("");
  console.log("Received phoneNumber in backend:", req.body); // Log phone number in backend

  // Check if phone number is provided
  if (!phoneNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Phone number is required" });
  }

  // Retrieve OTP record from the store
  const record = otpStore.get(phoneNumber);

  // Check if OTP record exists or has expired
  if (!record || Date.now() > record.expires) {
    otpStore.delete(phoneNumber); // Remove expired OTP record
    console.log(`OTP expired or invalid for ${phoneNumber}`);

    return res.status(400).json({
      success: false,
      message: "OTP expired or invalid",
    });
  }

  // Verify the OTP
  if (record.otp === parseInt(otp)) {
    otpStore.delete(phoneNumber); // OTP verified, delete the record

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } else {
    console.log("Invalid OTP entered:", otp);
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
});

export { sendOtp, verifyOtp };
