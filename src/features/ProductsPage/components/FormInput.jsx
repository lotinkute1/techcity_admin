import React from "react";
import PropTypes from "prop-types";

FormInput.propTypes = {};

function FormInput(props) {
  return (
    <>
      <form className="container">
        <div className="form-group row">
          <div className="col-sm fw-bold">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" type="text" />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="price">Price</label>
            <input className="form-control" id="price" type="text" />
          </div>
        </div>

        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="quantity">Quantity</label>
            <input className="form-control" id="quantity" type="text" />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">Ship_id</label>
            <input className="form-control" id="ship_id" type="text" />
          </div>
        </div>

        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control rounded-3"
              id="description"
              rows="5"
            ></textarea>
          </div>
        </div>
      </form>

      <p className="form-label  mb-0 fw-bold">Images</p>
      <input
        className="form-control mt-2 mb-3"
        type="file"
        id="formFileMultiple"
        multiple
      />
      <div className="row g-3 mb-5 ">
        <div className="col mt-0 p-0 text-end">
          <button type="button" className="btn btn-success">
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default FormInput;
