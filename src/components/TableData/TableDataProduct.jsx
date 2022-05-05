import { getDatabase } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect } from "react";
import productApi from "../../api/productApi";
// import "./css/owl.carousel.min.css";
//  Bootstrap CSS
// import "./css/bootstrap.min.css";
// Style
import "./css/style.css";
import "./fonts/icomoon/style.css";
// import "./js/popper.min.js";
// import "./js/bootstrap.min.js";
// import "./js/jquery-3.3.1.min.js";
import "./js/main.js";

TableDataProduct.propTypes = {
  onEditClick: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

export default function TableDataProduct({
  onEditClick = null,
  onClick = null,
  onRemoveClick = null,
  productList = [],
  setProductList
}) {

  const db = getDatabase();

  const handleEditClick = (product) => {
    if (onClick) onClick();
    if (onEditClick) onEditClick(product.id);
  };
  const handleRemoveClick = (product) => {
    if (onRemoveClick) onRemoveClick(product.id);
  };

  // }

  const getAllProduct = async ()=>{
    try {
      const repsonse = await productApi.getAll();
      const {data} = repsonse;
      setProductList(data);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getAllProduct();
  },[])


  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
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
                    src={product?.img}
                    alt={product?.name}
                    className="product_img"
                  />
                </div>
              </td>
              <td width={"300px"} className="pt-84">
                {product?.name}
              </td>
              <td width={"300px"} className="pt-84">
                {product?.brand}
              </td>
              <td width={"100px"} className="pt-84">
                {product?.stock_amount}
              </td>
              <td width={"150px"} className="pt-84">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product?.price)}
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
