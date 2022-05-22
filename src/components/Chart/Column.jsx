import React from "react";
import PropTypes from "prop-types";
import { Column } from "@ant-design/plots";

ColumnChart.propTypes = {
  data: PropTypes.any,
  moreConfig: PropTypes.any,
};

function ColumnChart({ data, moreConfig }) {
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "Đã bán",
      },
    },
    ...moreConfig,
  };
  return <Column {...config} />;
}
export default ColumnChart;
