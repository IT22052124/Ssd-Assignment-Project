import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import DeliveryFormUpdate from "./Components/DeliveryFormUpdate";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const UpdateDelivery = () => {
  return (
    <>
    <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar select={"Delivery Details"}/>
    <Header/>
    <div className="main-content ml-64 w-full h-screen overflow-y-auto bg-gray-50 pt-14 dark:bg-gray-900">
      <DeliveryFormUpdate/>
      </div>
    </div>
  </>
  );
};

export default UpdateDelivery;
