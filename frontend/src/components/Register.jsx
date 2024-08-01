import React, { useState } from "react";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      onRegister();
    } catch (error) {
      console.error("Error registering", error);
      alert(error.response?.data?.message || "Error registering");
      // Clear the input fields if there is an error
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
