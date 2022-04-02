import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = "/category/getCategories";
    return axiosClient.get(url);
  },
  getByName(name){
    const url = `/category/getCategoriesByName/${name}`
    return axiosClient.get(url)
  },
  getById(id) {
    const url = `/category/getCategoryById/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/category/addCategory";
    return axiosClient.post(url, data);
  },
};

export default categoryApi;
