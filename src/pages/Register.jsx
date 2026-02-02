import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Google button */}
        <button className="google-btn">
          <FaGoogle /> Continue with Google
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
