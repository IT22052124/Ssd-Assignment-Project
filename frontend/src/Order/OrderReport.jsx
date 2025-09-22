import React, { useRef, useState } from "react";
import Card from "../Shared/Components/UiElements/Card";
import Navbar from "../Shared/Components/UiElements/Navbar";
import Header from "../Shared/Components/UiElements/header";
import Datepicker from "react-tailwindcss-datepicker";
import OrderReportTable from "./Components/OrderReportTable"; // Updated import
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const OrderReport = () => {
  const currentDateTime = new Date().toLocaleString();
  const [date, setDate] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const handleValueChange = (newValue) => {
    if (newValue.startDate === null || newValue.endDate === null) {
      setDate({
        startDate: moment().startOf("month").format("YYYY-MM-DD"),
        endDate: moment().endOf("month").format("YYYY-MM-DD"),
      });
    } else {
      setDate(newValue);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Order report ${currentDateTime}`,
    onAfterPrint: () => alert("Order Report is successfully generated !"),
  });

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar select={"Order Report"}/>
        <Header />
        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between mt-5 mb-4">
            <div DateRangePicker class="flex items-center" id="dateRangePickerId">
              <Datepicker value={date} onChange={handleValueChange} />
            </div>
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Generate Report
            </button>
          </div>
          <OrderReportTable date={date} componentRef={componentRef} /> 
        </Card>
      </div>
    </>
  );
};

export default OrderReport;