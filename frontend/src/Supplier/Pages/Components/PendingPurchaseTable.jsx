import React, {useState} from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import PopUpPurchase from "./PopUpPurchase";
import ConfirmDeliveryBox from "./ConfirmDeliveryBox";

const PendingPurchaseTable = (props) => {

  const Headings = [
    "#",
    "Purchase ID",
    "Total Bill",
    "Paid Amount",
    "Date",
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
                if(item.status == 'Pending'){
                    return (
                        <TableRow>
                        <td class="px-6 py-4">{index + 1}</td>
                        <td class="px-6 py-4">{item.ID}</td>
                        <td class="px-6 py-4">{item.total}</td>
                        <td class="px-6 py-4">{item.paidAmount}</td>
                        <td class="py-4">{item.date}</td>
                        <td class="py-3">
                            <PopUpPurchase
                                id = {item._id}
                            />
                            <ConfirmDeliveryBox id = {item._id}/>
                        </td>
                        </TableRow>
                    );
                }})
          )}
      </Table>
    </>
  );
};

export default PendingPurchaseTable;
