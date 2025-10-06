// axios instance
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  withCredentials: true // if you rely on cookies from backend
});

// attach client-managed token (if you store token in cookie non-httpOnly)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
