// src/utils/bcrypt.js

const bcrypt = require("bcrypt");

// Make password hash
const makeHashPassword = async (password) => await bcrypt.hash(password, 10);

// Compare password
const isMatchedPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = {
  makeHashPassword,
  isMatchedPassword,
};
