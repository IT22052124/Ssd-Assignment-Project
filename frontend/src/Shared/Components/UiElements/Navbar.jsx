import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { RiMailOpenLine } from "react-icons/ri";
import { EmployeeAuthContext } from "../context/EmployeeAuthContext";

const Navbar = (props) => {
  const Auth = useContext(EmployeeAuthContext);
  const [isDropdownOpenSupplier, setIsDropdownOpenSupplier] = useState(false);
  const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(
    props.select === "Product Details" ||
      props.select === "Restock Products" ||
      props.select === "Product Reviews"
      ? true
      : false
  );
  const [isDropdownOpenEmployee, setIsDropdownOpenEmployee] = useState(false);
  const [isDropdownOpenReport, setIsDropdownOpenReport] = useState(
    props.select === "Product Report" ? true : false
  );
  const [isDropdownOpenDelivery, setIsDropdownOpenDelivery] = useState(false);
  const [isDropdownOpenProfit, setIsDropdownOpenProfit] = useState(false);
  const [isDropdownOpenOrder, setIsDropdownOpenOrder] = useState(
    props.select === "Order Details" ||
      props.select === "Order Report" 
      ? true
      : false
  );;
  const [count, setCount] = useState();
  const [RestockCount, setRestockCount] = useState();

  const toggleDropdownSupplier = () => {
    setIsDropdownOpenSupplier(!isDropdownOpenSupplier);
  };

  const toggleDropdownProfit = () => {
    setIsDropdownOpenProfit(!isDropdownOpenProfit);
  };

  const toggleDropdownProduct = () => {
    setIsDropdownOpenProduct(!isDropdownOpenProduct);
  };

  const toggleDropdownEmployee = () => {
    setIsDropdownOpenEmployee(!isDropdownOpenEmployee);
  };

  const toggleDropdownDelivery = () => {
    setIsDropdownOpenDelivery(!isDropdownOpenDelivery);
  };

  const toggleDropdownReport = () => {
    setIsDropdownOpenReport(!isDropdownOpenReport);
  };

  const toggleDropdownOrder = () => {
    setIsDropdownOpenOrder(!isDropdownOpenOrder);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/supplierproduct/pendingCount/count`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setRestockCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);



  return (
    <>
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0  w-64 h-screen overflow-y-auto border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform -translate-x-full sm:translate-x-0"
        style={{ backgroundColor: "white" }}
        aria-label="Sidebar"
      >
        <div class="relative px-3 py-4 flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link to="/Dashboard" class="flex items-center ps-2.5 mb-5">
            <img
              src="/img/LOGO.png"
              class="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              KGL
            </span>
          </Link>
          <ul class="space-y-2 font-medium pt-5">
            <li>
              <Link
                to={"/Dashboard"}
                class={`flex items-center p-2  rounded-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  props.select === "Dashboard"
                    ? "bg-red-400 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <svg
                  class={`w-5 h-5  transition duration-75 dark:text-gray-400  dark:group-hover:text-white ${
                    props.select === "Dashboard"
                      ? "text-white"
                      : "group-hover:text-gray-900 text-gray-500"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownEmployee}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Employees
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenEmployee ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenEmployee && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/Employee/"}
                      className={` mr-10  flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700${
                        props.select === "Employee Details"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                        />
                      </svg>{" "}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Employee Details
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Employee/attendance"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Mark Attendance"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.512 8.72a2.46 2.46 0 0 1 3.479 0 2.461 2.461 0 0 1 0 3.479l-.004.005-1.094 1.08a.998.998 0 0 0-.194-.272l-3-3a1 1 0 0 0-.272-.193l1.085-1.1Zm-2.415 2.445L7.28 14.017a1 1 0 0 0-.289.702v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .703-.288l2.851-2.816a.995.995 0 0 1-.26-.189l-3-3a.998.998 0 0 1-.19-.26Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M7 3a1 1 0 0 1 1 1v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Zm10.67 8H19v8H5v-8h3.855l.53-.537a1 1 0 0 1 .87-.285c.097.015.233.13.277.087.045-.043-.073-.18-.09-.276a1 1 0 0 1 .274-.873l1.09-1.104a3.46 3.46 0 0 1 4.892 0l.001.002A3.461 3.461 0 0 1 17.67 11Z"
                          clip-rule="evenodd"
                        />
                      </svg>{" "}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Mark Attendance
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Employee/attendancelist"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700${
                        props.select === "Attendance List"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />{" "}
                      </svg>{" "}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Attendance List
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/Salaryform"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Salary Calculation"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                        />{" "}
                      </svg>{" "}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Salary Calculation
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/salaryHistory"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Salary Calculation"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        />{" "}
                      </svg>{" "}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        payment History
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownProduct}
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  ></path>
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Products
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenProduct ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenProduct && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/Product"}
                      className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Product Details"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Product Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Product/Restock"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Restock Products"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Restock Products
                      <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {RestockCount}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/ProductReviews"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Product Reviews"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Product Reviews
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to={"/Customer"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Customers</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/Wholesalecustomer"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Wholesale Customers
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownSupplier}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                  <path
                    fill-rule="evenodd"
                    d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Suppliers
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenSupplier ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenSupplier && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/Supplier/"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Supplier Details"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Supplier Details
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Supplier/purchase"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Purchase History"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Purchase History
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Supplier/pendingpurchase"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Pending Orders"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm">
                        Pending Purchase
                      </span>
                      <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {count}
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            <li>
              <Link
                to={"/invoice"}
                class={`flex items-center p-2  rounded-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  props.select === "Invoice"
                    ? "bg-red-400 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <svg
                class={`w-5 h-5  transition duration-75 dark:text-gray-400  dark:group-hover:text-white ${
                    props.select === "Invoice"
                      ? "text-white"
                      : "group-hover:text-gray-900 text-gray-500"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="22"
                  width="22"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512.002 512.002"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M128.257,392.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533s8.533-3.823,8.533-8.533     S132.967,392.533,128.257,392.533z" />
                        <path d="M179.457,392.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533s8.533-3.823,8.533-8.533     S184.167,392.533,179.457,392.533z" />
                        <path d="M247.468,273.067h-68.267c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h68.267     c4.719,0,8.533-3.823,8.533-8.533S252.187,273.067,247.468,273.067z" />
                        <path d="M213.334,324.267h-34.133c-4.719,0-8.533,3.823-8.533,8.533c0,4.71,3.814,8.533,8.533,8.533h34.133     c4.719,0,8.533-3.823,8.533-8.533C221.868,328.09,218.053,324.267,213.334,324.267z" />
                        <path d="M358.401,298.667c-9.412,0-17.067-7.654-17.067-17.067c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533     c0,15.855,10.914,29.107,25.6,32.922v1.212c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533v-1.212     c14.686-3.814,25.6-17.067,25.6-32.922c0-18.825-15.309-34.133-34.133-34.133c-9.412,0-17.067-7.654-17.067-17.067     c0-9.412,7.654-17.067,17.067-17.067c9.412,0,17.067,7.654,17.067,17.067c0,4.71,3.814,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0-15.855-10.914-29.107-25.6-32.922v-1.212c0-4.71-3.814-8.533-8.533-8.533     c-4.719,0-8.533,3.823-8.533,8.533v1.212c-14.686,3.814-25.6,17.067-25.6,32.922c0,18.825,15.309,34.133,34.133,34.133     c9.412,0,17.067,7.654,17.067,17.067C375.468,291.012,367.813,298.667,358.401,298.667z" />
                        <path d="M333.057,392.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533     S337.768,392.533,333.057,392.533z" />
                        <path d="M435.457,409.6c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533     S430.747,409.6,435.457,409.6z" />
                        <path d="M384.257,392.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533     S388.968,392.533,384.257,392.533z" />
                        <path d="M349.868,102.4h34.133c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-34.133     c-4.719,0-8.533,3.823-8.533,8.533C341.334,98.577,345.149,102.4,349.868,102.4z" />
                        <path d="M230.657,392.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533s8.533-3.823,8.533-8.533     S235.367,392.533,230.657,392.533z" />
                        <path d="M128.001,290.133h17.067c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533S123.282,290.133,128.001,290.133z" />
                        <path d="M128.001,341.333h17.067c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533C119.468,337.51,123.282,341.333,128.001,341.333z" />
                        <path d="M469.334,0H42.668c-4.719,0-8.533,3.823-8.533,8.533v494.933c0,3.447,2.074,6.562,5.265,7.885     c1.058,0.435,2.167,0.648,3.268,0.648c2.219,0,4.403-0.87,6.033-2.5l45.167-45.167l45.167,45.167     c3.337,3.337,8.73,3.337,12.066,0l28.1-28.1l28.1,28.1c3.337,3.337,8.73,3.337,12.066,0l28.1-28.1l11.034,11.034     c3.337,3.336,8.73,3.336,12.066,0l28.1-28.1l28.1,28.1c3.337,3.336,8.73,3.336,12.066,0l19.567-19.567l19.567,19.567     c3.337,3.336,8.73,3.336,12.066,0l45.167-45.167l28.1,28.1c0.171,0.179,0.35,0.341,0.538,0.495c0,0.009,0.008,0.009,0.008,0.009     v0.009c1.399,1.169,3.174,1.894,5.112,1.98c0.316,0.009,0.631,0.009,0.964-0.009h0.009c1.724-0.128,3.311-0.751,4.599-1.749     c0.461-0.35,0.879-0.751,1.254-1.186c1.289-1.493,2.074-3.43,2.082-5.564v-0.017V8.533C477.868,3.823,474.053,0,469.334,0z      M460.801,448.734l-19.567-19.567c-3.337-3.336-8.73-3.336-12.066,0l-45.167,45.167l-19.567-19.567     c-3.336-3.337-8.73-3.337-12.066,0l-19.567,19.567l-28.1-28.1c-3.336-3.337-8.73-3.337-12.066,0l-28.1,28.1L253.501,463.3     c-3.337-3.337-8.73-3.337-12.066,0l-28.1,28.1l-28.1-28.1c-1.664-1.664-3.849-2.5-6.033-2.5c-2.185,0-4.369,0.836-6.033,2.5     l-28.1,28.1l-45.167-45.167c-3.337-3.337-8.73-3.337-12.066,0l-36.634,36.634V17.067h409.6V448.734z" />
                        <path d="M77.057,409.6c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533     S72.347,409.6,77.057,409.6z" />
                        <path d="M128.001,238.933h17.067c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533S123.282,238.933,128.001,238.933z" />
                        <path d="M281.857,409.6c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533     S277.147,409.6,281.857,409.6z" />
                        <path d="M179.201,187.733h51.2c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-51.2     c-4.719,0-8.533,3.823-8.533,8.533S174.482,187.733,179.201,187.733z" />
                        <path d="M128.001,187.733h17.067c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533S123.282,187.733,128.001,187.733z" />
                        <path d="M264.534,221.867h-85.333c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h85.333     c4.719,0,8.533-3.823,8.533-8.533S269.253,221.867,264.534,221.867z" />
                        <path d="M128.001,102.4h136.533c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H128.001     c-4.719,0-8.533,3.823-8.533,8.533C119.468,98.577,123.282,102.4,128.001,102.4z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Invoice</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/order"}
                class={`flex items-center p-2  rounded-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  props.select === "Order Details"
                    ? "bg-red-400 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" fill="#000000" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z" fill="" /></svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Order details</span>
              </Link>
            </li>
            
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownProfit}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                    clip-rule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Profit
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenProfit ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenProfit && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/Profit/cost"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Supplier Details"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Cost History
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Profit/profit"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Purchase History"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Profit History
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Profit/calculate"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Pending Orders"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Calculate Profit
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownDelivery}
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  ></path>
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Delivery
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenDelivery ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenDelivery && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/Delivery"}
                      className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Delivery Details"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Delivery Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/AssignDelivery"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Assign Delivery
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to={"/Employeelogin"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Login Credentials
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/faq"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaQuestionCircle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">FAQ </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/inquiry_admin"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiMailOpenLine className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Inquiries</span>
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleDropdownReport}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Reports
                </span>
                <svg
                  className={`w-3 h-3 ${
                    isDropdownOpenReport ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpenReport && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to={"/ProductReport"}
                      className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Product Report"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Product Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Supplier/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Supplier Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/employee/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Employee Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Customer/TopCustomers"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Customer Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Wholesalecustomer/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Wholesale Customer Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Profit/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Profit Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/OrderReport"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Order Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/delivery/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Delivery Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/inquiry_admin/report"}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:text-white dark:hover:bg-gray-700 ${
                        props.select === "Assign Delivery"
                          ? "bg-red-400 text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      Inquiry Report
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li></li>
            <li>
              <Link
                to={"/loginemployee"}
                onClick={() => {
                  Auth.logout();
                }}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
