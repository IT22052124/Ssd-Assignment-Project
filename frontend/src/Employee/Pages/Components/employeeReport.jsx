import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { useReactToPrint } from "react-to-print";

const MonthlyReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [salaries, setSalaries] = useState([]);
  const [month, setMonth] = useState(""); // Initialize month state
  const [totalSalaryExpense, setTotalSalaryExpense] = useState(0); // Total salary expense state
  const [numEmployeesPaid, setNumEmployeesPaid] = useState(0); // Number of employees paid state
  const [maxSalary, setMaxSalary] = useState(0); // Maximum salary state
  const [minSalary, setMinSalary] = useState(0); // Minimum salary state

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/salary?month=${month}`)
      .then((response) => {
        setSalaries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching salaries:", error);
        setLoading(false);
      });
  }, [month]);

  useEffect(() => {
    const salariesForSelectedMonth = salaries.filter(salary => {
      const salaryMonth = new Date(salary.date).getMonth() + 1;
      return salaryMonth === parseInt(month);
    });
  
    const totalExpense = salariesForSelectedMonth.reduce((acc, curr) => acc + curr.net, 0);
    setTotalSalaryExpense(totalExpense || 0);
  
    setNumEmployeesPaid(salariesForSelectedMonth.length || 0);
  
    if (salariesForSelectedMonth.length > 0) {
      const salariesArr = salariesForSelectedMonth.map(salary => salary.net);
      setMaxSalary(Math.max(...salariesArr) || 0);
      setMinSalary(Math.min(...salariesArr) || 0);
    } else {
      setMaxSalary(0);
      setMinSalary(0);
    }
  }, [salaries, month]);
  const currentDate = new Date().toLocaleDateString();
  
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "salary report",
    onAfterPrint: () => alert("salary Report is successfully generated !"),
  });

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between mb-4">
      
        <div className="mr-4">
        
          <label htmlFor="monthSelect" className="mr-2">
            Select Month:
          </label>
          <select
            id="monthSelect"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select</option>
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={month + 1}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleprint}
          className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate Report
        </button>
      </div>
      <div className="container mx-auto my-8" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">Salary Report : {new Date(0, month - 1).toLocaleString("default", { month: "long" })}</h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> kandy street matale
          <br />
          <strong>Date:</strong> {currentDate}
        </p>
        <div className="mt-4">
          {loading ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : (
            <React.Fragment>
              <Table
                Headings={[
                  "#",
                  "Employee ID",
                  "Employee Name",
                  "Days Worked",
                  "Salary",
                  "Status",
                ]}
                style={{ width: "100%" }}
              >
                {salaries
                  .filter((salary) => {
                    const salaryMonth = new Date(salary.date).getMonth() + 1;
                    return salaryMonth === parseInt(month);
                  })
                  .map((salary, index) => (
                    <TableRow key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{salary.employee.ID}</td>
                      <td className="text-center">{salary.employee.name}</td>
                      <td className="text-center">{salary.days}</td>
                      <td className="text-center">{salary.net}</td>
                      <td className="text-center">{salary.status}</td>
                    </TableRow>
                  ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg ">
                  <b>Summary Information:</b>
                </h1>
                
                <p><b>Total Salary Expense for the Month:</b> Rs.{totalSalaryExpense}.00</p>
                
                <p><b>Maximum Salary Paid:</b> Rs.{maxSalary}.00/-</p>
                <p><b>Minimum Salary Paid :</b> Rs.{minSalary}.00/-</p>
                <p><b>Number of Employees Paid: </b>{numEmployeesPaid}</p>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left ">
            <p>Date of Approval: {currentDate}</p>
          </div>
          <div>
            <p>Signature of Authorized Person</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReportPage;
