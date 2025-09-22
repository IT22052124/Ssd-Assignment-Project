import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import UpdateCredit from "./UpdateCredit";
import PopUpPurchase from "./PopUpPurchase";

const PurchaseTable = (props) => {

  const Headings = [
    "#",
    "Purchase ID",
    "Total Bill",
    "Paid Amount",
    "Date",
    "Status",
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
            props.Purchase.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <td class="px-6 py-4">{item.total}</td>
                  <td class="px-6 py-4">{item.paidAmount}</td>
                  <td class="py-4">{item.date}</td>
                  <td class="px-6 py-4">{item.status}</td>
                  <td class="py-3">
                    <PopUpPurchase
                        id = {item._id}
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

export default PurchaseTable;
