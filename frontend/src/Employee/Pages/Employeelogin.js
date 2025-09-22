import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/employeelogin";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";



const Employeelogin = () => {
  const [deleteEmployeeLogin, setDeleteEmployeeLogin] = useState(1);


  const [employeelogin, setemployeeLogin] = useState([]);
  const [loading, setLoading] = useState(false);
 

 

 

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/EmployeeLogin")
      .then(res => {
        setemployeeLogin(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [deleteEmployeeLogin])
  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Employee login credentials</h1>
         
          <Link to="/EmployeeLogin/new">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <EmployeeTable
        
        Employee={employeelogin} 
        loading={loading} 
        setloading={setLoading}
        dlt={deleteEmployeeLogin} 
          dltset={setDeleteEmployeeLogin}
        />
        
      </Card>

    </div>

    </>
  );
};

export default Employeelogin;
