import * as React from "react";
import { useEffect } from 'react';
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";


const SupplierViewCard = (props) => {
  return (
    props.loading1 ? (
      <center>
        <Loader />
      </center>
    ) : (
      <div class="w-full h-screen bg-gray-100 px-10 pt-20">
        <div class="relative mt-16 mb-32 max-w-sm mx-auto mt-24">
            <div class="rounded overflow-hidden shadow-md bg-white">
                <div class="absolute -mt-20 w-full flex justify-center">
                    <div class="h-32 w-32">
                        <img src={`http://localhost:5000/${props.supplier.image}`}
                    alt="profile_pic" class="rounded-full object-cover h-full w-full shadow-md" />
                    </div>
                </div>
                <div class="px-6 text mt-20">
                    <h1 class="font-bold text-3xl text-center mb-10 mt-10">{props.supplier.name}</h1>
                    <p class="text-gray-800 text-sm mt-2"><span className="font-bold">Supplier ID : </span>{props.supplier.ID}</p>
                    <p class="text-gray-800 text-sm mt-2"><span className="font-bold">Telephone : </span>{props.supplier.telephone}</p>
                    <p class="text-gray-800 text-sm mt-2"><span className="font-bold">Email : </span>{props.supplier.mail}</p>
                    <p class="text-gray-800 text-sm mt-2"><span className="font-bold">Address : </span>{props.supplier.address}</p>
                    <p class="text-gray-800 text-sm mt-2"><span className="font-bold">Credit : </span>Rs.{props.supplier.credit}.00</p>
                </div>
                <Link
                to={`/Supplier/update/`+ props.supplier._id}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center mt-16"
              >
                Update
              </Link>
            </div>
        </div>
    </div>
    )
  );
};
export default SupplierViewCard;