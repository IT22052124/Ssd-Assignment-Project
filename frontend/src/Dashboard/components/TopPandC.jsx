import axios from "axios";
import React, { useEffect, useState } from "react";

const TopPandC = () => {
  const [TopProducts, setTopProducts] = useState([]);
  const [TopCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [switchPC, setSwitchPC] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product/Top-products")
      .then((res) => {
        setTopProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/customer/Top/Customers")
      .then((res) => {
        setTopCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);
  return (
    <>
      <div class="p-4 min-h-5/6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 class="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Statistics this month
          <button
            data-popover-target="popover-description"
            data-popover-placement="bottom-end"
            type="button"
          >
            <svg
              class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Show information</span>
          </button>
        </h3>
        <div
          data-popover=""
          id="popover-description"
          role="tooltip"
          class="absolute z-10 inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 opacity-0 invisible"
          style={{
            position: "absolute",
            inset: "0px 0px auto auto",
            margin: "0px",
            transform: "translate3d(-392px, 80.8px, 0px)",
          }}
          data-popper-placement="bottom-end"
        >
          <div class="p-3 space-y-2">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Statistics
            </h3>
            <p>
              Statistics is a branch of applied mathematics that involves the
              collection, description, analysis, and inference of conclusions
              from quantitative data.
            </p>
            <a
              href="#"
              class="flex items-center font-medium text-primary-600 dark:text-primary-500 dark:hover:text-primary-600 hover:text-primary-700"
            >
              Read more{" "}
              <svg
                class="w-4 h-4 ml-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div
            data-popper-arrow=""
            style={{
              position: "absolute",
              left: "0px",
              transform: "translate3d(271.2px, 0px, 0px)",
            }}
          ></div>
        </div>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">
            Select tab
          </label>
          <select
            id="tabs"
            class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option>Statistics</option>
            <option>Services</option>
            <option>FAQ</option>
          </select>
        </div>
        <ul
          class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
          id="fullWidthTab"
          data-tabs-toggle="#fullWidthTabContent"
          role="tablist"
        >
          <li class="w-full">
            <button
              id="faq-tab"
              data-tabs-target="#faq"
              onClick={() => setSwitchPC(true)}
              type="button"
              role="tab"
              aria-controls="faq"
              aria-selected="false"
              class={`inline-block w-full p-4 rounded-tl-lg ${
                switchPC
                  ? "bg-red-400 text-white "
                  : "bg-gray-50 hover:bg-gray-100"
              } focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-transparent dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300`}
            >
              Top products
            </button>
          </li>
          <li class="w-full">
            <button
              id="about-tab"
              onClick={() => setSwitchPC(false)}
              data-tabs-target="#about"
              type="button"
              role="tab"
              aria-controls="about"
              aria-selected="true"
              class={`inline-block w-full p-4 rounded-tr-lg ${
                !switchPC
                  ? "bg-red-400 text-white "
                  : "bg-gray-50 hover:bg-gray-100"
              }  focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500`}
            >
              Top Customers
            </button>
          </li>
        </ul>
        <div
          id="fullWidthTabContent"
          class="border-t border-gray-200 dark:border-gray-600"
        >
          <div
            class={`pt-4 ${switchPC ? "block" : "hidden"}`}
            id="faq"
            role="tabpanel"
            aria-labelledby="faq-tab"
          >
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {TopProducts.map((product) => {
                return (
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center min-w-0">
                        <img
                          class="flex-shrink-0 w-10 h-10"
                          src={`http://localhost:5000/${product.product.image}`}
                          alt={product.product.name}
                        />
                        <div class="ml-3">
                          <p class="font-medium text-gray-900 truncate dark:text-white">
                            {product.product.name}
                          </p>
                          <div class="flex items-center flex-auto text-sm text-green-500 dark:text-green-400">
                            <svg
                              class="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                              ></path>
                            </svg>
                            2.5%
                            <span class="ml-2 text-gray-500">
                              vs last month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {product.totalQuantity}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            class={`pt-4 ${!switchPC ? "block" : "hidden"}`}
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {TopCustomers.map((customer) => {
                return (
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img
                          class="w-8 h-8 rounded-full object-cover"
                          src={`http://localhost:5000/${customer.customer.image}`}
                          alt={customer.customer.name}
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate dark:text-white">
                        {customer.customer?.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {customer.customer?.mail}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        Rs. {customer.totalAmount}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPandC;
