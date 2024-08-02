const bcrypt = require("bcryptjs");

// Function to compare a plain password with a hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = comparePassword;
