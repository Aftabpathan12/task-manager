import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });

      // Save authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userRole", res.data.role);

      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="bg-animation">
        {/* Floating Icons */}
        <div className="floating-icon icon-1">🔐</div>
        <div className="floating-icon icon-2">🌟</div>
        <div className="floating-icon icon-3">💼</div>
        <div className="floating-icon icon-4">🚀</div>
        <div className="floating-icon icon-5">💡</div>
        <div className="floating-icon icon-6">⚡</div>

        {/* Animated Circles */}
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <div className="card-content">
          {/* Header */}
          <div className="login-header">
            <div className="header-icon">
              <div className="icon-circle">
                <span className="user-icon">👤</span>
              </div>
            </div>
            <h2>Welcome Back</h2>
            <p>Login to continue to your account</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleLogin}>
            {/* Error Message */}
            {error && (
              <div className="error-message" style={{
                padding: "12px 15px",
                marginBottom: "18px",
                background: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                color: "#c33",
                fontSize: "13px",
                textAlign: "center",
                animation: "fadeIn 0.3s ease"
              }}>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;