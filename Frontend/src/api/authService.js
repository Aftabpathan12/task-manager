import axios from "./axios";

const login = async (data) => {
  const res = await axios.post("/login", data);
  const token = res.data.token; // MUST match backend key
  localStorage.setItem("token", token);
  return res.data;
};


const register = (data) => {
  return axios.post("/register", data);
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  login,
  register,
  logout,
};
