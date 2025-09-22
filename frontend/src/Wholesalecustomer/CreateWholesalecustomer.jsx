import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import WholesalecustomerForm from "./Components/WholesalecustomerForm";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const CreateWholesalecustomer = () => {
  return (
    <>
      <div>
        <Navbar />
        <WholesalecustomerForm  />
      </div>
    </>
  );
};

export default CreateWholesalecustomer;