import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_PRODUCT_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;
