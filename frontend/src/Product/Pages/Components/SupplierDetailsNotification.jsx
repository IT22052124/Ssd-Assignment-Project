import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import Loader3 from "../../../Shared/Components/UiElements/loader3";

const SupplierDetailsNotification = ({ ID, onClose }) => {
  const [SupplierProduct, setSupplierProduct] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoading2(true)
      axios
        .get(`http://localhost:5000/supplierproduct/product/${ID}`)
        .then((res) => {
          setSupplierProduct(res.data);
          setLoading(false)
        })
        .catch((err) => {
          console.error(err);
          setLoading(true);
        });
      axios
        .get(`http://localhost:5000/product/update/${ID}`)
        .then((res) => {
          setProduct(res.data);
          setLoading2(false)
        })
        .catch((err) => {
          console.error(err);
          setLoading2(true);
        });
    
  }, [ID]);
  return (
    <>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ zIndex: "60" }}
        className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <button
          onClick={onClose}
          type="button"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 fixed top-5 right-10"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex z-40 flex-col md:flex-row justify-center mt-5 space-y-3 md:space-y-0 pr-10">
          <div className="relative dark:text-black pl-11 mb-5">
            {loading && loading2 ? (
              <>
                <Loader3 />
              </>
            ) : (
              <div className="relative p-6 pl-4 bg-white dark:bg-white-800 border-2 dark:border-gray-300 rounded-lg ">
                Product Name :{" "}
                <span className="font-bold text-gray-800">{product.name}</span>
                <br />
                Alerted Quantity :{" "}
                <span className="font-bold text-gray-800">
                  {product.Alert_quantity}
                </span>
                <br />
                Remaining Stock :{" "}
                <span className="font-bold text-gray-800">{product.Stock}</span>
                <br />
                <div className="block items-center text-center">
                  <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-black text-center">
                    Supplier details
                  </h3>
                </div>
                <table className="min-w-full bg-white shadow-md rounded-xl">
                  <thead>
                    <tr className="bg-blue-gray-100 text-gray-700">
                      <th className="py-3 px-4 text-left columns-2 font-bold">
                        Supplier Name
                      </th>
                      <th className="py-3 px-4 text-left columns-2 font-bold">
                        ID
                      </th>
                      <th className="py-3 px-4 text-left columns-2 font-bold">
                        Unit Price
                      </th>
                      <th className="py-3 px-4 text-left columns-2 font-bold">
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-gray-900">
                    {SupplierProduct.length === 0 ? (
                      <>
                        <tr className="border-b border-blue-gray-200">
                          <td colSpan={4} className="py-3 px-4 text-center">
                            No Supplier Found
                          </td>
                        </tr>{" "}
                      </>
                    ) : (
                      <>
                        {SupplierProduct.map((item, index) => {
                          return (
                            <tr className="border-b border-blue-gray-200">
                              <td className="py-3 px-4">
                                {item.supplier.name}
                              </td>
                              <td className="py-3 px-4 ">{item.supplier.ID}</td>
                              <td className="py-3 px-4">{item.unitPrice}</td>
                              <td className="py-3 px-4">
                                <Link
                                  to={`/Supplier/view/` + item.supplier._id}
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center"
                                >
                                  <center>
                                    <GrView />
                                  </center>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}{" "}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDetailsNotification;
