import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import FaqFormUpdate from "./Components/FaqFormupdate";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const UpdateFaq = () => {
  return (
    <>
      <div>
        <Navbar />
        <Header/>
        <FaqFormUpdate />
      </div>
    </>
  );
};

export default UpdateFaq;