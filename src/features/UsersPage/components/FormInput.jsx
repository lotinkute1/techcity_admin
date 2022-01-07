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
  userId,
  statusBtn = true,
}) {
  const initialFormData = Object.freeze({
    email: "",
    join_date: "",
    name: "",
    passowrd: "",
    phone: "",
    user_address: "",
    user_ava: "",
    user_status: "",
    user_type: "",
  });

  const [formValue, setFormValue] = useState(initialFormData);
  const [userIds, setUserIds] = useState([]);
  const db = getDatabase();
  
  // need change
  useEffect(() => {
    let isMounted = true;
    (() => {

      const productRef = ref(db, "users/" + userId);
      onValue(productRef, (snapshot) => {
        if(isMounted) setFormValue(snapshot.val());
      });
    })();
    return ()=> {isMounted = false};

  }, [userId]);

  // lấy ra danh user type
  useEffect(() => {
    let isMounted = true;
    (() => {
      
      const userRef = ref(db, "users");
      onValue(userRef, (snapshot) => {
        const newUserid = [];
        snapshot.forEach((item) => {
          newUserid.push({
            user_type: item.val().user_type,
          });
        });
        if(isMounted) setUserIds([...newUserid]);
        
      });
    })();
    return ()=> {isMounted = false};
  }, []);

  const handleInputChange = (e) => {
    if(e.target.name==="join_date") {
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
  const renderOptions = ()=>{
    let userTypeArr=[];
    return userIds.map((item, index) =>{
      if(!userTypeArr.includes(item.user_type)){
        userTypeArr.push(item.user_type);
        return (
          <option key={index} value={item.user_type}>
            {item.user_type===1?"admin":(item.user_type===2?"supplier":"user")}
          </option>
        )
      }else return null;
    })
  }
  console.log(formValue);
  return (
    <div className="card shadow mb-4 px-3 pt-3">
      <form className="container-fluid px-0">
        <div className="form-group row">
          {/* input user name */}
          <div className="col-sm fw-bold">
            <label htmlFor="name">User name</label>
            <input
              className="form-control"
              id="name"
              type="text"
              name="name"
              value={formValue?.name || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {/* user password */}
          <div className="col-sm fw-bold">
            <label htmlFor="price">password</label>
            <input
              className="form-control"
              id="password"
              type="text"
              name="password"
              // autoComplete="on"
              value={formValue?.password || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="form-group row mt-2">
          {/* email */}
          <div className="col-sm fw-bold">
            <label htmlFor="quantity">email</label>
            <input
              className="form-control"
              id="email"
              type="text"
              name="email"
              value={formValue?.email || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {/* user phone */}
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">phone</label>
            <input
              className="form-control"
              id="phone"
              type="text"
              name="phone"
              value={formValue?.phone || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          {/* user address */}
          <div className="col-sm fw-bold">
            <label htmlFor="quantity">user_address</label>
            <input
              className="form-control"
              id="user_address"
              type="text"
              name="user_address"
              value={formValue?.user_address || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {/* user join date */}
          <div className="col-sm fw-bold">
            <label htmlFor="ship_id">join_date</label>
            <input
              className="form-control"
              id="join_date"
              type="date"
              name="join_date"
              value={formatDate(formValue?.join_date)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        {/*  */}
        <div className="form-group row mt-2">
          <div className="col-sm fw-bold">
            <label htmlFor="user_id">User_Type: </label>
            <select
              className="select-input"
              name="user_type"
              id="user_type"
              onChange={(e) => handleInputChange(e)}
              value={formValue?.user_type}
            >
              <option value="">--Chọn Type--</option>
              {renderOptions()}
              
            </select>
          </div>
        </div>
      </form>

      <p className="form-label  mb-0 fw-bold">user_ava</p>
      <div className="user_ava_preview">
        <img
          src={
            formValue?.user_ava ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU"
          }
          alt=""
        />
      </div>
      <input
        className="form-control mt-2 mb-3"
        id="user_ava"
        type="text"
        placeholder="URL image"
        name="user_ava"
        value={formValue?.user_ava || ""}
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
