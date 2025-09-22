import React from "react";
import "./FaqTable.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import Button from "./button";
const FaqTable = (props) => {
  const navigate = useNavigate();
  const Headings = [
  ];

  return (
    <>
      <Table Headings={Headings} style={{ width: '80%' }}>
        
{props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.faq.map((item, index) => {
              return (
                <TableRow>
                  <div onClick={() => navigate(`/faqs/view/${item._id}`)} style={{ color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <td class="px-10 py-4" style={{ fontSize: '20px', margin: 0 }}>{item.issue}</td>
                  <td class="pd-0 py-4" style={{ margin: 0 }}>
                    <div style={{ marginLeft: '20px' }}>              
                      <Button></Button>  
                    </div>
                  </td>
                </div>
                  
                </TableRow>
              );
            })
          )}     
      </Table>
    </>
  );
};

export default FaqTable;

