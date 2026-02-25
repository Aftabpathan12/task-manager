import { useState } from "react";
import taskService from "../api/taskService";
import "./TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    setIsLoading(true);
    
    try {
      await taskService.addTask({
        title,
        description,
        status: "PENDING",
      });

      setTitle("");
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addTask();
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <div className="form-header">
          <span className="form-icon">➕</span>
          <h3>Add New Task</h3>
        </div>

        <div className="form-content">
          <div className="input-group">
            <label htmlFor="task-title">
              <span className="label-icon">📝</span>
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              maxLength={100}
            />
          </div>

          <div className="input-group">
            <label htmlFor="task-description">
              <span className="label-icon">📄</span>
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              placeholder="Enter task description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
              maxLength={500}
            />
          </div>

          <button 
            className="add-task-btn" 
            onClick={addTask}
            disabled={isLoading || !title.trim()}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <span>✨</span>
                Add Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;