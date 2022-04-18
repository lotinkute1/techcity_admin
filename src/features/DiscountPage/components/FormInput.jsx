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
  // onClick = null,
  discountId=null,
  statusBtn = true,
}) {
  const initialFormData = Object.freeze({
    discount_img: "",
    discount_name: "",
    end_day: "",
    start_day: "",
    status: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);
  const db = getDatabase();
  // need change
  useEffect(() => {
    let isMounted = true;
    (() => {

      const productRef = ref(db, "discounts/" + discountId);
      onValue(productRef, (snapshot) => {
        if(isMounted) setFormValue(snapshot.val());
      });
    })();
    return ()=> {isMounted = false};

  }, [discountId]);


  

  const handleInputChange = (e) => {
    if(e.target.name==="start_day"||e.target.name==="end_day") {
      setFormValue({
        ...formValue,
        [e.target.name]: formatDate2(e.target.value),
      });
    }else{

      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    }
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

  function formatDate(date="") {//thay đỏi format date từ firebase vào input (dd/mm/yyyy to yyyy-mm-dd)
    return date.split("/").reverse().join("-");

  }
  function formatDate2(date="") {//thay đỏi format date từ input sang firebase (yyyy-mm-dd to dd/mm/yyyy)
    return date.split("-").reverse().join("/");

  }
  
  console.log(formValue);
  return (
    <div className="card shadow mb-4 px-3 pt-3">
      <form className="container-fluid px-0">
        <div className="form-group row">
          {/* discount name */}
          <div className="col-sm fw-bold">
            <label htmlFor="name">Discount Name</label>
            <input
              className="form-control"
              id="discount_name"
              type="text"
              name="discount_name"
              value={formValue?.discount_name || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="name">Status</label>
            <input
              className="form-control"
              id="status"
              type="text"
              name="status"
              value={formValue?.status || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          
          {/* discount start date */}
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">start date</label>
            <input
              className="form-control"
              id="start_day"
              type="date"
              name="start_day"
              value={formatDate(formValue?.start_day)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">end date</label>
            <input
              className="form-control"
              id="end_day"
              type="date"
              name="end_day"
              value={formatDate(formValue?.end_day)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </form>

      {/* discount_img_preiew */}
      <p className="form-label  mb-0 fw-bold">discount_img</p>
      <div className="discount_img_preiew">
        <img
          src={
            formValue?.discount_img ??
            "https://ak.picdn.net/shutterstock/videos/1066290352/thumb/5.jpg?ip=x480"
          }
          alt=""
        />
      </div>
      <input
        className="form-control mt-2 mb-3"
        id="discount_img"
        type="text"
        placeholder="URL image"
        name="discount_img"
        value={formValue?.discount_img || ""}
        onChange={(e) => handleInputChange(e)}
      />

      <div className="row g-3 my-3 px-2">
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
    </div>
  );
}

export default FormInput;
