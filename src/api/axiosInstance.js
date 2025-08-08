import axios from "axios";
import { VITE_APP_API_URL } from "../config/env";
import { errorHandler } from "../utility";
import { cookies } from "SpiseBowlMfUI/utility";

// Create instance
const axiosMain = axios.create({
  baseURL: VITE_APP_API_URL,
  timeout: 10000,
});

// Request Interceptor
axiosMain.interceptors.request.use(
  (config) => {
    const token = cookies.getCookie("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosMain.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error in axiosInstance:", error);
    errorHandler({
      status: error.response?.status,
      data: error.response?.data || error,
    });

    return Promise.reject(error);
  }
);

export default axiosMain;
