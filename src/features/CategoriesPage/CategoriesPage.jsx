import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./components/FormInput";
import TableDataCategories from "../../components/TableData/TableDataCategories";
import "../../components/TableDataCategories/js/main";
import firebase from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  update,
  child,
} from "firebase/database";
CategoriesPage.propTypes = {};

function CategoriesPage(props) {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true);

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

  const handleClickOpenForm = (e, formValue) => {
    setOpenForm((x) => !x);
    setCategoryId(0);
    setStatusBtn(true);
    // console.log(formValue);
  };
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleAddBtn = (formValue) => {
    const db = getDatabase();
    if (formValue.category_name !== "" && formValue.status !== "") {
      set(ref(db, "categories/" + uuidv4()), {
        ...formValue,
        category_name: formValue.category_name.trim(),
        status: formValue.status.trim(),
      });
      notify("success", "Thêm thành công !");
    }
  };

  const handleEditClick = (categoryId) => {
    setCategoryId(categoryId);
    setStatusBtn(false);
  };
  const handleRemoveClick = (categoryId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      remove(ref(db, "/categories/" + categoryId));
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const handleSaveBtn = (formValue) => {
    if (
      categoryId &&
      formValue.category_name !== "" &&
      formValue.status !== ""
    ) {
      set(ref(db, "/categories/" + categoryId), { ...formValue });
      notify("success", "Sửa thành công !");
    }
  };

  const handleToggleBtn = (category) => {
    console.log(category);
    if (category.status === 0) {
      set(ref(db, "/categories/" + category.id), {
        category_name: category.category_name,
        status: 1,
      });
    } else {
      set(ref(db, "/categories/" + category.id), {
        category_name: category.category_name,
        status: 0,
      });
    }
  };

  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Categories</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-3">
          {openForm && (
            <>
              <div className="row g-3 mb-2 ">
                <FormInput
                  statusBtn={statusBtn}
                  onClick={handleEditClickOpenForm}
                  categoryId={categoryId}
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
                New category
              </button>
            </div>
          </div>

          <div className="card shadow mb-4">
            <TableDataCategories
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

export default CategoriesPage;
