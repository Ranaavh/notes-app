import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  // State variables for username and password input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      // Sends a POST request to the registration endpoint with username and password
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });

      // Calls the onRegister callback function (could be used to update parent component state)
      onRegister();

      // Navigates to the login page after successful registration
      navigate("/login");
    } catch (error) {
      // Logs the error and displays an error message using toast
      console.error("Error registering", error);
      toast.error(error.response?.data?.message || "Error registering");

      // Clears input fields
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <h2>Sign Up</h2>
      {/* Input field for username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      {/* Input field for password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
