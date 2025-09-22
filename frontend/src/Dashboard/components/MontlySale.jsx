import { ClockIcon } from "@heroicons/react/24/outline";
import StatisticsChart from "./statistic-chart";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Montlychart = () => {
  const [totalunit, setTotalUnit] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product/Months")
      .then((res) => {
        setTotalUnit(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(totalunit);
  const chartsConfig = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#37474f",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#37474f",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const dailySalesChart = {
    type: "line",
    height: 500,
    series: [
      {
        name: "Sales",
        data: totalunit.slice(0, 9).reverse().map(entry => entry?.totalUnitsSold ?? 0),
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: totalunit.slice(0, 9).reverse().map(entry => moment(entry?.month).format("MMM") ?? 0),
      },
    },
  };

  const statisticsChartsData = [
    {
      color: "white",
      title: "Monthly Sales",
      description: "",
      footer: "",
      chart: dailySalesChart,
    },
  ];

  return (
    <>
      {statisticsChartsData.map((props) => (
        <StatisticsChart 
          key={props.title}
          {...props}
          
        />
      ))}
    </>
  );
};

export default Montlychart;
