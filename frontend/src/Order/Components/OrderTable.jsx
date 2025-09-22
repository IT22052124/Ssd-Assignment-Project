import React from "react";
import Loader from "../../Shared/Components/UiElements/Loader";
import Table from "../../Shared/Components/UiElements/Table";
import TableRow from "../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../Shared/Components/UiElements/ThreeDotDropdown";

const OrderTable = (props) => {
  const Headings = [
    "#",
    "Order ID",
    "Email Address",
    "Product x Quantity",
    "Time",
    "Date",
  ];

  if (props.Order.length === 0) {
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
          props.Order.map((item, index) => {
            return (
              <TableRow>
                <td class="px-6 py-4">
                  {(props.active - 1) * props.itemsPerPage + index + 1}
                </td>
                <td class="px-6 py-4">{item.orderId}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.userId.mail}
                </th>
                <td className="px-6 py-4">
                  {item.CartItems.map((item, index) => (
                    <span key={index}>
                      {item.productId.name} ({item.quantity})
                      <br />
                    </span>
                  ))}
                </td>
                <td
                  class="px-6 py-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "auto" }}>{item.time}</span>
                </td>
                <td class="px-6 py-4">{item.date}</td>
              </TableRow>
            );
          })
        )}
      </Table>
    </>
  );
};

export default OrderTable;
