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




const EmployeeLoginTable = (props) => {
 
  const Headings = [
    "#",
    "ID",
    "name",
    "Role",
    "username",
    "password",
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
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{item.ID}</td>
                  <td className="px-6 py-4 text-center">{item.name}</td>
                  <td className="px-6 py-4 text-center">{item.role}</td>
                  <th
                    scope="row"
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.username}
                  </th>
                  <td className="px-6 py-4 text-center">{item.password}</td>
                
                 
                  <td className="px-6 py-4 text-center">
                    <ThreeDotDropdown
                    link2={`/Employeelogin/update/`+ item._id}
                    deleteLink={`http://localhost:5000/EmployeeLogin/${item._id}`}
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

export default EmployeeLoginTable;

