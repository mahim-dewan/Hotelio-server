// src/services/auth.service.js

const OTP = require("../models/opt.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { isMatchedPassword, makeHashPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwtToken");
const { sendVerificationOtp, sendForgotPasswordOtp } = require("./otp.service");

// ******************
// Service: Request Registration OTP
// ******************/
const otpToRegister = async (payload) => {
  const existEmail = await User.findOne({ email: payload.email });
  if (existEmail) {
    throw ApiError(400, "User already registered with this email.");
  }

  return await sendVerificationOtp(payload.email);
};

// *******************
// Service: Resend OTP to Register User
// *******************
const registerOtpResendService = async (payload) => {
  const { email } = payload;

  // Check if user already exists
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw ApiError(400, "User already registered with this email.");
  }

  return await sendVerificationOtp(email);
};

// ******************
// Service: Verify OTP and Create User
// ******************/
const registerUser = async (payload) => {
  const { name, email, password, otp } = payload;

  // 1. Double check existence
  let existEmail = await User.findOne({ email });
  if (existEmail) {
    throw ApiError(400, "User already registered with this email.");
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

// ******************
// Forgot Password Service
// ******************
const forgotPasswordService = async (payload) => {
  const { email } = payload;
  // Is exist user
  const isExistUser = await User.findOne({ email });
  if (!isExistUser) {
    throw ApiError(400, "Doesn't exist user with this email");
  }

  // OTP generate and send to user email
  await sendForgotPasswordOtp(email);

  return { email };
};

// ******************
// Reset Password Service
// ******************
const resetPasswordService = async (payload) => {
  const { email, otp, password } = payload;

  // 1. OTP validation check
  const record = await OTP.findOne({ email, otp, purpose: "password_reset" });
  if (!record) {
    throw ApiError(400, "Invalid or expired OTP. Please try again.");
  }

  // 2. Ancode Password and Update data
  const ancodedPassword = await makeHashPassword(password);
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { password: ancodedPassword },
    { new: true, runValidators: true },
  );
  if (!updatedUser) {
    throw ApiError(404, "User not found with this email.");
  }

  // 3. Delete OTP after successful reset
  await OTP.deleteOne({ _id: record._id });

  return updatedUser;
};

// ******************
// Reset OTP resend service
const resetOtpResendService = async (payload) => {
  const { email } = payload;

  // 1. Check user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError(404, "This email doesn't exist");
  }

  // 2. Generate OTP and send
  await sendForgotPasswordOtp(email);
  return { email };
};

module.exports = {
  otpToRegister,
  registerUser,
  registerOtpResendService,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
  resetOtpResendService,
};
