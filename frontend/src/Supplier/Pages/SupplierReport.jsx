import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card"
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Header from "../../Shared/Components/UiElements/header";
import SupplierReportDetails from "./Components/SupplierReportDetails";


const SupplierReport = () => {

  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <SupplierReportDetails/>
        </div>
      </Card>

    </div>

    </>
  );
};

export default SupplierReport