import axiosClient from "./axiosClient";

const productApi = {
  getAll() {
    const url = "/product/getProducts";
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/product/getProduct/${id}`;
    return axiosClient.get(url);
  },
  getByName(name){
    const url = `/product/getProductByName/${name}`
    return axiosClient.get(url)
  },
  add(data){
    const url = '/product/addProduct';
    return axiosClient.post(url,data);
  },
  update(data){
    const url =`/product/updateProduct/${data.id}`;
    return axiosClient.put(url,data);
  },
  delete(id) {
    const url = `/product/deleteProduct/${id}`;
    return axiosClient.delete(url);
  }
};

export default productApi;
