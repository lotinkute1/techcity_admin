
import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },

  getAll() {
    return axiosClient.get("/user/getUsers")
  },
  getOne(id) {
    return axiosClient.get(`/user/getUserById/${id}`);
  },
  updateUser(id,data) {
    return axiosClient.put(`/user/updateUser/${id}`, data)
  },
  deleteUser(id) {
    return axiosClient.delete(`/user/deleteUser/${id}`)
  },
  getSoldData() {
    return axiosClient.get("/user/getSoldData")
  },
};

export default userApi;