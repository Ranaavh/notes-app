import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CustomNavbar from "./components/Navbar/Navbar";
import NotesList from "./components/NotesList/NotesList";
import Footer from "./components/footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signinform from "./components/Signinform";
import Loginform from "./components/Loginform";

const App = () => {
  // State variables
  const [token, setToken] = useState(null); // Stores the authentication token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is authenticated
  const [userName, setUserName] = useState(""); // Stores the username of the authenticated user

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // useEffect hook to check for stored token and username on component mount
  useEffect(() => {
    // Retrieve token and username from localStorage
    const storedToken = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");

    // If token and username exist, update state and authentication status
    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setIsAuthenticated(true);
    }
  }, []);

  // Handler for login
  const handleLogin = (token, username) => {
    // Store token and username in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", username);

    // Update state with token and username
    setToken(token);
    setUserName(username);
    setIsAuthenticated(true);

    // Navigate to the notes page after successful login
    navigate("/notes");
  };

  // Handler for logout
  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");

    // Reset state
    setToken(null);
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      {/* Render the navigation bar if the user is authenticated */}
      {isAuthenticated && (
        <CustomNavbar onLogout={handleLogout} username={userName} />
      )}
      <Routes>
        {/* Route for notes page */}
        <Route
          path="/notes"
          element={
            isAuthenticated ? (
              <div className="container">
                <NotesList token={token} />
              </div>
            ) : (
              // Redirect to login page if the user is not authenticated
              <Navigate to="/login" />
            )
          }
        />
        {/* Route for registration page */}
        <Route
          path="/register"
          element={!isAuthenticated ? <Signinform /> : <Navigate to="/notes" />}
        />
        {/* Route for login page */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Loginform onLogin={handleLogin} />
            ) : (
              // Redirect to notes page if the user is authenticated
              <Navigate to="/notes" />
            )
          }
        />
        {/* Default route to redirect based on authentication status */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/notes" : "/login"} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
