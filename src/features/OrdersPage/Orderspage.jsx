import { getDatabase, ref, remove, set } from "firebase/database";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import TableDataOrders from "../../components/TableData/TableDataOrders";
import orderApi  from "../../api/orderApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const db = getDatabase();
  const notify = (type, message) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar:
       false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // dùng để toggle form , reset id về 0 , đổi trạng thái button thành thêm (không chuyền đi đâu hết)
//   const handleClickOpenForm = (e, formValue) => {
//     setOpenForm((x) => !x);
//     setUsertId(0);
//     setStatusBtn(true);
//   };

  // lấy ra id , đổi trạng thái button thành sửa (chuyền cho dataTable)
//   const handleEditClick = (userId) => {
//     setUsertId(userId);
//     setStatusBtn(false);
//   };

  // click nút edit trong bảng thì mở form (chuyền cho dataTable)
//   const handleEditClickOpenForm = () => {
//     setOpenForm(true);
//   };
  // xóa user handler


  const handleRemoveClick = async (orderId) => {
    if (window.confirm("Bạn thực sự muốn xóa ?")) {
      // remove(ref(db, "/products/" + productId));
    
      await orderApi.remove(orderId)
      setOrders(orders.filter(item => item.id !== orderId))
      notify("info", "Xóa thành công !");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  // tắt bặt trạng thái người dùng
  const handleToggleBtn = (order,status) => {
    const { id, ...u } = order;
    console.log(order);
    console.log(status);
    switch (status) {
      case 0: 
      set(ref(db, "/orders/" + id), {
        ...u,
        status: 0,
      });
      break;

      case 1:
      set(ref(db, "/orders/" + id), {
        ...u,
        status: 1,
      });
      break;

      case 2:
      set(ref(db, "/orders/" + id), {
        ...u,
        status: 2,
      });
      break;

      default:
        break;
    }
  };


  useEffect(() => {
    orderApi.getAll().then(res => {
      setOrders(res.data)
    })
}, [])
  
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Oders</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-2">
          
          <div className="card shadow mb-4">
            <TableDataOrders
            //   onClick={handleEditClickOpenForm}
            //   onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
              orders = {orders}
              onToggleBtn={handleToggleBtn}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
