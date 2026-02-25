import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ ALWAYS hide navbar on login & register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="logo-link">
            <span className="logo-icon">📋</span>
            <span className="logo-text">Task Manager</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            📊 Dashboard
          </Link>

          <Link to="/tasks" className="nav-link">
            ✅ Tasks
          </Link>

          <Link to="/profile" className="nav-link">
            👤 Profile
          </Link>

          <button onClick={handleLogout} className="nav-button logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
