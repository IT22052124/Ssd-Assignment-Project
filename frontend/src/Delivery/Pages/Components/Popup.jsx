import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../Shared/hooks/form-hook";
import axios from "axios";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { GrUpdate } from "react-icons/gr";
import Input from "../../../Shared/Components/FormElements/input";
import { VALIDATOR_REQUIRE } from "../../../Shared/Components/util/validate";

const Popup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginDetails , setLoginDetails] = useState({})
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:5000/deliverylogin/`, {
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
        deliveryId: props.deliveryId, // Pass the deliveryId to the API
      })
      .then((res) => {
        setLoading(false);
        Toast("Username and Password Added!!", "success");
        navigate("/Delivery/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        type="button"
      >
        <GrUpdate />
        <span className="sr-only">Close modal</span>
      </button>
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed z-40 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Set Username and Password
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={submitHandler}>
                <Input
                  element="Input"
                  divClass="col-span-2 mb-4"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  divLabel="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  id="username"
                  type="text"
                  placeholder="Enter New Username"
                  label="Enter A New Username"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please Enter a Username."
                  onInput={inputHandler}
                />
                <Input
                  element="Input"
                  divClass="col-span-2 mb-4"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  divLabel="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  id="password"
                  type="password"
                  placeholder="Enter New Password"
                  label="Enter A New Password"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please Enter a Password."
                  onInput={inputHandler}
                />
                <button
                  onClick={submitHandler}
                  disabled={!formState.isValid || loading}
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Set Username and Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
