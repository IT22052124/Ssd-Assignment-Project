import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const City = [
  { value: "...." },
  { value: "Ampara" },
  { value: "Anuradhapura" },
  { value: "Badulla" },
  { value: "Batticaloa" },
  { value: "Colombo" },
  { value: "Galle" },
  { value: "Gampaha" },
  { value: "Hambantota" },
  { value: "Jaffna" },
  { value: "Kalutara" },
  { value: "Kandy" },
  { value: "Kegalle" },
  { value: "Kilinochchi" },
  { value: "Kurunegala" },
  { value: "Mannar" },
  { value: "Matale" },
  { value: "Matara" },
  { value: "Monaragala" },
  { value: "Mullaitivu" },
  { value: "Nuwara Eliya" },
  { value: "Polonnaruwa" },
  { value: "Puttalam" },
  { value: "Ratnapura" },
  { value: "Trincomalee" },
  { value: "Vavuniya" },
];


const WholesalecustomerForm = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      mail: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      creditlimit: {
        value: "",
        isValid: false,
      },
      credit: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (formState.inputs.credit.value > formState.inputs.creditlimit.value) {
      alert("Credit exceeds credit limit!");
      setLoading(false);
      return; 
    } 

    axios
      .post("http://localhost:5000/wholesalecustomer/new", {
        id: 1,
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        email: formState.inputs.mail.value,
        address: formState.inputs.address.value,
        creditlimit: formState.inputs.creditlimit.value,
        credit: formState.inputs.credit.value,
      })
      .then((res) => {
        setLoading(false);
        Toast("Wholesalecustomer added successfully!!","success")
        navigate("/Wholesalecustomer/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <div class="min-h-full px-6 py-10 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">Add Wholesalecustomer</h2>
                <p class="text-gray-500 mb-6 text-center">Enter Wholesalecustomer details below !!</p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                    <div class="lg:col-span-2">
                      
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            type="text"
                            placeholder="Enter Wholesalecustomer Name"
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="telephone"
                            type="number"
                            placeholder="Enter Telephone Number"
                            label="Telephone :"
                            validators={[VALIDATOR_PHONE()]}
                            errorText="Please Enter a valid Phone Number (10 numbers)"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="mail"
                            type="text"
                            placeholder="Enter Mail"
                            label="Email :"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please Enter a valid mail."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="address"
                            type="text"
                            placeholder="Enter Address"
                            label="Address :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter an Address."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                        <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="creditlimit"
                            type="number"
                            placeholder="Enter Creditlimit"
                            label="creditlimit :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a valid creditlimit (numbers)"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                        <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="credit"
                            type="number"
                            placeholder="Enter Credit"
                            label="credit :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a valid credit (numbers)"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5 text-right">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default WholesalecustomerForm;
