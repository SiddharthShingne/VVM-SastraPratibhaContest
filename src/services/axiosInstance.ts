import axios from "axios";

const STAGING_URL = "https://core.vvmstage.cloud/api";
const PRODUCTION_URL = "https://vvm.org.in/backend/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "sif.vvm.org.in" || host === "sif-pre-prod.vvm.org.in") {
      return PRODUCTION_URL;
    }
    // sif.vvmstage.cloud, sifdemo.vvmstage.cloud, localhost, etc.
    return STAGING_URL;
  }
  // SSR fallback — set this env var per deployment
  return process.env.NEXT_PUBLIC_API_ENV === "production"
    ? PRODUCTION_URL
    : STAGING_URL;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;
      const token = parsed?.token || parsed?.user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://core.vvmstage.cloud/api",
//   // baseURL: "https://vvm.org.in/backend/api",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Add interceptor to attach Bearer token
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     if (typeof window !== "undefined") {
// //       const token = localStorage.getItem("token");
// //       if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //       }
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );
// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const raw = localStorage.getItem("user");
//       const parsed = raw ? JSON.parse(raw) : null;
//       const token = parsed?.token || parsed?.user?.token;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
