import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "./customerUI/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import Button from "./button";
import { AuthContext } from "../../../Shared/Components/context/authcontext";

const InquiryTable = (props) => {
  const navigate = useNavigate(); 
  const Headings = [
    "#",
    "type",
    "subject",
    "status",
    "Date Created",
    "Action",
    
  ];
  
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [customer, setcustomer] = useState({});
  const auth = useContext(AuthContext);

  useEffect(()=> {
    setLoading(true);
    axios
        .get(`http://localhost:5000/customer/${auth.cusId}`)
        .then((res)=> {
            setcustomer(res.data);
            setLoading(false);
        })
        .catch((err)=> {
            console.log(err);
            setLoading(false);
        });
}, [id] );
  
  return (
    <>
      <Table Headings={Headings} style={{ width: '80%' }} >
        
{props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.inquiry.filter(item => item.mail === customer.mail).map((item, index) =>{
              const createdAtTimestamp = item.createdAt;

              const createdAtDate = new Date(createdAtTimestamp);
              
              const year = createdAtDate.getFullYear();
              const month = createdAtDate.getMonth() + 1; 
              const day = createdAtDate.getDate();
              const hour = createdAtDate.getHours();
              const minute = createdAtDate.getMinutes();
              
              const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}`;
              return (
                <TableRow >
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>{index + 1}</td>
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>{item.type}</td>
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>{item.subject}</td>
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>{item.status}</td>
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>{formattedDateTime}</td>
                  <td class="px-6 py-4"onClick={() => navigate(`/inquiries/view/${item._id}`)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;...
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

