import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = "/category/getCategories";
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/category/addCategory";
    return axiosClient.post(url, data);
  },
};

export default categoryApi;
