import React, { useState, useEffect } from "react";
import "./employeeTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import {SnackbarProvider, useSnackbar} from 'notistack';
import { Link } from "react-router-dom";
import { MdDeleteForever,MdUpdate } from "react-icons/md";




const EmployeeTable = (props) => {
 
  const Headings = [
    "#",
    "Employee ID",
    "Employee name",
    "Address",
    "Telephone",
    "Email",
    "Type",
    "Daily Wage",
    "Action",
  ];

  

   


  return (
    <>
      
      <Table Headings={Headings} style={{width:"100%"}} >
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Employee.map((item, index) => {
              return (
                <TableRow>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.ID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.telephone}</td>
                  <td className="px-6 py-4">{item.mail}</td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">Rs.{item.hourlywage}/-</td>
                 
                  <td className="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/employee/view/`+ item._id}
                    link2={`/Employee/update/`+ item._id}
                    deleteLink={`http://localhost:5000/employee/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                    />
                  </td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default EmployeeTable;

