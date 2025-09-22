import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/EmployeeTable";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";



const Employee = () => {
  const [deleteEmployee, setDeleteEmployee] = useState(1);
  const [displayEmployee, setDisplayEmployee] = useState([]);

  const [employee, setemployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setFilteredEmployees(employee);
  }, [employee]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employee.filter(employee =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())||
    employee.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setActivePage(1);
  };

  useEffect(() => {
    setFilteredEmployees(employee);
    setDisplayEmployee(employee)
  }, [employee]);
  
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayEmployee(filteredEmployees.slice(startIndex, endIndex));
  }, [activePage, filteredEmployees]);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/employee")
      .then(res => {
        setemployee(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [deleteEmployee])
  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Employee List</h1>
          <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
          <Link to="/employee/new">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <EmployeeTable
        
        Employee={displayEmployee} 
        loading={loading} 
        setloading={setLoading}
        dlt={deleteEmployee} 
          dltset={setDeleteEmployee}
        />
         <Pagination
            active={activePage}
            totalItems={filteredEmployees.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
      </Card>

    </div>

    </>
  );
};

export default Employee;
