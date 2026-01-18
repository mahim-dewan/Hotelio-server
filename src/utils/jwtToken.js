// src/utils/jwtToken.js

const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

const tokenVerify = async (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  tokenVerify,
};
