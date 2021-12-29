import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./components/FormInput";
import TableDataProduct from "../../components/TableData/TableDataProduct";
import firebase from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, remove, set } from "firebase/database";

ProductsPage.propTypes = {};

function ProductsPage(props) {
  const db = getDatabase();
  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(0);
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
    setProductId(0);
    setStatusBtn(true);
  };
  const handleEditClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleAddBtn = (formValue) => {
    const db = getDatabase();
    if (
      formValue.product_name !== "" &&
      formValue.number !== "" &&
      formValue.default_price !== "" &&
      formValue.main_img !== "" &&
      formValue.ship_id !== "" &&
      formValue.description !== "" &&
      formValue.category_id !== "" &&
      formValue.user_id !== ""
    ) {
      set(ref(db, "products/" + uuidv4()), {
        product_name: formValue.product_name.trim(),
        number: formValue.number.trim(),
        default_price: formValue.default_price.trim(),
        product_img: { main_img: formValue.main_img.trim() },
        ship_id: formValue.ship_id.trim(),
        description: formValue.description.trim(),
        category_id: formValue.category_id.trim(),
        user_id: formValue.user_id.trim(),
      });
      notify("success", "Thêm thành công !");
    }

  };

  const handleEditClick = (productId) => {
    setProductId(productId);
    setStatusBtn(false);
  };

  const handleRemoveClick = (productId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      remove(ref(db, "/products/" + productId));
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const handleSaveBtn = (formValue) => {
    if (
      productId &&
      formValue.product_name !== "" &&
      formValue.number !== "" &&
      formValue.default_price !== "" &&
      formValue.main_img !== "" &&
      formValue.ship_id !== "" &&
      formValue.description !== "" &&
      formValue.category_id !== "" &&
      formValue.user_id !== ""
    ) {
      set(ref(db, "/products/" + productId), { ...formValue });
      notify("success", "Sửa thành công !");
    }
  };

  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Products</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-3">
          {openForm && (
            <>
              <div className="row g-3 mb-2 ">
                <FormInput
                  statusBtn={statusBtn}
                  onClick={handleEditClickOpenForm}
                  productId={productId}
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
                New product
              </button>
            </div>
          </div>

          <div className="card shadow mb-4">
            <TableDataProduct
              onClick={handleEditClickOpenForm}
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
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

export default ProductsPage;
