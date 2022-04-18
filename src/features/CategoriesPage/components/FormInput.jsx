import { getDatabase, onValue, ref } from "firebase/database";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

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
  categoryId,
  statusBtn = true,
  categories=[],
}) {
  const initialFormData = Object.freeze({
    category_name: "",
    status: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);

  // useEffect(() => {
  //   console.log(categoryId);
  //   const db = getDatabase();
  //   (() => {
  //     const categoryRef = ref(db, "categories/" + categoryId);
  //     onValue(categoryRef, (snapshot) => {
  //       setFormValue(snapshot.val());
  //     });
  //   })();
  // }, [categoryId]);
  useEffect(() => {
    if(categoryId) {
      setFormValue(categories.find(item => item.id === categoryId))
    }
}, [categoryId])

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
            <label htmlFor="name">Category name</label>
            <input
              className="form-control"
              id="categort-name"
              type="text"
              name="category_name"
              value={formValue?.category_name || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="price">Status</label>
            <input
              name="status"
              className="form-control"
              id="status"
              type="text"
              value={formValue?.status || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </form>
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
