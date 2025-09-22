import React from "react";
import "./FaqTable.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";

const FaqTable = (props) => {

  const Headings = [
    "#",
    "ID",
    "Category",
    "Issue",
    "Views",
    "Likes",
    "Dislikes",
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
            props.faq.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <td class="px-6 py-4">{item.category}</td>
                  <td class="px-6 py-4">{item.issue}</td>
                  <td class="px-6 py-4">&nbsp;&nbsp;&nbsp;&nbsp;{item.views}</td>
                  <td class="px-6 py-4">&nbsp;&nbsp;&nbsp;{item.likes} </td>
                  <td class="px-6 py-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.dislikes} </td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/faq/view/`+ item._id}
                    link2={`/faq/update/`+ item._id}
                    deleteLink={`http://localhost:5000/faq/${item._id}`}
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

export default FaqTable;

