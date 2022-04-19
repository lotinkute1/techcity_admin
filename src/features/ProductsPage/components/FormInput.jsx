import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import categoryApi from "../../../api/categoryApi";
import { async } from "@firebase/util";
import userApi from "../../../api/userApi";
import shipApi from "../../../api/shipApi";

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
  productList =[]
}) {
  const initialFormData = Object.freeze({
    // need change
    name: "",
    stock_amount: "",
    price: "",
    ship_id: "",
    description: "",
    img: "",
    img1  : "",
    img2  : "",
    img3  : "",
    img4  : "",
    category_id: "",
    user_id: "",
    brand: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);
  const [categoryIds, setCategoryIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [shipIds, setShipIds] = useState([]);
  // const db = getDatabase();

  // need change
  // useEffect(() => {
  //   (() => {
  //     const productRef = ref(db, "products/" + productId);
  //     onValue(productRef, (snapshot) => {
  //       let data = {};
  //       if (snapshot.val()) {
  //         const {
  //           brand,
  //           category_id,
  //           price,
  //           description,
  //           stock_amount,
  //           img,
  //           img1,
  //           img2,
  //           img3,
  //           img4,
  //           name,
  //           ship_id,
  //           user_id,
  //         } = snapshot.val();

  //         data = {
  //           brand,
  //           category_id,
  //           price,
  //           description,
  //           stock_amount,
  //           img,
  //           img1,
  //           img2,
  //           img3,
  //           img4,
  //           name,
  //           ship_id,
  //           user_id,
  //         };
  //       }
  //       if (data.img) {
  //         const { img } = data.img;
  //         data = { ...data, img };
  //       }
  //       setFormValue({
  //         name: data.name,
  //         stock_amount: data.stock_amount,
  //         price: data.price,
  //         ship_id: data.ship_id,
  //         description: data.description,
  //         img: data.img,
  //         img1: data.img1,
  //         img2: data.img2,
  //         img3: data.img3,
  //         img4: data.img4,
  //         category_id: data.category_id,
  //         user_id: data.user_id,
  //         brand: data.brand,
  //       });
  //     });
  //   })();
  // }, [productId]);

  // useEffect(() => {
  //   (() => {
  //     const categoryRef = ref(db, "categories");
  //     onValue(categoryRef, (snapshot) => {
  //       const newCategoryIds = [...categoryIds];
  //       for (const id in snapshot.val()) {
  //         newCategoryIds.push({
  //           id,
  //         });
  //       }
  //       setCategoryIds([...newCategoryIds]);
  //     });
  //   })();
  // }, []);

  useEffect(() => {
      if(productId) {
        setFormValue(productList.find(item => item.id === productId))
      }
  }, [productId])

  useEffect(() => {
     (async() => {
        const response = await categoryApi.getAll()
        setCategoryIds(response.data)
     })()
  }, [])

  useEffect(() => {
      (async() => {
        const response = await userApi.getAll()
        setUserIds(response.data)
      })()
  }, [])

  useEffect(() => {
    (async () => {
        const response = await shipApi.getAll()
        setShipIds(response.data)
    })()
  },[])

  // useEffect(() => {
  //   (() => {
  //     const userRef = ref(db, "users");
  //     onValue(userRef, (snapshot) => {
  //       const newUserid = [...userIds];
  //       for (const id in snapshot.val()) {
  //         newUserid.push({
  //           id,
  //         });
  //       }
  //       setUserIds([...newUserid]);
  //     });
  //   })();
  // }, []);

  // useEffect(() => {
  //   (() => {
  //     const userRef = ref(db, "ships");
  //     onValue(userRef, (snapshot) => {
  //       const newShipid = [...shipIds];
  //       for (const id in snapshot.val()) {
  //         newShipid.push({
  //           id,
  //         });
  //       }
  //       setShipIds([...newShipid]);
  //     });
  //   })();
  // }, []);

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
              name="name"
              value={formValue?.name || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              id="price"
              type="text"
              name="price"
              value={formValue?.price || ""}
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
              name="stock_amount"
              value={formValue?.stock_amount || ""}
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
              <option value="">--Chọn ship--</option>
              {shipIds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ship_company}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              <option value="">--Chọn category--</option>
              {categoryIds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="user_id">User: </label>
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
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*  */}
        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="brand">Brand: </label>
            <input
              className="form-control"
              id="brand"
              type="text"
              name="brand"
              value={formValue?.brand || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        {/*  */}
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
        id="img"
        type="text"
        placeholder="URL image"
        name="img"
        value={formValue?.img || ""}
        onChange={(e) => handleInputChange(e)}
      />

<p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        id="img1"
        type="text"
        placeholder="URL image"
        name="img1"
        value={formValue?.img1 || ""}
        onChange={(e) => handleInputChange(e)}
      />
<p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        id="img2"
        type="text"
        placeholder="URL image"
        name="img2"
        value={formValue?.img2 || ""}
        onChange={(e) => handleInputChange(e)}
      />
<p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        id="img3"
        type="text"
        placeholder="URL image"
        name="img3"
        value={formValue?.img3 || ""}
        onChange={(e) => handleInputChange(e)}
      />
<p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        id="img4"
        type="text"
        placeholder="URL image"
        name="img4"
        value={formValue?.img4 || ""}
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
