import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Shared/Components/FormElements/input";
import Dropdown from "../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
} from "../../Shared/Components/util/validate";
import { useForm } from "../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Components/UiElements/Loader";

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


const CustomerForm = () => {

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
      city: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
      password: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  console.log(formState)

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name',formState.inputs.name.value);
    formData.append('telephone',formState.inputs.telephone.value);
    formData.append('mail',formState.inputs.mail.value);
    formData.append('address',formState.inputs.address.value);
    formData.append('city',formState.inputs.city.value);
    formData.append('password',formState.inputs.password.value);
    formData.append('image',formState.inputs.image.value);

    axios
      .post("http://localhost:5000/customer/", formData)
      .then((res) => {
        setLoading(false);
        navigate("/Products/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
      console.table(Object.fromEntries(formData))
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">Get Registered!!</h2>
                <p class="text-gray-500 mb-6 text-center">Enter your details below </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600 flex justify-center items-center">
                      <ImageUpload center id="image" onInput={inputHandler} />
                    </div>
                    <div class="lg:col-span-2">
                      
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
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
                            placeholder="Enter Street & Postal Code"
                            label="Address :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter an Address."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            label="Password :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Password."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="city"
                            options={City}
                            onInput={inputHandler}
                            Display=""
                            label="City:"
                          />
                        </div>
                        <div class="md:col-span-5 text-right">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Register
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

export default CustomerForm;