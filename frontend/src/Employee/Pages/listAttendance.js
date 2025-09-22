import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Search from "../../Shared/Components/UiElements/Search";
import AttendanceTable from "./Components/listAttendance";
import Header from "../../Shared/Components/UiElements/header";

const Attendance = () => {
  const [attendance, setattendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployee, setfilteredEmployee] = useState([]);
  const [employee, setemployee] = useState([]);

  useEffect(() => {
    setfilteredEmployee(employee);
  }, [employee]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employee.filter(
      (employee) =>
        employee.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        employee.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilteredEmployee(filtered);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/employee")
      .then((res) => {
        setemployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/attendance/attendancelist")
      .then((res) => {
        setattendance(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header/>

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Attendance List</h1>
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Search By ID / Name"}
            />
          </div>
          <AttendanceTable
            employee={filteredEmployee}
            Attendance={attendance}
            loading={loading}
            setloading={setLoading}
          />
        </Card>
      </div>
    </>
  );
};

export default Attendance;
