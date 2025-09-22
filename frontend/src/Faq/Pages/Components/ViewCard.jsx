import * as React from "react";
import { useEffect } from 'react';
import "./check/ViewCard.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";
import BackButton from "./backbutton";
import TicketStatus from "./status";

const ViewCard = (props) => {
  return (
    props.loading ? (
      <center>
        <Loader />
      </center>
    ) : (
      
        <div className="sample_container card_sample mt-40" style={{ width: "50%", height:"100%" , marginTop: "100px",marginRight:"350px" }}>
         <div className="e-card e-custom-card relative mx-auto bg-gray-100 border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500 " style={{ width: "100%", height:"100%"}}>
            
            <div className="e-card-content">
              <BackButton></BackButton>
              <p className="avatar-content" style={{fontSize:"15px"}}>
                <b>Question:</b> 
              </p>
              <p className="avatar-contenth">
                {props.faq.issue}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Category:</b>
              </p>
              <p className="avatar-contenth">
                {props.faq.category}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Solution:</b>
              </p>
              <p className="avatar-contenth" style={{fontSize:"15px"}}>
                {props.faq.solution}
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Views:</b> 
              </p>
              <p className="avatar-contenth">
                {props.faq.views} 
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Response:</b> 
              </p>
              <p className="avatar-contenth">
                {props.faq.likes} Likes {props.faq.likes} Dislikes 
              </p>
              <p className="avatar-content" style={{fontSize:"15px"}}>
              <b>Created/Last updated by:</b>
              </p>
              <p className="avatar-contenth">
                {props.faq.aurthor}
              </p>
            </div>
            <Link
                to={`/faq/update/`+ props.faq._id}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center"
              >
              <p className="avatar-contents">
                <b>UPDATE</b>
                </p>  
              </Link>
          </div>
        </div>
        
      
    )
  );
};
export default ViewCard;