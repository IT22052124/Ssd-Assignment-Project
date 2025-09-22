import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Attendance from "./Components/attendance";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const MarkAttendance = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center"></div>
        <Attendance />
      </Card>
      </div>
    </>
  );
};

export default MarkAttendance;
