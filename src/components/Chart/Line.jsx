import React from "react";
import PropTypes from "prop-types";
import { Line } from "@ant-design/plots";

LineChart.propTypes = {
  data: PropTypes.any,
  moreConfig: PropTypes.any,
};

function LineChart({ data, moreConfig }) {
  const config = {
    data,
    xField: "month",
    yField: "sold",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
    ...moreConfig,
  };
  return <Line {...config} />;
}

export default LineChart;
