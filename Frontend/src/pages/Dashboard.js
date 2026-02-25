import { useEffect, useState } from "react";
import taskService from "../api/taskService";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const res = await taskService.getTasks();
      const tasks = res.data;

      setStats({
        total: tasks.length,
        completed: tasks.filter(t => t.status === "COMPLETED").length,
        pending: tasks.filter(t => t.status === "PENDING").length,
      });

      // Get 5 most recent tasks
      setRecentTasks(tasks.slice(0, 5));
      setError(null);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const getCompletionPercentage = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  const getUserEmail = () => {
    return localStorage.getItem("userEmail") || "User";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-icon">👋</div>
          <div className="welcome-text">
            <h1>{getGreeting()}!</h1>
            <p>Welcome back, <strong>{getUserEmail()}</strong></p>
          </div>
        </div>
        <div className="welcome-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h2>📊 Task Dashboard</h2>
          <p>Overview of your task progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-decoration"></div>
        </div>

        <div className="stat-card completed-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completed}</div>
          </div>
          <div className="stat-decoration"></div>
        </div>

        <div className="stat-card pending-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-decoration"></div>
        </div>

        <div className="stat-card progress-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-value">{getCompletionPercentage()}%</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      {recentTasks.length > 0 && (
        <div className="recent-tasks-section">
          <div className="section-header">
            <h3>📝 Recent Tasks</h3>
            <span className="task-count">{recentTasks.length} tasks</span>
          </div>
          
          <div className="recent-tasks-list">
            {recentTasks.map((task, index) => (
              <div 
                key={task.id} 
                className="recent-task-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="task-status-indicator">
                  <span className={`status-dot ${task.status.toLowerCase()}`}></span>
                </div>
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                </div>
                <div className="task-badge">
                  <span className={`badge ${task.status.toLowerCase()}`}>
                    {task.status === "PENDING" ? "⏳" : "✅"} {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="action-buttons">
          <a href="/tasks" className="action-btn">
            <span className="btn-icon">➕</span>
            <span className="btn-text">Add New Task</span>
          </a>
          <a href="/tasks" className="action-btn">
            <span className="btn-icon">📋</span>
            <span className="btn-text">View All Tasks</span>
          </a>
          <a href="/profile" className="action-btn">
            <span className="btn-icon">👤</span>
            <span className="btn-text">My Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;