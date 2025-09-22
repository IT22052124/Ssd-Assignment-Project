import React from "react";
import { FaClock, FaPlay, FaCheckCircle } from "react-icons/fa";

const TicketStatus = ({ status }) => {
  let pendingColor = "gray";
  let progressColor = "gray";
  let solvedColor = "gray";

  switch (status) {
    case "pending":
      pendingColor = "orange";
      break;
    case "On progress":
      progressColor = "0093FF";
      break;
    case "solved":
      solvedColor = "green";
      break;
    default:
      break;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaClock size={40} color={pendingColor} />
        <div style={{ margin: "0 40px" }}></div> {/* 5 times more space */}
        <FaPlay size={40} color={progressColor} />
        <div style={{ margin: "0 40px" }}></div> {/* 5 times more space */}
        <FaCheckCircle size={40} color={solvedColor} />
      </div>
      <div><br></br></div>
    </div>
  );
};

export default TicketStatus;
