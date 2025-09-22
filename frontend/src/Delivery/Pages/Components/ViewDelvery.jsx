import * as React from "react";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";

const ViewCard = (props) => {
  return (
    props.loading1 ? (
      <center>
        <Loader />
      </center>
    ) : (
      <div className="max-w-screen-lg mx-auto flex justify-center items-center"> {/* Adjust width here */}
        <div className="sample_container card_sample w-full"> {/* Adjust width here */}
          <div className="e-card e-custom-card relative mx-auto overflow-visible border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500 w-full"> {/* Adjust width here */}
            <div className="e-card-header text-center">
              &nbsp;
            </div>
            <div className="e-card-header">
              <div className="e-card-header-caption center">
                <div className="e-card-header-title name text-lg font-semibold flex justify-center items-center"> {/* Add flex classes */}
                  <div className="rounded-full overflow-hidden border border-gray-300" style={{ margin: "0" }}> {/* Remove padding and margin */}
                    <img
                      className="w-40 h-40" // Adjust width and height here
                      src={`http://localhost:5000/${props.delivery.image}`}
                      alt="profile_pic"
                    />
                  </div>
                </div>
                <div className="e-card-sub-title text-sm"></div>
              </div>
            </div>
            
            <div className="e-card-content">
              <p className="avatar-content">
                Delivery ID: {props.delivery.ID}
              </p>
              <p className="avatar-content">
                Delivery Name: {props.delivery.name}
              </p>
              <p className="avatar-content">
                Telephone: {props.delivery.telephone}
              </p>
              <p className="avatar-content">
                Email: {props.delivery.mail}
              </p>
              <p className="avatar-content">
                Address: {props.delivery.address}
              </p>
              <p className="avatar-content">
                License Number: {props.delivery.license}
              </p>
              <p className="avatar-content">
                City: {props.delivery.city}
              </p>
              <p className="avatar-content">
                Type: {props.delivery.type}
              </p>
              <p className="avatar-content">
                Capacity: {props.delivery.capacity}
              </p>
            </div>
            <Link
                to={`/Delivery/`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center"
              >
                Back
              </Link>
          </div>
        </div>
      </div>
    )
  );
};
export default ViewCard;
