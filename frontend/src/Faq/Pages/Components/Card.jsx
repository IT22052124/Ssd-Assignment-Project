import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <>
    <div className={`main-content ml-64 ${props.width ?'w-4/5':'w-full'} h-screen overflow-y-hidden bg-gray-50 pt-14 dark:bg-gray-900`}>
      <div class="h-screen p-6 pt-2 bg-white flex items-center justify-center">
        <div class="container mx-auto ">
          <div class="card" style={props.style}>
            {props.children}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Card;
