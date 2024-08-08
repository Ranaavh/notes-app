const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function to authenticate users based on JWT
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      // If no token is provided, deny access
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID contained in the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      // If no user is found, deny access
      return res
        .status(401)
        .json({ msg: "User not found, authorization denied" });
    }

    // Attach the user to the request object for further use in routes
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Log the error and send an unauthorized response if something goes wrong
    console.error("Something went wrong with the auth middleware", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { authMiddleware };
