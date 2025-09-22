import React from "react";
import "./Table.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
const InquiryTable = (props) => {

  const Headings = [
    "#",
    "ID",
    "Type",
    "Subject",
    "Status",
    "Ratings",
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
            props.inquiry.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <td class="px-6 py-4">{item.type}</td>
                  <td class="px-6 py-4">{item.subject}</td>
                  <td class="px-6 py-4">{item.status}</td>
                  <td class="px-6 py-4">&nbsp;&nbsp;&nbsp;&nbsp;{item.rating}</td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/inquiry_admin/view/`+ item._id}
                    link2={`/inquiry_admin/update/`+ item._id}
                    deleteLink={`http://localhost:5000/inquiry_admin/${item._id}`}
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

export default InquiryTable;