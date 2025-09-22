import React from "react";
import "./ProductTable.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import Popupp from "./Popupp";

const ProductTable = (props) => {

  
  const Headings = [
    "#",
    "Product ID",
    "Product name",
    "Category",
    "Selling Price",
    "Available",
    "Alert Quantity",
    "Action",
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
          <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td colSpan={8} className="px-6 py-4 text-center">No Data Found !!</td>
          </tr>)}
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
            let Status;
            if (item.Stock === 0) {
              Status = 0;
            } else if (item.Stock <= item.Alert_quantity) {
              Status = 1;
            } else {
              Status = 2;
            }
            return (
              <TableRow>
                <td class="px-6 py-4">
                  {(props.active - 1) * props.itemsPerPage + index + 1}
                </td>
                <td class="px-6 py-4">{item.ID}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td class="px-6 py-4">{item.category}</td>
                <td
                  class="px-6 py-4"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ marginRight: "auto" }}>Rs.{item.price}</span>
                  <Popupp id={item._id} />
                </td>
                <td class="px-2 py-4">
                  {Status === 0 && (
                    <span class="relative inline-block px-3  py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-red-200 opacity-50 rounded-full pl-4"
                      ></span>
                      <span class="relative">Out Of Stock</span>
                    </span>
                  )}
                  {Status === 1 && (
                    <>
                      {item.Stock}
                      <span class="relative inline-block px-3 ml-2 py-1 font-semibold text-orange-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-orange-200 opacity-50 rounded-full "
                        ></span>
                        <span class="relative">Warning</span>
                      </span>
                    </>
                  )}
                  {Status === 2 && (
                    <>
                      {item.Stock}
                      <span class="relative inline-block px-3 ml-2 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">Available</span>
                      </span>
                    </>
                  )}
                </td>
                <td class="px-6 py-4">{item.Alert_quantity}</td>
                <td class="px-6 py-4">
                  <ThreeDotDropdown
                    popup
                    id={item._id}
                    link2={`/Product/update/` + item._id}
                    deleteLink={`http://localhost:5000/product/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                    length={props.Product.length}
                    index={index + 1}
                  />
                </td>
              </TableRow>
            );
          })
        )}
        {props.Product.length <= 3 ? <><TableRow/><td></td><TableRow/></> : <></>}
      </Table>
    </>
  );
};

export default ProductTable;
