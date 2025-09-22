import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";

const SupplierDetails = (props) => {
  const [SupplierProduct, setSupplierProduct] = useState([]);
  const [isclick, setisclick] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglemodel = () => {
    setisclick(!isclick);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplierproduct/product/${props.id}`)
      .then((res) => {
        setSupplierProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, [props.id]);
  return (
    <>
      <Link
        onClick={togglemodel}
        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        View
      </Link>

      {isclick && (
        <div
          id="crud-modal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed z-40  top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <button
            onClick={togglemodel}
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 fixed top-5 right-10 "
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div class="flex flex-col md:flex-row justify-center mt-5 space-y-3 md:space-y-0 pr-10">
            <div class="relative dark:text-black pl-11 mb-5">
              <div class="relative p-6 pl-4 bg-white dark:bg-white-800 border-2 dark:border-gray-300 rounded-lg ">
                <div class="flex items-center text-center">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-black text-center">
                    Supplier details
                  </h3>
                </div>
                <table class="min-w-full bg-white shadow-md rounded-xl">
                  <thead>
                    <tr class="bg-blue-gray-100 text-gray-700">
                      <th class="py-3 px-4 text-left columns-2 font-bold">
                        Supplier Name
                      </th>
                      <th class="py-3 px-4 text-left columns-2 font-bold">
                        ID
                      </th>
                      <th class="py-3 px-4 text-left columns-2 font-bold">
                        Unit Price
                      </th>
                      <th class="py-3 px-4 text-left columns-2 font-bold">
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-blue-gray-900">
                    {SupplierProduct.length === 0 ? (
                      <>
                        <tr class="border-b border-blue-gray-200">
                          <td colSpan={4} class="py-3 px-4 text-center">
                            No Supplier Found
                          </td>
                        </tr>{" "}
                      </>
                    ) : (
                      <>
                        {SupplierProduct.map((item, index) => {
                          return (
                            <tr class="border-b border-blue-gray-200">
                              <td class="py-3 px-4">{item.supplier.name}</td>
                              <td class="py-3 px-4 ">{item.supplier.ID}</td>
                              <td class="py-3 px-4">{item.unitPrice}</td>
                              <td class="py-3 px-4">
                                <Link
                                  to={`/Supplier/view/` + item.supplier._id}
                                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupplierDetails;
