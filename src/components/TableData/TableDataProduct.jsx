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
import classNames from "classnames";
import PropTypes from "prop-types";

TableDataProduct.propTypes = {
  onEditClick: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

export default function TableDataProduct({
  onEditClick = null,
  onClick = null,
  onRemoveClick = null,
}) {
  const [productList, setProductList] = useState([]);
  const db = getDatabase();

  const handleEditClick = (product) => {
    if (onClick) onClick();
    if (onEditClick) onEditClick(product.id);
  };
  const handleRemoveClick = (product) => {
    if (onRemoveClick) onRemoveClick(product.id);
  };

  // }
  useEffect(() => {
    // cần change
    (() => {
      const db = getDatabase();
      const productsRef = ref(db, "products");
      onValue(productsRef, (snapshot) => {
        const newProductList = [...productList];
        snapshot.forEach((item) => {
          newProductList.push({
            product_name: item.val().product_name,
            number: item.val().number,
            default_price: item.val().default_price,
            product_img: item.val().product_img.main_img,
            ship_id: item.val().ship_id,
            description: item.val().description,
            category_id: item.val().category_id,
            user_id: item.val().user_id,
          });
        });
        setProductList([...newProductList]);
      });
    })();
  }, []);

  console.log(productList);
  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Quanity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index} className="">
              <td className="pl-0" width={"300px"}>
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={product.product_img}
                    alt={product.product_name}
                    className="product_img"
                  />
                </div>
              </td>
              <td width={"300px"} className="pt-84">
                {product.product_name}
              </td>
              <td width={"100px"} className="pt-84">
                {product.number}
              </td>
              <td width={"150px"} className="pt-84">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.default_price)}
              </td>
              <td className="pt-84">
                <button
                  onClick={() => {
                    handleEditClick(product);
                  }}
                  type="button"
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleRemoveClick(product);
                  }}
                  type="button"
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
