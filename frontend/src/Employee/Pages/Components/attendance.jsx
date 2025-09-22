import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from "./Dropdown";
import Dropdown from "../Components/Dropdown";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import Attendance from "../listAttendance";

const MarkAttendance = () => {
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

  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/attendance/attendancelist")
      .then((res) => {
        setAttendance(res.data);
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
      .get("http://localhost:5000/employee")
      .then((res) => {
        setEmployees(res.data);

        const initialAttendanceRecords = res.data.map((employee) => {
          const selected = attendance.filter((check) => {
            if (!check || !check.employee || !check.employee._id) {
              return false;
            }
            const checkDateFormatted = convertDatabaseDate(check.date);
            return (
              check.employee._id === employee._id &&
              checkDateFormatted === dateTimeString
            );
          });
          const status = selected.length > 0 ? selected[0].status : "Absent";
          console.log(selected);
          return {
            employee: employee,
            date: dateTimeString,
            status: status,
          };
        });
        setAttendanceRecords(initialAttendanceRecords);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [attendance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/attendance/mark", {
        employee: attendanceRecords,
      })

      .then((res) => {
        Toast("Employee Attendance Submitted!! 🔥", "success");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    console.log("Attendance Records:", attendanceRecords);
  };

  const handleStatusChange = (employee, date, status) => {
    const existingRecordIndex = attendanceRecords.findIndex(
      (record) => record.employee === employee && record.date === date
    );

    if (existingRecordIndex !== -1) {
      // If record already exists, update its status
      setAttendanceRecords((prevRecords) =>
        prevRecords.map((record, index) =>
          index === existingRecordIndex ? { ...record, status } : record
        )
      );
    } else {
      // If record doesn't exist, add it to the array
      setAttendanceRecords((prevRecords) => [
        ...prevRecords,
        { employee, date, status },
      ]);
    }
  };

  const convertDatabaseDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-3xl font-semibold mb-4">Mark Employee Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <span className="text-sm text-black-500">{dateTimeString}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  Employee ID
                </th>
                <th
                  scope="col"
                  className="px-6 text-black py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-black  text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => {
                if (!employee || !employee._id) {
                  return null;
                }

                const selected = attendance.filter((check) => {
                  if (!check || !check.employee || !check.employee._id) {
                    return false; // Skip this check
                  }
                  const checkDateFormatted = convertDatabaseDate(check.date);
                  return (
                    check.employee._id === employee._id &&
                    checkDateFormatted === dateTimeString
                  );
                });
                return (
                  <tr key={employee._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.ID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Dropdown
                        employee={employee}
                        date={dateTimeString}
                        onStatusChange={handleStatusChange}
                        selected={selected}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
