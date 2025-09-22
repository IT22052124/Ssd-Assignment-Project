import React from "react";
import "./ProductTable.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";

const ProductTable = (props) => {
  const Headings = [
    "#",
    "Review ID",
    "Product name",
    "User Name",
    "Rating",
    "Message",
  ];

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
    ); // Add message if no data is found
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
            return (
              <TableRow>
                <td class="px-6 py-4 text-center">
                  {(props.active - 1) * props.itemsPerPage + index + 1}
                </td>
                <td class="px-6 py-4 text-center">{item.PRid}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  {item.ProductID && item.ProductID.name}
                </th>
                <td class="px-2 py-4 text-center">
                  <span style={{ marginRight: "auto" }}>
                    {item.UserID ? item.UserID.name : "Deleted User"}
                  </span>
                </td>
                <td class="px-2 py-4 text-center" style={{ width: "50px" }}>
                  {item.Rating}
                </td>
                <td class="px-6 py-4" style={{ width: "30%" }}>
                  {item.Message}
                </td>
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

export default ProductTable;
