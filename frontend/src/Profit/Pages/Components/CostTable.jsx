import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";

const CostTable = (props) => {

  const Headings = [
    "#",
    "Product ID",
    "Cost Price",
    "Quantity",
    "InStock",
    "Date",
  ];

  return (
    <>
      <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Cost.map((item, index) => {
              return (
                <TableRow>
                  <td class="pl-10 py-4">{index + 1}</td>
                  <td class="pl-16 py-4">{item.productID}</td>
                  <td class="pl-16 py-4">{item.price}</td>
                  <td class="pl-16 py-4">{item.quantity}</td>
                  <td class="pl-16 py-4">{item.inStock}</td>
                  <td class="pl-20 py-4">{item.date}</td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default CostTable;
