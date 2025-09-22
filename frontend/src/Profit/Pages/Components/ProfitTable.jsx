import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";

const ProfitTable = (props) => {

  const Headings = [
    "#",
    "Order ID",
    "Product ID",
    "Quantity",
    "Selling Price",
    "Profit",
    "Type",
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
            props.Profit.map((item, index) => {
              return (
                <TableRow>
                  <td class="pl-10 py-4">{index + 1}</td>
                  <td class="pl-16 py-4">{item.order}</td>
                  <td class="pl-16 py-4">{item.productID}</td>
                  <td class="pl-16 py-4">{item.quantity}</td>
                  <td class="pl-16 py-4">{item.price}</td>
                  <td class="pl-12 py-4">{item.profit}</td>
                  <td class="pl-12 py-4">{item.type}</td>
                  <td class="pl-20 py-4">{item.date}</td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default ProfitTable;
