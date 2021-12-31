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
  const [shipIds, setShipIds] = useState([]);
  const db = getDatabase();

  // need change
  useEffect(() => {
    (() => {
      const productRef = ref(db, "products/" + productId);
      onValue(productRef, (snapshot) => {
        let data = {};
        if (snapshot.val()) {
          const {
            category_id,
            default_price,
            description,
            number,
            product_img,
            product_name,
            ship_id,
            user_id,
          } = snapshot.val();

          data = {
            category_id,
            default_price,
            description,
            number,
            product_img,
            product_name,
            ship_id,
            user_id,
          };
        }
        if (data.product_img) {
          const { main_img } = data.product_img;
          data = { ...data, main_img };
        }
        setFormValue({
          product_name: data.product_name,
          number: data.number,
          default_price: data.default_price,
          ship_id: data.ship_id,
          description: data.description,
          product_img: data.product_img,
          main_img: data.main_img,
          category_id: data.category_id,
          user_id: data.user_id,
        });
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

  useEffect(() => {
    (() => {
      const userRef = ref(db, "ships");
      onValue(userRef, (snapshot) => {
        const newShipid = [...shipIds];
        for (const id in snapshot.val()) {
          newShipid.push({
            id,
          });
        }
        setShipIds([...newShipid]);
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
            <label htmlFor="category_id">Ship_ID: </label>
            <select
              className="select-input"
              name="ship_id"
              id="ship_id"
              onChange={(e) => handleInputChange(e)}
              value={formValue?.ship_id}
            >
              <option value="">--Chọn ID--</option>
              {shipIds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
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
              value={formValue?.category_id}
            >
              <option value="">--Chọn ID--</option>
              {categoryIds.map((item) => (
                <option key={item.id} value={item.id}>
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
              value={formValue?.user_id}
            >
              <option value="">--Chọn ID--</option>

              {userIds.map((item, index) => (
                <option key={item.id} value={item.id}>
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
        id="main_img"
        type="text"
        placeholder="URL image"
        name="main_img"
        value={formValue?.main_img || ""}
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
