import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const series = [
    {
      name: "Students",
      data: [
        [Date.now() - 7 * 86400000, 20],
        [Date.now() - 6 * 86400000, 40],
        [Date.now() - 5 * 86400000, 10],
        [Date.now() - 4 * 86400000, 27],
        [Date.now() - 3 * 86400000, 14],
        [Date.now() - 2 * 86400000, 33],
        [Date.now() - 86400000, 40],
        [Date.now(), 55],
      ],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },

    // markers: {
    //   size: [5],
    //   colors: "#000",
    // },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: "#6b0f2c",
    },
    title: {
      text: "Student Borrowers by Month",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: {
      type: "datetime",
      min: Date.now() - 7 * 86400000, // Where the 6 is the number of days
      max: Date.now(), // Today
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default LineChart;
