import axiosClient from "./axiosClient";

const ratingApi = {
  getRatings() {
    const url = "/rating/getRatings";
    return axiosClient.get(url);
  },
  getRatingById(id) {
    const url = `/rating/getRatingById/${id}`;
    return axiosClient.get(url);
  },
  addRating(data) {
    const url = "/rating/addRating";
    return axiosClient.post(url, data);
  },
  updateRating(data) {
    const url = `/rating/updateRating/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteRating(id) {
    const url = `/rating/deleteRating/${id}`;
    return axiosClient.delete(url);
  },
};

export default ratingApi;
