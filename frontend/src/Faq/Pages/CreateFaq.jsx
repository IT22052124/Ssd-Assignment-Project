import React from "react";
import FaqForm from "./Components/FaqForm";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const CreateFaq = () => {
  return (
    <>
      <div>
        <Navbar />
        <Header/>
        <FaqForm />
      </div>
    </>
  );
};

export default CreateFaq;