import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, [navigate]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/users/me");
      setUser(res.data);
      setEmail(res.data.email);
      setError(null);
    } catch (err) {
      console.error("Error loading profile:", err);
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!email.trim()) {
      setError("Email cannot be empty");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const res = await axios.put("/users/me", { email });
      setUser(res.data);
      setEditMode(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Update stored email
      localStorage.setItem("userEmail", res.data.email);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEmail(user.email);
    setError(null);
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="profile-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      {/* Background Decorations */}
      <div className="profile-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Header Banner */}
        <div className="profile-header-banner">
          <div className="banner-decoration"></div>
        </div>

        {/* Avatar Section */}
        <div className="profile-avatar-wrapper">
          <div className="avatar-ring">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="profile-avatar"
              alt="User Avatar"
            />
          </div>
          <div className="avatar-badge">
            <span className="badge-icon">✓</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          {editMode ? (
            <div className="edit-section">
              <label htmlFor="email-input" className="input-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={saving}
              />
            </div>
          ) : (
            <>
              <h2 className="profile-name">
                {user.email.split('@')[0].charAt(0).toUpperCase() + 
                 user.email.split('@')[0].slice(1)}
              </h2>
              <p className="profile-email">
                <span className="email-icon">📧</span>
                {user.email}
              </p>
            </>
          )}

          {/* Role Badge */}
          <div className="profile-badges">
            <span className="profile-role">
              <span className="role-icon">👤</span>
              {user.role}
            </span>
            <span className={`profile-status ${user.status.toLowerCase()}`}>
              <span className="status-dot"></span>
              {user.status}
            </span>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="message-box success-message">
              <span className="message-icon">✓</span>
              {successMessage}
            </div>
          )}

          {error && (
            <div className="message-box error-message">
              <span className="message-icon">⚠</span>
              {error}
            </div>
          )}

          {/* Profile Stats */}
          {!editMode && (
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-label">Account Type</div>
                  <div className="stat-value">{user.role}</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <div className="stat-label">Status</div>
                  <div className="stat-value">{user.status}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          {editMode ? (
            <>
              <button 
                className="btn btn-save" 
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="btn-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💾</span>
                    Save Changes
                  </>
                )}
              </button>
              <button
                className="btn btn-cancel"
                onClick={cancelEdit}
                disabled={saving}
              >
                <span className="btn-icon">✕</span>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-edit"
                onClick={() => setEditMode(true)}
              >
                <span className="btn-icon">✏️</span>
                Edit Profile
              </button>
              <button className="btn btn-logout" onClick={logout}>
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </>
          )}
        </div>

        {/* Quick Links */}
        {!editMode && (
          <div className="quick-links">
            <a href="/dashboard" className="quick-link">
              <span className="link-icon">📊</span>
              Dashboard
            </a>
            <a href="/tasks" className="quick-link">
              <span className="link-icon">✅</span>
              My Tasks
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;