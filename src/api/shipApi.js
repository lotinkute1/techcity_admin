import axiosClient from "./axiosClient";

const shipApi = {
  getAll() {
    const url = "/ship/getShips";
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/ship/getShip/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/ship/addShip";
    return axiosClient.post(url, data);
  },
};

export default shipApi;
