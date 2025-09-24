import * as React from "react";
import { useEffect } from "react";
import "./ViewCard.css";
import Loader from "../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";

const ViewCard = (props) => {
  return props.loading1 ? (
    <center>
      <Loader />
    </center>
  ) : (
    <div className="max-w-lg mx-auto flex justify-center items-center py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full">
        {/* Profile Image */}
        <div className="flex flex-col items-center p-6 border-b border-gray-100">
          <img
            className="w-28 h-28 rounded-full shadow-md object-cover"
            src={
              props.customer?.image?.startsWith("http")
                ? props.customer.image
                : `http://localhost:5000/${props.customer.image}`
            }
            alt="profile_pic"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
            }}
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {props.customer.name}
          </h2>
          <p className="text-sm text-gray-500">Customer Profile</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-3">
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {props.customer.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Telephone:</span>{" "}
            {props.customer.telephone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {props.customer.mail}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span>{" "}
            {props.customer.address}
          </p>
        </div>

        {/* Update Button */}
        <div className="px-6 pb-6">
          <Link
            to={`/Customer/update/` + props.customer._id}
            className="block w-full py-2 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition duration-200"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
