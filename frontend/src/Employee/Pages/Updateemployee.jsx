import React from "react";
import Navbar from '../../Shared/Components/UiElements/Navbar';
import Card from "../../Shared/Components/UiElements/Card";
import EmployeeFormUpdate from "./Components/employeeformUpdate";
import Header from "../../Shared/Components/UiElements/header";

const Updateemployee = () => {
  return (
    <>
    <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar select={"Product Details"}/>
      <Header/>
      <div className="main-content ml-64 w-full h-screen overflow-y-auto bg-gray-50 pt-14 dark:bg-gray-900">
        <EmployeeFormUpdate />
      </div>
      </div>
    </>
  );
};

export default Updateemployee;
