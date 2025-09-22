import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import Loader2 from "../../../Shared/Components/UiElements/Loader2";

const ViewPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [supplierProduct, setSupplierProduct] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/${props.id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, [props.id]);

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
      {props.click && (
        <>
          <div
            id="crud-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <button
              onClick={() => {
                props.setClick(!props.click);
              }}
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
            {loading ? (
              <>
                <Loader2 />
              </>
            ) : (
              <>
                <div class="flex flex-col justify-center pt-2 pb-2 pl-20 w-5/6 ">
                  <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-5xl mx-auto border border-white bg-white">
                    <div class="w-full md:w-4/6 bg-white grid place-items-center ">
                      <img
                        src={`http://localhost:5000/${product.image}`}
                        alt="tailwind logo"
                        class="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div class="w-full md:w-2/3 bg-white flex flex-col space-y-1 p-2">
                      <h2 class="text-lg font-bold text-gray-800 mb-2 text-center my-1 ml-1 d dark:text-black ">
                        Product Details
                      </h2>
                      <dl>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Product Name
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.name}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">ID</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.ID}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Category
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.category}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Selling Price
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Rs {product.price}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Description
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.description}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Weight
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.weight}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Quantity In Stock
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.Stock}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Alert Quantity
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {product.Alert_quantity}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Created At
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {new Date(product.createdAt).toString()}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Updated At
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {new Date(product.updatedAt).toString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
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
                          {supplierProduct.map((item, index) => {
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
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewPopup;
