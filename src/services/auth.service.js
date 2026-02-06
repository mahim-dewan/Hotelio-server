// src/services/auth.service.js

const OTP = require("../models/opt.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { isMatchedPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwtToken");
const { sendVerificationOtp } = require("./otp.service");

// ******************
// Service: Request Registration OTP
// ******************/
const otpToRegister = async (payload) => {
  return await sendVerificationOtp(payload.email);
};

// *******************
// Service: Resend OTP to Register User
// *******************
const registerOtpResendService = async (payload) => {
  return await sendVerificationOtp(payload.email);
};

// ******************
// Service: Verify OTP and Create User
// ******************/
const registerUser = async (payload) => {
  const { name, email, password, otp } = payload;

  // 1. Double check existence (Race condition check)
  let existEmail = await User.findOne({ email });
  if (existEmail) {
    throw ApiError(400, "Email Already Exist");
  }

  // 2. Validate OTP
  const otpRecord = await OTP.findOne({ email, purpose: "email_verification" });
  if (!otpRecord || otp !== otpRecord?.otp) {
    throw ApiError(400, "OTP invalid or expired");
  }

  // 3. Create User
  const user = new User({ name, email, password });
  const createdUser = await user.save();

  // 4. Cleanup OTP after successful registration
  await OTP.deleteMany({ email, purpose: "email_verification" });

  // 5. Generate Token
  const token = await generateToken(createdUser);

  return { user: createdUser, token };
};

// ******************
// Login Service
// ******************/
const loginUser = async (payload) => {
  const { email, password } = payload;

  // 1. Is user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError(400, "Invalid Credential");
  }

  // 2. Is password matched
  const isMatched = await isMatchedPassword(password, user.password);
  if (!isMatched) {
    throw ApiError(400, "Invalid Credential");
  }

  // 3. Genarate jwt token
  const token = await generateToken({
    name: user.name,
    email: user.email,
    _id: user._id,
  });

  return token;
};

module.exports = {
  otpToRegister,
  registerUser,
  registerOtpResendService,
  loginUser,
};
