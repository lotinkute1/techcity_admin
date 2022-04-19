import classNames from "classnames";
import { getDatabase, onValue, push, ref } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import discountApi from "../../api/discountApi";
import "./css/style.css";
import "./fonts/icomoon/style.css";

import "./js/main";

TableDataDiscounts.propTypes = {
  onEditClick: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onToggleBtn: PropTypes.func,
};
export default function TableDataDiscounts({
  onEditClick = null,
  onClick = null,
  onRemoveClick = null,
  onToggleBtn = null,
  discounts=[],
  setDiscounts
}) {
  
  const db = getDatabase();

  const handleClickTogle = (e, discount) => {
    const tableRowElement = e.target.closest(".table-row");
    if (tableRowElement) {
      tableRowElement.classList.toggle("active");
    }
    if (onToggleBtn) {
      onToggleBtn(discount);
    }
  };

  const handleEditClick = (category) => {
    if (onClick) onClick();//để mở form input
    if (onEditClick) onEditClick(category.id);//
  };
  const handleRemoveClick = (discount) => {
    if (onRemoveClick) onRemoveClick(discount.id);
  };

  // useEffect(() => {
  //   (() => {
  //     const categoryRef = ref(db, "discounts");
  //     onValue(categoryRef, (snapshot) => {
  //       const temp = [];
  //       snapshot.forEach((item) => {
  //         temp.push({
  //           id: item.key,
  //           ...item.val(),
  //         });
  //       });
  //       setDiscounts([...temp]);
  //     });
  //   })();
  // }, []);
  const getAllDiscouts = async ()=>{
    try {
      const repsonse = await discountApi.getAll();
      const {data} = repsonse;

      setDiscounts(data);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getAllDiscouts();
  },[])
//   const userTypeCSS = (userType)=>{
//     const userTypec=Number(userType);
//     switch (userTypec) {
//       case 1:
//         return "type--admin";
//       case 2:
//         return "type--supplier";
//       case 3:
//         return "type--customer";
//       default:
//         return "";
//     }
//   }

  const renderDiscout = discounts.map((discount, index) => (
    <tr
      key={index}
      className={classNames("table-row", {
        active: discount.status === 0,
      })}
    >
      {/* STT */}
      <td width={"50px"} className="">
        {index + 1}
      </td>
      {/* discount img */}

      <td className="pl-0" width={"300px"}>
        <div className="d-flex align-items-center justify-content-center">
          <div className={"banner_img"}>
            <img src={discount.discount_img} alt="" className="" />
          </div>
        </div>
      </td>

      {/* disount name */}
      <td width={"200px"} className="">
        <div className="d-flex align-items-center justify-content-center">
          <a href="/#" className="name">
            {discount.discount_name}
          </a>
        </div>
      </td>
      {/* start day */}
      <td width={"120px"} className="">
        {discount.start_day}
      </td>
      {/* end day */}
      <td width={"150px"} className="">
        {discount.end_day}
      </td>
      {/* discounts status */}
      <td width={"100px"}>
        <label className="custom-control ios-switch">
          <input
            onClick={(e) => handleClickTogle(e, discount)}
            type="checkbox"
            className="ios-switch-control-input"
            defaultChecked={parseInt(discount.status) > 0 ? true : false}
          />
          <span
            className="ios-switch-control-indicator"
            defaultChecked={parseInt(discount.status) > 0 ? true : false}
          />
        </label>
      </td>

      <td className="">
        <button
          type="button"
          onClick={() => {
            handleEditClick(discount);
          }}
          className="btn btn-info"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleRemoveClick(discount);
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
              <th scope="col">Discounts Banner</th>
              <th scope="col">Discounts Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{renderDiscout}</tbody>
        </table>
      </div>
    </>
  );
}
