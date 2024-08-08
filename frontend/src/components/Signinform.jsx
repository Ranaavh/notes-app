import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { toast } from "react-hot-toast";

const Signinform = () => {
  const navigate = useNavigate(); // Use the useNavigate hook to get navigate function

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-image">
            <h1>Notes Keeper</h1>
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
    </div>
  );
};

export default Signinform;
