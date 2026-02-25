import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-icon icon-1">👤</div>
        <div className="floating-icon icon-2">✉️</div>
        <div className="floating-icon icon-3">🔒</div>
        <div className="floating-icon icon-4">✅</div>
        <div className="floating-icon icon-5">📝</div>
        <div className="floating-icon icon-6">🎯</div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="register-card">
        <div className="card-content">
          <div className="register-header">
            <div className="header-icon">
              <div className="icon-circle">
                <span className="user-icon">👥</span>
              </div>
            </div>
            <h2>Create Account</h2>
            <p>Join our task management system</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            {/* NAME FIELD */}
            <div className="form-group">
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <span className="label-icon">🔐</span>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="error-message">
                  ⚠️ Passwords do not match!
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* FOOTER WITH LOGIN LINK */}
          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;