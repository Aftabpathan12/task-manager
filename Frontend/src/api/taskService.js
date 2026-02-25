import api from "./axios";

const getTasks = () => api.get("/tasks");
const addTask = (task) => api.post("/tasks", task);
const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
