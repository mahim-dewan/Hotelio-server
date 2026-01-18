// src/services/auth.service.js

const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { isMatchedPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwtToken");
const { userRegistrationSchema } = require("../validators/auth.schema");

// ******************
// Register Service
// ******************/
const registerUser = async (payload) => {
  // 1. Validate input
  const { error, value } = userRegistrationSchema.validate(payload);
  const { name, email, password } = value;

  if (error) {
    throw ApiError(
      400,
      "Validation Error",
      error.details.map((err) => err.message),
    );
  }

  // 2. Check existing user
  let existEmail = await User.findOne({ email });
  if (existEmail) {
    throw ApiError(400, "Email Already Exist");
  }

  // 3. Create user
  const user = new User({ name, email, password });
  await user.save();

  return user;
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

  return token
};
module.exports = {
  registerUser,
  loginUser,
};
