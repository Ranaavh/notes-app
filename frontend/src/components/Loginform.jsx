import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Loginform = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-image">
            <h3 className="pt-4">Welcome back!</h3>
            <h4>Notes Keeper</h4>
            <p>Manage your notes efficiently.</p>
            <img src="/images/login.jpeg" alt="Notes App" />
          </div>
          <div className="auth-form">
            <Login onLogin={onLogin} />
            <button
              className="auth-form-button"
              onClick={() => navigate("/register")}
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
