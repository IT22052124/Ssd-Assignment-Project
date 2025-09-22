import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ConfirmDeliveryBox from "./ConfirmDeliveryBox";
import Card from "../../../Shared/Components/UiElements/Card";
import "./form.css";
const SalaryCalculatorForm = () => {
  var now = new Date();
  var day = now.getDate();
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();

  const navigate = useNavigate();
  const [empid, setEmpid] = useState("");
  const [empname, setEmpname] = useState("");
  const [dailywage, setDailyWage] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [salary, setSalary] = useState(0);
  const [Employee, setEmployee] = useState([]);
  const [Total, setTotal] = useState(0);
  const [attendance, setattendance] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Salarydata, setsalaryData] = useState([]);
  const [formdata, setFormdata] = useState([]);
  const [formState, inputHandler] = useForm(
    {
      employee: {
        value: "",
        isValid: false,
      },

      date: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      days: {
        value: "",
        isValid: false,
      },
      bonus: {
        value: "",
        isValid: false,
      },
      net: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    const statuss = "unpaid";
    const currentdate = new Date();

    setLoading(true);
    console.log(Total);
    axios
      .post("http://localhost:5000/salary/new", {
        id: 1,
        employee: empid,
        date: currentdate,
        days: noOfDays,
        bonus: bonus,
        status: statuss,
        net: Total,
      })
      .then((res) => {
        setLoading(false);
        Toast("Employee salary Added calculated!! 🔥", "success");
        console.log("Response from server:", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/salary")
      .then((response) => {
        setsalaryData(response.data);
        setLoading(false);
       
      })
      .catch((error) => {
        console.error("Error fetching salaries:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch employee IDs when the component mounts
    axios
      .get(`http://localhost:5000/employee`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee IDs:", error);
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

  useEffect(() => {
    // Fetch employee data when empid changes
    if (empid) {
      axios
        .get(`http://localhost:5000/employee/salaryform/${empid}`)
        .then((response) => {
          console.log(response.data);
          const { name, hourlywage } = response.data;
          setEmpname(name);
          setDailyWage(hourlywage);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
      let employeeAttendance = attendance.filter((attendance) => {
        if (attendance && attendance.employee) {
          return (
            attendance.employee._id === empid &&
            new Date(attendance.date).getMonth() === now.getMonth()
          );
        }
        return false;
      });
      setNoOfDays(() => {
        return employeeAttendance.filter(
          (attendance) => attendance.status === "Present"
        ).length;
      });
    }
  }, [empid, setEmpid]);

  const changedetails = (e) => {
    setEmpid(e.target.value);
  };

  const handleCalculateSalary = () => {
    try {
      const totalSalary = dailywage * noOfDays + parseInt(bonus);
      const newEntry = {
        empid: empid,
        empname: empname,
        dailywage: dailywage,
        noOfDays: noOfDays,
        total: totalSalary,
        bonus: bonus,
      };
      setFormdata((prevFormdata) => [...prevFormdata, newEntry]);
      setTotal(totalSalary);
    } catch (err) {
      console.log(err);
    } finally {
    }
    console.log(Total);
  };

  const Headings = [
    "#",
    "Employee name",
    "Month",
    "days Worked",
    "daily Wage",
    "bonus",
    "Net Amount",
    "Status",
    "Action",
  ];

  const formatDateToMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className=" container max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Salary Calculator</h2>
            <h3 className="text-lg mb-4 text-right">Month: {month}</h3>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="empid" className="mb-1">
                  Employee ID:
                </label>
                <select
                  id="empid"
                  value={empid}
                  onChange={(e) => setEmpid(e.target.value)}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option>Select Employee ID</option>
                  {Employee.map((id) => (
                    <option key={id._id} value={id._id}>
                      {id.ID} {id.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="empname" className="mb-1">
                  Employee Name:
                </label>
                <input
                  id="empname"
                  type="text"
                  value={empname}
                  readOnly
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dailywage" className="mb-1">
                  Daily Wage:
                </label>
                <input
                  id="dailywage"
                  type="number"
                  value={dailywage}
                  readOnly
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="noOfDays" className="mb-1">
                  No. of Days Worked:
                </label>
                <input
                  id="noOfDays"
                  type="number"
                  value={noOfDays}
                  readOnly
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bonus" className="mb-1">
                  Bonus:
                </label>
                <input
                  id="bonus"
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <button
                type="button"
                onClick={handleCalculateSalary}
                className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Calculate Salary
              </button>
              <div className="flex justify-between items-center">
                <label htmlFor="bonus" className="mt-4 mb-1">
                  Net salary{" "}
                </label>
                <input
                  id="salary"
                  type="number"
                  value={Total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={submitHandler}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 ml-4"
                  style={{ alignSelf: "flex-end" }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Table Headings={Headings} style={{ width: "100%" }}>
        {Loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          Salarydata.map((item, index) => {
            if(item.status == 'unpaid'){
            return (
              <TableRow>
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">{item.employee.name}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  {formatDateToMonth(item.date)}
                </th>

                <td className="px-6 py-4 text-center text-black">{item.days}</td>
                <td className="px-6 py-4 text-center text-black">
                  {item.employee.hourlywage}
                </td>
                <td className="px-6 py-4 text-center text-black">{item.bonus}</td>
                <td className="px-6 py-4 text-center text-black">{item.net}</td>

                <td className="px-6 py-4 text-center text-white">
                  <div className="bg-red-400 rounded-lg p-2">{item.status}</div>
                </td>
                <td className="px-6 py-4 text-center ">
                <ConfirmDeliveryBox id = {item._id}/>
                </td>
              </TableRow>
            );
        }})
        )}
      </Table>
    </>
  );
};

export default SalaryCalculatorForm;
