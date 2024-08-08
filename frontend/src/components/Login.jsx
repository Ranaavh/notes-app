import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_URL } from "../Urls";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      onLogin(response.data.token, response.data.username);
      toast.success("Logged in successfully!");
      navigate("/notes");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error(error.response?.data?.message || "Error logging in");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
