import "./fonts/icomoon/style.css";
// import "./css/owl.carousel.min.css";
//  Bootstrap CSS
// import "./css/bootstrap.min.css";
// Style
import "./css/style.css";
// import "./js/popper.min.js";
// import "./js/bootstrap.min.js";
// import "./js/jquery-3.3.1.min.js";
import "./js/main.js";
import classNames from "classnames";
import PropTypes from "prop-types";
import firebase from "../../utils/firebase";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  update,
  child,
} from "firebase/database";
import { useEffect, useState } from "react";

TableDataCategories.propTypes = {
  onClick: PropTypes.func,
};
export default function TableDataCategories({ onClick = null }) {
  const [categories, setCategories] = useState([]);
  const db = getDatabase();

  const handleClickTogle = (e) => {
    const tableRowElement = e.target.closest(".table-row");
    if (tableRowElement) {
      tableRowElement.classList.toggle("active");
    }
  };

  const handleEditClick = (category) => {
    if (onClick) onClick();
    const categoryRef = ref(db, "categories");
  };
  useEffect(() => {
    (() => {
      const categoryRef = ref(db, "categories");
      onValue(categoryRef, (snapshot) => {
        const newCategories = [...categories];
        for (const id in snapshot.val()) {
          newCategories.push({
            id,
            category_name: snapshot.val()[id].category_name,
            status: snapshot.val()[id].status,
          });
        }

        setCategories([...newCategories]);
      });
    })();
    console.log(categories);
  }, []);

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
              <>
                <tr
                  key={index}
                  className={classNames("table-row", {
                    active: category.status === 0,
                  })}
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
                    <button type="button" className="btn btn-danger">
                      Remove
                    </button>
                  </td>

                  <td>
                    <label className="custom-control ios-switch">
                      <input
                        onClick={(e) => handleClickTogle(e)}
                        type="checkbox"
                        className="ios-switch-control-input"
                        defaultChecked={category.status > 0 ? true : false}
                      />
                      <span
                        className="ios-switch-control-indicator"
                        defaultChecked={category.status > 0 ? true : false}
                      />
                    </label>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
