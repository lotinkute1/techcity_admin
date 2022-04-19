import axios from "axios";
import StorageKeys from '../constants'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_PRODUCT_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

const raw = localStorage.getItem(StorageKeys.TOKEN) || null;
const accessToken = raw ? raw.split('|')[1] : null;

axiosClient.interceptors.request.use(
  function (config) {
    if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;
