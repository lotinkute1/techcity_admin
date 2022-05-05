import classNames from "classnames";
import {
  getDatabase, onValue, ref
} from "firebase/database";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";
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

TableDataCategories.propTypes = {
  onEditClick: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onToggleBtn: PropTypes.func,
};
export default function TableDataCategories({
  onEditClick = null,
  onClick = null,
  onRemoveClick = null,
  onToggleBtn = null,
  categories=[],
  setCategories
}) {


  const handleClickTogle = (e, category) => {
    const tableRowElement = e.target.closest(".table-row");
    if (tableRowElement) {
      tableRowElement.classList.toggle("active");
    }
    if (onToggleBtn) {
      onToggleBtn(category);
    }
  };

  const handleEditClick = (category) => {
    if (onClick) onClick();
    if (onEditClick) onEditClick(category.id);
  };
  const handleRemoveClick = (category) => {
    if (onRemoveClick) onRemoveClick(category.id);
  };

  // useEffect(() => {
  //   (() => {
  //     const categoryRef = ref(db, "categories");
  //     onValue(categoryRef, (snapshot) => {
  //       const newCategories = [...categories];
  //       for (const id in snapshot.val()) {
  //         newCategories.push({
  //           id,
  //           category_name: snapshot.val()[id].category_name,
  //           status: snapshot.val()[id].status,
  //         });
  //       }
  //       setCategories([...newCategories]);
  //     });
  //   })();
  // }, []);
  const getAllCatelory = async ()=>{
    try {
      const repsonse = await categoryApi.getAll();
      const {data} = repsonse;
      setCategories(data);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getAllCatelory();
  },[])
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
               
              >
                <td width={"300px"} className="">
                  <div className="d-flex align-items-center justify-content-center">
                    <a href="/#" className="name">
                      {category.category_name}
                    </a>
                  </div>
                </td>
                <td width={"100px"} className="">
                  {category.status}
                </td>

                <td className="">
                  <button
                    type="button"
                    onClick={() => {
                      handleEditClick(category);
                    }}
                    className="btn btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveClick(category);
                    }}
                    type="button"
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>

                <td>
                  <label className="custom-control ios-switch">
                    <input
                      onClick={(e) => handleClickTogle(e, category)}
                      type="checkbox"
                      className="ios-switch-control-input"
                      defaultChecked={
                        parseInt(category.status) > 0 ? true : false
                      }
                    />
                    <span
                      className="ios-switch-control-indicator"
                      defaultChecked={
                        parseInt(category.status) > 0 ? true : false
                      }
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
