// src/api/apiClientFile.js
import axios from "axios";

const apiClientFile = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Attach token
apiClientFile.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default apiClientFile;
