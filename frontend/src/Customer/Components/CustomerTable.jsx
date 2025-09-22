import React from "react";

import "./CustomerTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../Shared/Components/UiElements/Loader";
import Table from "../../Shared/Components/UiElements/Table";
import TableRow from "../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../Shared/Components/UiElements/ThreeDotDropdown";

const CustomerTable = (props) => {

  const Headings = [
    "#",
    "Customer ID",
    "Customer name",
    "Telephone",
    "Email",
    "Address",
    "Password",
    "Action",
  ];

  return (
    <>
      <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Customers.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td class="px-6 py-4">{item.telephone}</td>
                  <td class="px-6 py-4">{item.mail}</td>
                  <td class="px-6 py-4">{item.address}, {item.city}</td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/Customer/view/`+ item._id}
                    link2={`/Customer/update/`+ item._id}
                    deleteLink={`http://localhost:5000/customer/${item._id}`}
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

export default CustomerTable;
