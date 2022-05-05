import { getDatabase, ref, remove, set } from "firebase/database";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import categoryApi from "../../api/categoryApi";
import "../../components/TableData/js/main";
import TableDataCategories from "../../components/TableData/TableDataCategories";
import FormInput from "./components/FormInput";

CategoriesPage.propTypes = {};

function CategoriesPage(props) {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true);
  const [categories, setCategories] = useState([]);
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
  };
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleAddBtn = async (formValue) => {

    if (formValue.category_name !== "" && formValue.status !== "") {
     const response =  await categoryApi.add(formValue)
     console.log(response)
      setCategories([...categories, response])
      notify("success", "Thêm thành công !");
    }
  };

  const handleEditClick = (categoryId) => {
    setCategoryId(categoryId);
    setStatusBtn(false);
  };
  const handleRemoveClick = async (categoryId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      await categoryApi.delete(categoryId)
      setCategories(categories.filter(item => item.id !== categoryId))
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const handleSaveBtn = async (formValue) => {
    if (
      categoryId &&
      formValue.category_name !== "" &&
      formValue.status !== ""
    ) {
      const response = await categoryApi.update(categoryId,formValue)
      setCategories(categories.map(item => {
          if(item.id === categoryId) {
            return response.data
          }
          return item
      }))
      notify("success", "Sửa thành công !");
    }
  };

  const handleToggleBtn = (category) => {
    // console.log(category);
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
              categories={categories}
              setCategories = {setCategories}
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
