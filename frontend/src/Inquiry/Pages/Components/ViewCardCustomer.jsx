import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";
import BackButton from "./backbutton";
import TicketStatus from "./status";
const ViewCard = (props) => {

  const createdAtTimestamp = props.inquiry.createdAt;

  const createdAtDate = new Date(createdAtTimestamp);
  
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; 
  const day = createdAtDate.getDate();
  const hour = createdAtDate.getHours();
  const minute = createdAtDate.getMinutes();
  
  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}`;
    
  return (
    props.loading ? (
      <center>
        <Loader />
      </center>
    ) : (
      
        <div className="sample_container card_sample ml-60" style={{ width: "50%", height:"80%", marginTop: "70px"}}>
          <div className="e-card e-custom-card relative mx-auto bg-white border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500 ml-40 mb-20" style={{ width: "100%", height:"100%"}}>
            
            <div className="e-card-content">
              <BackButton></BackButton>
              <TicketStatus status={props.inquiry.status}/>
              <p className="avatar-content" style={{fontSize:"15px"}}>
                <b>Type:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.type}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Subject:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.subject}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Telephone:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.telephone}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Description:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.description}
              </p>
              
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Reply:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.reply} 
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Created Date:</b> 
              </p>
              <p className="avatar-contenth">
                {formattedDateTime} 
              </p>
            </div>
          </div>
        </div>
        
      
    )
  );
};
export default ViewCard;