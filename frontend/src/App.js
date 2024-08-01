import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomNavbar from "./components/Navbar/Navbar";
import NotesList from "./components/NotesList/NotesList";
import Footer from "./components/footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");
    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", username);
    setToken(token);
    setUserName(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
    setIsAuthenticated(false);
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <div>
          <CustomNavbar onLogout={handleLogout} username={userName} />
          <div className="container">
            <NotesList token={token} />
          </div>
        </div>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-container">
            <div className="auth-image">
              <h1>Notes App</h1>
              <p>Welcome back! Manage your notes efficiently.</p>
              <img src="/images/login.jpeg" alt="Notes App" />
            </div>
            <div className="auth-form">
              {showRegister ? (
                <Register
                  onRegister={() => {
                    alert("Registered successfully");
                    toggleForm();
                  }}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )}
              <button className="auth-form-button" onClick={toggleForm}>
                {showRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
