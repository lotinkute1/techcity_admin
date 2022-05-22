import axiosClient from "./axiosClient";

const discountApi = {
  getAll() {
    const url = "/discount/getDiscounts";
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/discount/getDiscount/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/addDiscount";
    return axiosClient.post(url, data);
  }, 
  update(id,data) {
    const url= `/updateDiscount/${id}`;
    return axiosClient.put(url,data);
},
remove(id) {
  const url= `/deleteDiscount/${id}`;
  return axiosClient.delete(url);
},
 getAllDiscountDetail(){
  const url = "/discount/getDiscountsDetail";
  return axiosClient.get(url)
 },
 getDiscountDetailById(id){
  const url = `/discount/getDiscountDetail/${id}`;
  return axiosClient.get(url)
 },
 addDiscountDetail(data) {
  const url = "/discount/addDiscountDetail";
  return axiosClient.post(url, data);
}, 
updateDiscountDetail(id,data) {
  const url= `discount/updateDiscountDetail/${id}`;
  return axiosClient.put(url,data);
},
removeDiscountDetail(id) {
  const url= `discount/deleteDiscountDetail/${id}`;
  return axiosClient.delete(url);
},
};

export default discountApi;
