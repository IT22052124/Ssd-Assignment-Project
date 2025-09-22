import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/EmployeeTable";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";
import EmployeeReport from "./Components/employeeReport"


const Report = () => {
 
 

  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          
          <EmployeeReport/>
        </div>
      </Card>

    </div>

    </>
  );
};

export default Report;
