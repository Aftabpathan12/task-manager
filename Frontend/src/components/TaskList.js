import { useEffect, useState } from "react";
import taskService from "../api/taskService";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const res = await taskService.getTasks();
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  const toggleStatus = async (task) => {
    const updated = {
      ...task,
      status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
    };

    try {
      await taskService.updateTask(task.id, updated);
      setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-container">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={loadTasks} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <span className="th-icon">📝</span>
                Title
              </th>
              <th>
                <span className="th-icon">📄</span>
                Description
              </th>
              <th>
                <span className="th-icon">📊</span>
                Status
              </th>
              <th>
                <span className="th-icon">⚙️</span>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr 
                key={task.id} 
                className="task-row"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="task-title">
                  <span className="title-text">{task.title}</span>
                </td>
                <td className="task-description">
                  {task.description || <span className="no-description">No description</span>}
                </td>
                <td className="task-status">
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status === "PENDING" ? "⏳" : "✅"} {task.status}
                  </span>
                </td>
                <td className="task-actions">
                  <button 
                    className="action-btn toggle-btn" 
                    onClick={() => toggleStatus(task)}
                    title={task.status === "PENDING" ? "Mark as completed" : "Mark as pending"}
                  >
                    {task.status === "PENDING" ? "✓" : "↺"}
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="task-summary">
        <div className="summary-item">
          <span className="summary-icon">📊</span>
          <span className="summary-text">
            Total: <strong>{tasks.length}</strong>
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-icon">⏳</span>
          <span className="summary-text">
            Pending: <strong>{tasks.filter(t => t.status === "PENDING").length}</strong>
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-icon">✅</span>
          <span className="summary-text">
            Completed: <strong>{tasks.filter(t => t.status === "COMPLETED").length}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskList;