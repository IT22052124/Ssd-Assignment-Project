import React, { useState, useEffect } from "react";
import "./employeeTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdUpdate } from "react-icons/md";

const AttendanceTable = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  var now = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[now.getDay()];
  var day = now.getDate();
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();
  var dateTimeString = dayName + ", " + day + " " + month + " " + year;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const date = new Date(dateTimeString);
  var day2 = date.getDate();
  var months2 = date.getMonth() + 1;
  const daysInMonth = new Date(year, months2, 0).getDate();

  const Headings = ["#", "Employee ID", "Employee name", "Days Worked"];
  const maxDays = selectedMonth === currentMonth ? currentDay : daysInMonth;
  for (let i = maxDays; i >= 1; i--) {
    Headings.push(`${i}/${selectedMonth}`);
  }

  const getPresentDaysCount = (employeeAttendance) => {
    const currentYear = new Date().getFullYear();

    return employeeAttendance.filter((attendance) => {
      const attendanceDate = new Date(attendance.date);
      return (
        attendanceDate.getMonth() + 1 === selectedMonth &&
        attendanceDate.getFullYear() === currentYear &&
        attendance.status === "Present"
      );
    }).length;
  };

  return (
    <> <div >
      <div className="flex items-center  ">
  <label htmlFor="monthSelect" className="mr-2">Month:</label>
  <select
    id="monthSelect"
    value={selectedMonth}
    onChange={handleMonthChange}
    className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:border-blue-500 mb-2"
  >
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(year, month).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <Table Headings={Headings} style={{ width: "100%" }}>
        {props.loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          <>
            {props.employee.map((item, index) => {
              const employeeAttendance = props.Attendance.filter(
                (attendance) => {
                  if (attendance && attendance.employee) {
                    return attendance.employee._id === item._id;
                  }
                  return false;
                }
              );

              const presentDaysCount = getPresentDaysCount(employeeAttendance);

              const attendanceMap = {};
              employeeAttendance.forEach((attendence) => {
                const attendanceDate = new Date(attendence.date);
                const day = attendanceDate.getDate();
                const month = attendanceDate.getMonth() + 1;
                const formattedDate = `${day}/${month}`;
                attendanceMap[formattedDate] = attendence.status;
              });

              return (
                <TableRow key={item._id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{item.ID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 text-center  py-4">{presentDaysCount}</td>
                  {Headings.slice(4).map((headingDate, dateIndex) => {
                    const status = attendanceMap[headingDate] || "No Data!";
                    return (
                      <td
                        key={dateIndex}
                        className={`px-6 py-4 ${
                          status === "Present"
                            ? "text-green-500"
                            : status === "Absent"
                            ? "text-red-500"
                            : status === "Pending"
                            ? "text-yellow-900"
                            : ""
                        }`}
                      >
                        {status}
                      </td>
                    );
                  })}
                </TableRow>
              );
            })}
          </>
        )}
      </Table>
      </div>
    </>
  );
};

export default AttendanceTable;
