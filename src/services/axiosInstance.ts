import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://core.vvmstage.cloud/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add interceptor to attach Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;