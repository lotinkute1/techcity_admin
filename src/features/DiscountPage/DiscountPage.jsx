import { getDatabase, ref, remove, set } from "firebase/database";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./css/style.css";
// import TableData from "../../components/TableData/TableData";
import TableDataDiscounts from "../../components/TableData/TableDataDiscounts";
import FormInput from "./components/FormInput";
export default function DiscountPage() {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [discountId, setDiscountId] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true);//thay đổi trạng thái button trong form thái thêm/sửa
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
  const handleRemoveClick = (discountId) => {
    console.log(discountId);
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      remove(ref(db, "/discounts/" + discountId));
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  
  // thêm user handler
  const handleAddBtn = (formValue) => {
    console.log("thong tin can add la:");
    console.log(formValue);
    if (
      formValue.discount_img !== "" &&
      formValue.discount_name !== "" &&
      formValue.end_date !== "" &&
      formValue.start_date !== "" &&
      formValue.status !== "" 
      
    ) {
      set(ref(db, "discounts/" + uuidv4()), {
        discount_img: formValue.discount_img.trim(),
        discount_name: formValue?.discount_name?.trim(),
        end_date: formValue.end_date?.trim(),
        start_date:  formValue.start_date?.trim() ,
        status: 1,
      });
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
  const handleSaveBtn = (formValue) => {
    console.log("thong tin can edit la");
    console.log(formValue);
    if (
      discountId &&
      formValue.discount_img !== "" &&
      formValue.discount_name !== "" &&
      formValue.end_date !== "" &&
      formValue.start_date !== "" &&
      formValue.status !== "" 
    ) {
      set(ref(db, "/discounts/" + discountId), { ...formValue });
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
