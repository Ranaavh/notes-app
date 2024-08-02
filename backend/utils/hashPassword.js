const bcrypt = require("bcryptjs");

// Function to hash a password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = hashPassword;
