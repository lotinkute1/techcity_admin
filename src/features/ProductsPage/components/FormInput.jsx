import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

FormInput.propTypes = {
  onAddBtn: PropTypes.func,
  onSaveBtn: PropTypes.func,
  onClick: PropTypes.func,
  statusBtn: PropTypes.bool,
};

function FormInput({
  onAddBtn = null,
  onSaveBtn = null,
  onClick = null,
  productId,
  statusBtn = true,
}) {
  const initialFormData = Object.freeze({
    // need change
    product_name: "",
    number: "",
    default_price: "",
    ship_id: "",
    description: "",
    main_img: "",
    category_id: "",
    user_id: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);
  const [categoryIds, setCategoryIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const db = getDatabase();

  // need change
  useEffect(() => {
    console.log(productId);
    (() => {
      const productRef = ref(db, "products/" + productId);
      onValue(productRef, (snapshot) => {
        setFormValue(snapshot.val());
      });
    })();
  }, [productId]);

  useEffect(() => {
    (() => {
      const categoryRef = ref(db, "categories");
      onValue(categoryRef, (snapshot) => {
        const newCategoryIds = [...categoryIds];
        for (const id in snapshot.val()) {
          newCategoryIds.push({
            id,
          });
        }
        setCategoryIds([...newCategoryIds]);
      });
    })();
  }, []);

  useEffect(() => {
    (() => {
      const userRef = ref(db, "users");
      onValue(userRef, (snapshot) => {
        const newUserid = [...userIds];
        for (const id in snapshot.val()) {
          newUserid.push({
            id,
          });
        }
        setUserIds([...newUserid]);
      });
    })();
  }, []);

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (!onAddBtn) return;
    onAddBtn(formValue);
    Array.from(document.querySelectorAll("input[name]")).forEach((input) => {
      input.value = "";
    });
    setFormValue(initialFormData);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!onSaveBtn) return;
    onSaveBtn(formValue);
    Array.from(document.querySelectorAll("input[name]")).forEach((input) => {
      input.value = "";
    });
    setFormValue(initialFormData);
  };

  console.log(formValue);
  return (
    <>
      <form className="container">
        <div className="form-group row">
          <div className="col-sm fw-bold">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              type="text"
              name="product_name"
              value={formValue?.product_name || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              id="price"
              type="text"
              name="default_price"
              value={formValue?.default_price || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              id="quantity"
              type="text"
              name="number"
              value={formValue?.number || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">Ship_id</label>
            <input
              className="form-control"
              id="ship_id"
              type="text"
              name="ship_id"
              value={formValue?.ship_id || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        {/*  */}
        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="category_id">Category_ID: </label>
            <select
              className="select-input"
              name="category_id"
              id="category_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">--Chọn ID--</option>
              {categoryIds.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  selected={item.id === formValue?.category_id}
                >
                  {item.id}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="user_id">User_ID: </label>
            <select
              className="select-input"
              name="user_id"
              id="user_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">--Chọn ID--</option>

              {userIds.map((item) => (
                <option
                  key={item.id}
                  selected={item.id === formValue?.user_id}
                  value={item.id}
                >
                  {item.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control rounded-3"
              id="description"
              rows="5"
              name="description"
              value={formValue?.description || ""}
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>
        </div>
      </form>

      <p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        id="ship_id"
        type="text"
        placeholder="URL image"
        name="main_img"
        onChange={(e) => handleInputChange(e)}
      />

      <div className="row g-3 mb-5 ">
        <div className="col mt-0 p-0 text-end">
          {statusBtn ? (
            <button
              type="submit"
              onClick={handleAddClick}
              className="btn btn-success"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSaveClick}
              className="btn btn-info"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FormInput;
