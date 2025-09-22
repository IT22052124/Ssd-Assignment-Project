import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import UpdateCredit from "./UpdateCredit";

const SupplierTable = (props) => {

  const Headings = [
    "#",
    "Supplier ID",
    "Supplier name",
    "Telephone",
    "Email",
    "Address",
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
            props.Suppliers.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{(props.active - 1) * props.itemsPerPage + index + 1}</td>
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
                  <td class="px-6 py-4" style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '10px'}}>Rs.{item.credit}</span>
                    <UpdateCredit id={item._id} />
                  </td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/Supplier/view/`+ item._id}
                    link2={`/Supplier/update/`+ item._id}
                    deleteLink={`http://localhost:5000/supplier/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                    length={props.Suppliers.length}
                    index={index + 1}
                    />
                  </td>
                </TableRow>
              );
            })
          )}
          {props.Suppliers.length <= 3 ? <><TableRow/><td></td><TableRow/></> : <></>}
      </Table>
    </>
  );
};

export default SupplierTable;
