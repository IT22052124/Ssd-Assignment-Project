import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Pagination from "../Shared/Components/FormElements/Pagination";
import Header from "../Shared/Components/UiElements/header";
import CustomerReport from "./Components/CustomerReport";
import Card from "../Shared/Components/UiElements/Card";


const TopCustomers = () => {

  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          
          <CustomerReport/>
        </div>
      </Card>

    </div>

    </>
  );
};

export default TopCustomers;
