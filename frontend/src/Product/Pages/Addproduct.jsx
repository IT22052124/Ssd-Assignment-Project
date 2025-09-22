import React from "react";
import ProductForm from "./Components/productform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const AddProduct = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar select={"Product Details"}/>
      <Header/>
      <div className="main-content ml-64 w-full h-screen overflow-y-auto bg-gray-50 pt-14 dark:bg-gray-900">
        <ProductForm />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
