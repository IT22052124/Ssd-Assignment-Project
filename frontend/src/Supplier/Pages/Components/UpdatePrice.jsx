import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate} from "react-router-dom";
import { useForm } from "../../../Shared/hooks/form-hook";
import Input from "../../../Shared/Components/FormElements/input";
import { GrUpdate } from "react-icons/gr";
import {
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE
} from "../../../Shared/Components/util/validate";
const UpdatePrice = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  
  const [loading, setLoading] = useState(false);
  const [oldPrice, setOldPrice] = useState("");
  const [formState, inputHandler, setFormData] = useForm(
    {
      unitPrice: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplierproduct/${props.id}`)
      .then((res) => {
        setFormData(
          {
            unitPrice: {
              value: res.data.unitPrice,
              isValid: true,
            },
          },
          true
        );
        setOldPrice(res.data.unitPrice);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [props.id, setFormData]);

  const submitHandler = async (event) => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/supplierproduct/updatePrice/${props.id}`, {
        
        unitPrice: formState.inputs.unitPrice.value,
      })
      .then((res) => {
        setLoading(false);
        window.location.reload(); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        type="button"
      >
        <GrUpdate />
        <span class="sr-only">Close modal</span>
      </button>
      {isOpen && setLoading && (
        <div
          id="crud-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed z-40 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Unit Price
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                  <div class="col-span-2">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Old Unit Price
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={oldPrice}
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      disabled
                    />
                  </div>
                  <Input
                    element="Input"
                    divClass="col-span-2"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    divLabel="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    id="unitPrice"
                    type="Number"
                    placeholder="Enter Unit Price"
                    label="Enter Unit Price"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                    errorText="Please Enter unit price."
                    onInput={inputHandler}
                  />
                </div>
                <button

                  onClick={submitHandler}
                  disabled={!formState.isValid}
                  type="submit"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Update Unit Price
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePrice;
