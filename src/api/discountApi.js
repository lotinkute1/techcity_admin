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
    const url = "/discount/addDiscount";
    return axiosClient.post(url, data);
  }, 
  update(data) {
    const url= `discount/updateDiscount/${data.id}`;
    return axiosClient.put(url,data);
},
remove(id) {
  const url= `discount/deleteDiscount/${id}`;
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
updateDiscountDetail(data) {
  const url= `discount/updateDiscountDetail/${data.id}`;
  return axiosClient.put(url,data);
},
removeDiscountDetail(id) {
  const url= `discount/deleteDiscountDetail/${id}`;
  return axiosClient.delete(url);
},
};

export default discountApi;
