import React from "react";
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";
import InquiryForm from "./Components/InquiryForm";

const CreateInquiry = () => {
  return (
    <>
      <div>
        <CustomerHeader />
        <InquiryForm />
      </div>
    </>
  );
};

export default CreateInquiry;