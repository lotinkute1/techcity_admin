import { getDatabase, ref, remove, set } from "firebase/database";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./css/style.css";
// import TableData from "../../components/TableData/TableData";
import TableDataDiscounts from "../../components/TableData/TableDataDiscounts";
import FormInput from "./components/FormInput";
import discountApi from "../../api/discountApi";
export default function DiscountPage() {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [discountId, setDiscountId] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true);//thay đổi trạng thái button trong form thái thêm/sửa
  const [discounts, setDiscounts] = useState([]);
  const notify = (type, message) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // dùng để toggle form , reset id về 0 , đổi trạng thái button thành thêm (không chuyền đi đâu hết)
  const handleClickOpenForm = (e, formValue) => {
    setOpenForm((x) => !x);
    setDiscountId(0);
    setStatusBtn(true);
  };
  
  // lấy ra id , đổi trạng thái button thành sửa (chuyền cho dataTable)
  const handleEditClick = (discountId) => {
    setDiscountId(discountId);
    setStatusBtn(false);
  };

  // click nút edit trong bảng thì mở form (chuyền cho dataTable)
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };
  // xóa user handler
  const handleRemoveClick = async (discountId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      // remove(ref(db, "/products/" + productId));
      await discountApi.remove(discountId)
      setDiscounts(discounts.filter(item => item.id !== discountId))
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  
  const formatdate = (date = "") => {
    return date.split("/").reverse().join("/")
  }
  
  // thêm user handler
  const handleAddBtn = async (formValue) => {
    console.log("thong tin can add la:");
    console.log(formValue);
    if (
      formValue.discount_img !== "" &&
      formValue.discount_name !== "" &&
      formValue.end_day !== "" &&
      formValue.start_day !== "" &&
      formValue.status !== "" 
      
    ) {
      formValue.start_day = formatdate(formValue.start_day)
      formValue.end_day = formatdate(formValue.end_day)
      const response =  await discountApi.add(formValue)
      setDiscounts([...discounts, response.data])
      notify("success", "Thêm thành công !");
    }
    // handleClickOpenForm();
  };



  // tắt bặt trạng thái người dùng
  const handleToggleBtn = (discount) => {
    const { id, status, ...u } = discount;
    if (status === 0) {
      set(ref(db, "/discounts/" + id), {
        ...u,
        status: 1,
      });
    } else {
      set(ref(db, "/discounts/" + id), {
        ...u,
        status: 0,
      });
    }
  };
  // bấm nút save (edit) trong form
  const handleSaveBtn = async (formValue) => {
    console.log("thong tin can edit la");
    console.log(formValue);
    if (
      discountId &&
      formValue.discount_img !== "" &&
      formValue.discount_name !== "" &&
      formValue.end_day !== "" &&
      formValue.start_day !== "" &&
      formValue.status !== "" 
    ) 
    {
      formValue.start_day = formatdate(formValue.start_day)
      formValue.end_day = formatdate(formValue.end_day)
      const response = await discountApi.update(discountId,formValue)
      setDiscounts(discounts.map(item => {
          if(item.id === discountId) {
            return response.data
          }
          return item
      }))
      notify("success", "Sửa thành công !");
    }
    handleClickOpenForm();

  };
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Discounts</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-2">

          {openForm && (
            <>
              <div className="row g-3 mb-2 ">
                <FormInput
                  statusBtn={statusBtn}
                  // onClick={handleEditClickOpenForm}
                  discounts={discounts}
                  discountId={discountId}
                  onAddBtn={handleAddBtn}
                  onSaveBtn={handleSaveBtn}
                  
                />
              </div>
            </>
          )}

          <div className="row g-3 mb-2 ">
            <div className="col mt-0 text-end">
              <button
                onClick={handleClickOpenForm}
                type="button"
                className="btn btn-primary"
              >
                {openForm?"close":"New Discount"}
              </button>
            </div>
          </div>
          <div className="card shadow mb-4">
            <TableDataDiscounts
              onClick={handleEditClickOpenForm}
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
              onToggleBtn={handleToggleBtn}
              discounts={discounts}
              setDiscounts={setDiscounts}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
