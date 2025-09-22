import React from "react";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";

const InvoiceDisplayTable = (props) => {
  const Headings = ["#", "Invoice ID", "CartItems", "Total"];

  if (props.Product.length === 0) {
    return (
      <>
        <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td colSpan={8} className="px-6 py-4 text-center">
                No Data Found !!
              </td>
            </tr>
          )}
        </Table>
      </>
    ); 
  }
  return (
    <>
      <Table Headings={Headings}>
        {props.loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          props.Product.map((item, index) => {
            let totalAmount = 0;

            item.CartItems.forEach((item) => {
              totalAmount += item.price * item.quantity;
            });

            return (
              <TableRow>
                <td class="px-6 py-4">
                  {(props.active - 1) * props.itemsPerPage + index + 1}
                </td>
                <td class="px-6 py-4">{item.invoiceId}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.CartItems.map((item) => {
                    return (
                      item.pId?.name +
                      "( Rs. " +
                      item.price +
                      " , (" +
                      item.quantity +
                      " )) , "
                    );
                  })}
                </th>
                <td class="px-6 py-4">{totalAmount}</td>
              </TableRow>
            );
          })
        )}
        {props.Product.length <= 3 ? (
          <>
            <TableRow />
            <td></td>
            <TableRow />
          </>
        ) : (
          <></>
        )}
      </Table>
    </>
  );
};

export default InvoiceDisplayTable;
