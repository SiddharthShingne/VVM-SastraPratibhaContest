import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/uae",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;