// src/api/globalApi.js
import apiClientJson from "./apiClientJson";
import apiClientFile from "./apiClientFile";

// Helper to convert to FormData if file
const toFormData = (data) => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    fd.append(key, value);
  });
  return fd;
};

// Core handler with unified response
const handleRequest = async (requestFunc) => {
  try {
    const response = await requestFunc();
    return { success: true, data: response.data, error: null };
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.response?.data || error.message;
    return { success: false, data: null, error: message };
  }
};

const globalApi = {
  get: (url, config = {}, isFile = false) =>
    handleRequest(() =>
      (isFile ? apiClientFile : apiClientJson).get(url, config)
    ),

  post: (url, data = {}, isFile = false) =>
    handleRequest(() =>
      (isFile ? apiClientFile : apiClientJson).post(
        url,
        isFile ? toFormData(data) : data
      )
    ),

  put: (url, data = {}, isFile = false) =>
    handleRequest(() =>
      (isFile ? apiClientFile : apiClientJson).put(
        url,
        isFile ? toFormData(data) : data
      )
    ),

  delete: (url, config = {}, isFile = false) =>
    handleRequest(() =>
      (isFile ? apiClientFile : apiClientJson).delete(url, config)
    ),
};

export default globalApi;
