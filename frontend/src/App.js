import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomNavbar from "./components/Navbar/Navbar";
import NotesList from "./components/NotesList/NotesList";
import Footer from "./components/footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const App = () => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

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
    navigate("/notes");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <CustomNavbar onLogout={handleLogout} username={userName} />
      )}
      <Routes>
        <Route
          path="/notes"
          element={
            isAuthenticated ? (
              <div className="container">
                <NotesList token={token} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <div className="auth-wrapper">
                <div className="auth-container">
                  <div className="auth-image">
                    <h1>Notes App</h1>
                    <p>Welcome! Create an account to manage your notes.</p>
                    <img src="/images/register.jpeg" alt="Register" />
                  </div>
                  <div className="auth-form">
                    <Register
                      onRegister={() => {
                        toast.success("Registered successfully");
                        navigate("/login");
                      }}
                    />
                    <button
                      className="auth-form-button"
                      onClick={() => navigate("/login")}
                    >
                      Already have an account? Login
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/notes" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <div className="auth-wrapper">
                <div className="auth-container">
                  <div className="auth-image">
                    <h1>Notes App</h1>
                    <p>Welcome back! Manage your notes efficiently.</p>
                    <img src="/images/login.jpeg" alt="Notes App" />
                  </div>
                  <div className="auth-form">
                    <Login onLogin={handleLogin} />
                    <button
                      className="auth-form-button"
                      onClick={() => navigate("/register")}
                    >
                      Don't have an account? Sign Up
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/notes" />
            )
          }
        />
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
