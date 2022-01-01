import classNames from "classnames";
import { getDatabase, onValue, push, ref } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import "./css/owl.carousel.min.css";
//  Bootstrap CSS
// import "./css/bootstrap.min.css";
// Style
import "./css/style.css";
import "./fonts/icomoon/style.css";
// import "./js/popper.min.js";
// import "./js/bootstrap.min.js";
// import "./js/jquery-3.3.1.min.js";
import "./js/main";

TableDataUsers.propTypes = {
  onEditClick: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onToggleBtn: PropTypes.func,
};
export default function TableDataUsers({
  onEditClick = null,
  onClick = null,
  onRemoveClick = null,
  onToggleBtn = null,
}) {
  const [users, setUsers] = useState([]);
  const db = getDatabase();

  const handleClickTogle = (e, user) => {
    const tableRowElement = e.target.closest(".table-row");
    if (tableRowElement) {
      tableRowElement.classList.toggle("active");
    }
    if (onToggleBtn) {
      onToggleBtn(user);
    }
  };

  const handleEditClick = (category) => {
    if (onClick) onClick();//để mở form input
    if (onEditClick) onEditClick(category.id);//
  };
  const handleRemoveClick = (category) => {
    if (onRemoveClick) onRemoveClick(category.id);
  };

  useEffect(() => {
    (() => {
      const categoryRef = ref(db, "users");
      onValue(categoryRef, (snapshot) => {
        const newCategories = [];
        snapshot.forEach((item) => {
          newCategories.push({
            id: item.key,
            ...item.val(),
          });
        });
        setUsers([...newCategories]);
      });
    })();
  }, []);

  const userTypeCSS = (userType)=>{
    const userTypec=Number(userType);
    switch (userTypec) {
      case 1:
        return "type--admin";
      case 2:
        return "type--supplier";
      case 3:
        return "type--customer";
      default:
        return "";
    }
  }

  const renderProduct = users.map((user, index) => (
    <tr
      key={index}
      className={classNames("table-row", {
        active: user.user_status === 0,
      })}
    >
      {/* STT */}
      <td width={"50px"} className="">
        {index + 1}
      </td>
      {/* User ava */}

      <td className="pl-0" width={"100px"}>
        <div className="d-flex align-items-center justify-content-center">
          <div className={"user_img_wrapper "+userTypeCSS(user.user_type)}>
            <img src={user.user_ava} alt="" className="user_img " />
          </div>
        </div>
      </td>
      {/* User name */}
      <td width={"100px"} className="">
        <div className="d-flex align-items-center justify-content-center">
          <a href="/#" className="name">
            {user.name}
          </a>
        </div>
      </td>
      {/* user Email */}
      <td width={"120px"} className="">
        {user.password}
      </td>
      {/* user Email */}
      <td width={"150px"} className="">
        {user.email}
      </td>
      {/* phone */}
      <td width={"100px"} className="">
        {user.phone}
      </td>
      {/* User address */}
      <td width={"150px"} className="">
        {user.user_address}
      </td>
      {/* User join date */}
      <td width={"130px"} className="">
        {user.join_date}
      </td>

      <td width={"100px"}>
        <label className="custom-control ios-switch">
          <input
            onClick={(e) => handleClickTogle(e, user)}
            type="checkbox"
            className="ios-switch-control-input"
            defaultChecked={parseInt(user.user_status) > 0 ? true : false}
          />
          <span
            className="ios-switch-control-indicator"
            defaultChecked={parseInt(user.user_status) > 0 ? true : false}
          />
        </label>
      </td>
      <td className="">
        <button
          type="button"
          onClick={() => {
            handleEditClick(user);
          }}
          className="btn btn-info"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleRemoveClick(user);
          }}
          type="button"
          className="btn btn-danger"
        >
          Remove
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">User Ava</th>
              <th scope="col">Name</th>
              <th scope="col">password</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">User address</th>
              <th scope="col">User join date</th>
              <th scope="col">status</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>{renderProduct}</tbody>
        </table>
      </div>
    </>
  );
}
