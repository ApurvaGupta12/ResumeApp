// src/api/axiosInstance.ts

import axios from "axios";

// Axios instance create 
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Spring Boot API  base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: token add in request  header 
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(" Axios token being sent:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional): token expire ya error handle karne ke लिए
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expire ya unauthorized request
      localStorage.removeItem("token");
      window.location.href = "/auth/sign-in"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
