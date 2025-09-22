import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import SalaryCalculatorForm from "./Components/salary";

import Header from "../../Shared/Components/UiElements/header";
const Salaryform = () => {
  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Header />

      <Card className="flex" style={{ width: "100%" }}>
        <SalaryCalculatorForm />
      </Card>
      </div>
    </>
  );
};

export default Salaryform;
