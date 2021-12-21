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

  console.log(categories);
  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <>
              <tr>
                <td width={"300px"} className="">
                  {category.category_name}
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
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
