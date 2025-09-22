import React, { useState,useCallback, useEffect,useRef } from "react";
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
import { useReactToPrint } from "react-to-print";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const HistoryTable = (props) => {
 
  const Headings = [
    "#",
    "Employee ID",
    "Employee name",
    "Date paid",
    " Amount paid",
    "status",
  ];

 

 

  return (
    <>
    
      <Table Headings={Headings} style={{ width: "100%" }}>
        {props.loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          props.Employee.map((item, index) => {
            if (item.status == "paid") {
              return (
                <TableRow>
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{item.employee.ID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white"
                  >
                    {item.employee.name}
                  </th>
                  <td className="px-6 py-4 text-center">{formatDate(item.date)}</td>
                  
                  <td className="px-6 py-4 text-center text-black">{item.net}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="bg-green-500 rounded-lg p-2 text-white">
                      {item.status}
                    </div>
                  </td>
                </TableRow>
              );
            }
          })
        )}
      </Table>
      
    </>
  );
};

export default HistoryTable;
