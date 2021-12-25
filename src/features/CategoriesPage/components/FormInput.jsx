import React, { useState } from "react";
import PropTypes from "prop-types";

FormInput.propTypes = {
  onChange: PropTypes.func,
};

function FormInput({ onChange = null }) {
  const initialFormData = Object.freeze({
    category_name: "",
    status: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    if (!onChange) return;
    onChange(formValue);
    Array.from(document.querySelectorAll("input[name]")).forEach((input) => {
      input.value = "";
    });
    setFormValue(initialFormData);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!onChange) return;
    onChange(formValue);
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
              name="category_name"
              className="form-control"
              id="categort-name"
              type="text"
              onChange={handleInputChange}
              value={formValue.category_name}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="price">Status</label>
            <input
              name="status"
              className="form-control"
              id="status"
              type="text"
              value={formValue.status}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      <div className="row g-3 mb-5 ">
        <div className="col mt-0 p-0 text-end">
          <button
            type="submit"
            onClick={handleAddClick}
            className="btn btn-success"
          >
            Add
          </button>
          <button
            type="submit"
            onClick={handleSaveClick}
            className="btn btn-info"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default FormInput;
