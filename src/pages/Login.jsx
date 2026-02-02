import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-btn">
          <FaGoogle size={14} /> Continue with Google
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
