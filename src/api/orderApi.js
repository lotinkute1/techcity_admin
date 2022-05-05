import axiosClient from "./axiosClient";

const orderApi = {
  getAll() {
    const url = "/order/getOrders";
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/order/getOrder/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/order/addOrder";
    return axiosClient.post(url, data);
  }, 
  update(data) {
    const url= `order/updateOrder/${data.id}`;
    return axiosClient.put(url,data);
},
remove(id) {
  const url= `order/deleteOrder/${id}`;
  return axiosClient.delete(url);
},
 getAllOrderDetail(){
  const url = "/order/getOrdersDetail";
  return axiosClient.get(url)
 },
 getOrderDetailById(id){
  const url = `/order/getOrderDetail/${id}`;
  return axiosClient.get(url)
 },
 addOrderDetail(data) {
  const url = "/order/addOrderDetail";
  return axiosClient.post(url, data);
}, 
updateOrderDetail(data) {
  const url= `order/updateOrderDetail/${data.id}`;
  return axiosClient.put(url,data);
},
removeOrderDetail(id) {
  const url= `order/deleteOrderDetail/${id}`;
  return axiosClient.delete(url);
},
};

export default orderApi;
