import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
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
              <div className="e-card-header-title name text-lg font-semibold">
                  {props.wholesalecustomer.name}
                </div>
                <div className="e-card-sub-title text-sm"></div>
              </div>
            </div>
            <div className="e-card-content">
              <p className="avatar-content">
              Wholesalecustomer ID: {props.wholesalecustomer.ID}
              </p>
              <p className="avatar-content">
                Telephone: {props.wholesalecustomer.telephone}
              </p>
              <p className="avatar-content">
                Email: {props.wholesalecustomer.email}
              </p>
              <p className="avatar-content">
                Address: {props.wholesalecustomer.address}
              </p>
              <p className="avatar-content">
                Credit_limit: Rs.{props.wholesalecustomer.creditlimit}
              </p>
              <p className="avatar-content">
                Credit: Rs.{props.wholesalecustomer.credit}
              </p>
            </div>
            <Link
                 to={`/Wholesalecustomer/`}
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