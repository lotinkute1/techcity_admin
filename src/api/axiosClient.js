import axios from "axios";
import StorageKeys from '../constants'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_PRODUCT_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});
// console.log(window.location.pathname.split("/")[2]);
const accessToken = window.location.pathname.split("/")[2] || null;
// const accessToken = localStorage.getItem(StorageKeys.TOKEN) || null;

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
