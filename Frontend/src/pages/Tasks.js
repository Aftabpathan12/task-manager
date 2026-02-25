import TaskForm from "../components/TaskForm"; 
import TaskList from "../components/TaskList"; 
import "./Tasks.css";

const Tasks = () => { 
  return ( 
    <div className="tasks-page">
      <div className="tasks-header">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <span className="header-icon">✅</span>
          </div>
          <div className="header-text">
            <h2>My Tasks</h2>
            <p>Organize and manage your daily tasks efficiently</p>
          </div>
        </div>
      </div>
      
      <TaskForm /> 
      <TaskList /> 
    </div> 
  ); 
}; 

export default Tasks;