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
import firebase from "../../utils/firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function TableDataCategories() {
  const [categories, setCategories] = useState([]);
  const handleClickTogle = (e) => {
    const tableRowElement = e.target.closest(".table-row");
    if (tableRowElement) {
      tableRowElement.classList.toggle("active");
    }
  };
  // }
  useEffect(() => {
    (() => {
      const db = getDatabase();
      const categoryRef = ref(db, "categories");
      onValue(categoryRef, (snapshot) => {
        const newCategories = [...categories];
        snapshot.forEach((item) => {
          newCategories.push({
            category_name: item.val().category_name,
            status: item.val().status,
          });
        });
        setCategories([...newCategories]);
      });
    })();
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
                <tr key={index} className="table-row">
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
                    <button type="button" className="btn btn-info">
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
                        defaultChecked
                      />
                      <span
                        className="ios-switch-control-indicator"
                        defaultChecked
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
