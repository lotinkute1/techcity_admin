import { getDatabase, ref, remove, set } from "firebase/database";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./css/style.css";
// import TableData from "../../components/TableData/TableData";
import TableDataUsers from "../../components/TableData/TableDataUsers";
import FormInput from "./components/FormInput";

import userApi from "../../api/userApi";
export default function UsersPage() {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [userId, setUsertId] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true); //thay đổi trạng thái button trong form thái thêm/sửa

  const [users, setUsers] = useState([]);

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
    setUsertId(0);
    setStatusBtn(true);
  };

  // lấy ra id , đổi trạng thái button thành sửa (chuyền cho dataTable)
  const handleEditClick = (userId) => {
    setUsertId(userId);
    setStatusBtn(false);
  };

  // click nút edit trong bảng thì mở form (chuyền cho dataTable)
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };
  // xóa user handler

  const handleRemoveClick = async (userId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      // remove(ref(db, "/products/" + productId));
      await userApi.deleteUser(userId);
      setUsers(users.filter((item) => item.id !== userId));
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  // thêm user handler
  const handleAddBtn = async (formValue) => {
    console.log("thong tin can add la:");
    console.log(formValue);
    if (
      formValue.email !== "" &&
      formValue.join_date !== "" &&
      formValue.name !== "" &&
      formValue.password !== "" &&
      formValue.phone_number !== "" &&
      formValue.user_address !== "" &&
      formValue.user_ava !== "" &&
      formValue.user_type !== ""
    ) {
      console.log(formValue);
      const response = await userApi.register(formValue);
      // set(ref(db, "products/" + uuidv4()), {
      //   product_name: formValue.product_name.trim(),
      //   number: formValue.number.trim(),
      //   default_price: formValue.default_price.trim(),
      //   product_img: { main_img: formValue.main_img.trim() },
      //   ship_id: formValue.ship_id.trim(),
      //   description: formValue.description.trim(),
      //   category_id: formValue.category_id.trim(),
      //   user_id: formValue.user_id.trim(),
      //   brand: formValue.brand.trim(),
      // });
      setUsers([...users, response.data]);
      notify("success", "Thêm thành công !");
    }
    // handleClickOpenForm();
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
  // bấm nút save (edit) trong form
  const handleSaveBtn = async (formValue) => {
    console.log("thong tin can edit la");
    console.log(formValue);
    console.log(userId);
    if (
      userId &&
      formValue.email !== "" &&
      formValue.join_date !== "" &&
      formValue.name !== "" &&
      formValue.password !== "" &&
      formValue.phone_number !== "" &&
      formValue.user_address !== "" &&
      formValue.user_ava !== "" &&
      formValue.user_status !== "" &&
      formValue.user_type !== ""
    ) {
      const response = await userApi.update(userId, formValue);
      setUsers(
        users.map((item) => {
          if (item.id === userId) {
            return response.data;
          }
          return item;
        })
      );
      notify("success", "Sửa thành công !");
    }
    handleClickOpenForm();
  };

  // fetch all data of user
  useEffect(() => {
    (async () => {
      const res = await userApi.getAll();
      console.log(res.data);
      setUsers(res.data);
    })();
  }, []);

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
                  // onClick={handleEditClickOpenForm}
                  userId={userId}
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
                {openForm ? "close" : "New user"}
              </button>
            </div>
          </div>
          <div className="card shadow mb-4">
            <TableDataUsers
              onClick={handleEditClickOpenForm}
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
              onToggleBtn={handleToggleBtn}
              users={users}
              setUsers={setUsers}
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
