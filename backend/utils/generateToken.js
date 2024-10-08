const jwt = require("jsonwebtoken");

// Function to generate a JSON Web Token (JWT)
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "32h" });
};

module.exports = generateToken;
