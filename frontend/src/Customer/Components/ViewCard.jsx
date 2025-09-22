import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
import Loader from "../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";

const ViewCard = (props) => {
  return (
    props.loading1 ? (
      <center>
        <Loader />
      </center>
    ) : (
      <div className="max-w-screen-md mx-auto flex justify-center items-center">
        <div className="card_sample pt-32">
          <div className="e-card e-custom-card relative mx-auto overflow-visible border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500">
            <div className="e-card-header text-center">
              <div className="flex justify-center">
                <div className="e-avatar-circle e-avatar-md flex items-center justify-center">
                  <img
                    className="rounded-full w-24 h-24"
                    src={`http://localhost:5000/${props.customer.image}`}
                    alt="profile_pic"
                  />
                </div>
              </div>
              &nbsp;
            </div>
            <div className="e-card-header">
              <div className="e-card-header-caption center">
                <div className="e-card-header-title name text-lg font-semibold">
                  {props.customer.name}
                </div>
                <div className="e-card-sub-title text-sm"></div>
              </div>
            </div>
            <div className="e-card-content">
              <p className="avatar-content">
                Name: {props.customer.name}
              </p>
              <p className="avatar-content">
                Telephone: {props.customer.telephone}
              </p>
              <p className="avatar-content">
                Email: {props.customer.mail}
              </p>
              <p className="avatar-content">
                Address: {props.customer.address}
              </p>
            </div>
            <Link
                to={`/Customer/update/`+ props.customer._id}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center"
              >
                Update
              </Link>
          </div>
        </div>
      </div>
    )
  );
};
export default ViewCard;