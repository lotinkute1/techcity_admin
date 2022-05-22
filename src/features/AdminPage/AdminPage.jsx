import { log } from "@antv/g2plot/lib/utils";
import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import NumberFormat from 'react-number-format';
import ratingApi from "../../api/ratingApi";
import ColumnChart from "../../components/Chart/Column";
import LineChart from "../../components/Chart/Line";
import discountApi from "../../api/discountApi";
import orderApi from "../../api/orderApi";
import './style.css'
import userApi from "../../api/userApi";

export default function AdminPage() {
  const productSoldByMonthData = [
    // {
    //   month: "1991",
    //   sold: 3,
    // },
    
  ];
  const productSoldByCategoryData = [
    {
      type: "Điện thoại",
      sales: 0,
    },
    {
      type: "Laptop",
      sales: 0,
    },
    {
      type: "Đồng hồ",
      sales: 0,
    },
    {
      type: "Tablet",
      sales: 0,
    },
    {
      type: "Linh kiện pc",
      sales: 0,
    },
    {
      type: "Phụ kiện điện thoại",
      sales: 0,
    }
  ];
  const [productSoldByMonth,setProductSoldByMonth]=useState(productSoldByMonthData)
  const [productSoldByCategory,setProductSoldByCategory]=useState(productSoldByCategoryData)
  const [ratingsCount, setRatingsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [orderProductCount, setOrderProductCount] = useState(0);
  const getSoldData = async()=>{
    try {
      var result = await userApi.getSoldData();
      const { rating_count,product_count,order_total,getOrderProductCount ,soldByMonth} = result.data;
      setRatingsCount(rating_count);
      setProductsCount(product_count);
      setOrderTotalPrice(order_total);
      setOrderProductCount(getOrderProductCount);
      const NewsoldByMonth = soldByMonth.map((item)=>{
        return {
          month:"tháng " + item.month,
          sold:Number(item.sold)
        }
      })
      setProductSoldByMonth(NewsoldByMonth);
    } catch (e) {
      console.log(result.message);
    }
  }
  const getSoldProductsCountByCategory = async () => {
    try {
      var result = await orderApi.getSoldProductsCountByCategory();
      const { data } = result;
      const soldProductData =data.map((item)=>{
        return{
          type: item.category_name,
          sales:Number(item.product_sold)
        }
      });
      setProductSoldByCategory([...soldProductData]);
    } catch (e) {
      console.log(result.message);
    }
  }
  useEffect(() => {
    getSoldData();
    getSoldProductsCountByCategory();
  }, []);
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Admin</h1>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Sản Phẩm Đã Bán
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderProductCount}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Tổng Tiền Thu Về
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <NumberFormat
                      value={orderTotalPrice}
                      className=""
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"₫"}
                      renderText={(value, props) => (
                        <span {...props}>{value} </span>
                      )}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-credit-card fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Sản phẩm
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {productsCount}
                      </div>
                    </div>
                    {/* <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Bình Luận
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {ratingsCount}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Content Column */}
        <div className="col-lg mb-2">
          {/* Project Card Example */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Sản phẩm bán được ở từng danh mục</h6>
            </div>
            <div className="card-body">
              <ColumnChart data={productSoldByCategory} />
              <div className="chart_title">
                <h6 className="m-0 font-weight-bold text-primary ">Sản phẩm bán được theo tháng</h6>
              </div>
              <LineChart data={productSoldByMonth} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Thông tin về bạn
              </h6>
            </div>
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Accusantium nam quas minima eligendi unde quos cum nisi totam
                ipsa, dignissimos, culpa, possimus odit laboriosam dolores et
                modi quibusdam atque saepe!
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
