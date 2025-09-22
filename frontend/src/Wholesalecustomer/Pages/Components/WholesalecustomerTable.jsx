import React from "react";

import "./WholesalecustomerTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";

const WholesalecustomerTable = (props) => {

  const Headings = [
    "#",
    "ID",
    "Name",
    "Telephone",
    "Email",
    "Address",
    "Credit_limit",
    "Credit",
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
            props.Wholesalecustomer.map((item, index) => {
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
                  <td class="px-6 py-4">{item.email}</td>
                  <td class="px-6 py-4">{item.address}</td>
                  <td class="px-6 py-4">Rs.{item.creditlimit}</td>
                  <td class="px-6 py-4">Rs.{item.credit}</td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/Wholesalecustomer/view/`+ item._id}
                    link2={`/Wholesalecustomer/update/`+ item._id}
                    deleteLink={`http://localhost:5000/Wholesalecustomer/${item._id}`}
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

export default WholesalecustomerTable;
