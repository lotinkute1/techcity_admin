import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// import TableData from "../../components/TableData/TableData";
import TableDataUsers from "../../components/TableData/TableDataUsers";
import FormInput from "./components/FormInput";
export default function UsersPage() {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);//trặng thái thêm/sửa
  const [productId, setProductId] = useState(0);
  
  const handleClickOpenForm = (e, formValue) => {
    setOpenForm((x) => !x);
    setProductId(0);
    setStatusBtn(true);
  };
  // click nút edit thì mở form
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleAddBtn = (formValue) => {
    if (
      formValue.email !== "" &&
      formValue.join_date !== "" &&
      formValue.name !== "" &&
      formValue.passowrd !== "" &&
      formValue.phone !== "" &&
      formValue.user_address !== "" &&
      formValue.user_ava !== "" &&
      formValue.user_status !== ""&&
      formValue.user_type !== ""
    ) {
      set(ref(db, "users/" + uuidv4()), {
        email: formValue.email.trim(),
        join_date: formValue.join_date.trim(),
        name: formValue.name.trim(),
        passowrd:  formValue.passowrd.trim() ,
        phone: formValue.phone.trim(),
        user_address: formValue.user_address.trim(),
        user_ava: formValue.user_ava.trim(),
        user_status: formValue.user_status.trim(),
        user_type: formValue.user_type.trim(),
      });
      // notify("success", "Thêm thành công !");
    }

  };
  // tắt bặt trạng thái người dùng
  const handleToggleBtn = (user) => {
    const { id, user_status, ...u } = user;
    if (user.user_status === 0) {
      set(ref(db, "/users/" + id), {
        ...u,
        user_status: 1,
      });
    } else {
      set(ref(db, "/users/" + id), {
        ...u,
        user_status: 0,
      });
    }
  };
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Users</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-2">

          {openForm && (
            <>
              <div className="row g-3 mb-2 ">
                <FormInput
                  statusBtn={statusBtn}
                  onClick={handleEditClickOpenForm}
                  // productId={productId}
                  onAddBtn={handleAddBtn}
                  // onSaveBtn={handleSaveBtn}
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
                {openForm?"close":"New user"}
              </button>
            </div>
          </div>
          <div className="card shadow mb-4">
            <TableDataUsers
              // onClick={handleEditClickOpenForm}
              // onEditClick={handleEditClick}
              // onRemoveClick={handleRemoveClick}
              onToggleBtn={handleToggleBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
}
