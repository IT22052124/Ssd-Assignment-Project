import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";
import BackButton from "./backbutton";
const ViewCard = (props) => {
    
  return (
    props.loading ? (
      <center>
        <Loader />
      </center>
    ) : (
      
        <div className="sample_container card_sample" style={{ width: "50%", height:"80%" , marginTop:"100px"}}>
          <div className="e-card e-custom-card relative mx-auto bg-gray-100 border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500" style={{ width: "100%", height:"100%"}}>
            
            <div className="e-card-content">
              <BackButton></BackButton>
              <p className="avatar-content" style={{textTransform:"uppercase", textAlign:"center",fontSize:"26px" }}>
                <b>{props.faq.category}</b>
            </p>
            <br></br>
              <p className="avatar-contenth" style={{color:"black",fontSize:"25px"}}>
                {props.faq.issue}
              </p>
              <p className="avatar-contenths" style={{fontSize:"19px"}}>
                {props.faq.solution}
              </p>
              
            </div>
            
          </div>
        </div>
        
      
    )
  );
};
export default ViewCard;