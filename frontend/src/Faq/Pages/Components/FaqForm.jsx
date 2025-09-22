import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import TextInput from "../../../Shared/Components/FormElements/Textinput";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
} 
from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { Textarea } from "@material-tailwind/react";
import BackButton from "./backbutton";

const category = [
  { value: "...." },
  { value: "Order" },
  { value: "Delivery" },
  { value: "Products" },
  { value: "Returns & Exchanges" },
  { value: "Payments & Billing" },
  { value: "Technical Support" },
  { value: "Other" },];


const FaqForm = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      issue: {
        value: "",
        isValid: false,
      },
      solution: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      aurthor: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  console.log(formState)

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/faq/new",  {
      
      issue: formState.inputs.issue.value,
      solution: formState.inputs.solution.value,
      category: formState.inputs.category.value,
      aurthor: formState.inputs.aurthor.value,
      
    })
      .then((res) => {
        setLoading(false);
        Toast("Faq Added Successfully!! 🔥","success")
        navigate("/faq/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div class="ml-60 min-h-screen p-6 bg-gray-100 flex items-center justify-right">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">Add FAQ</h2>
                <p class="text-gray-500 mb-6 text-center">Enter FAQ details below !!</p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 max-w-4xl ml-36">
                                    
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 items-center ml-40">
                        <div class="md:col-span-4">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="aurthor"
                            type="text"
                            placeholder="Enter Aurthor name" 
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                         <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="category"
                            options={category}
                            onInput={inputHandler}
                            Display=""
                            label="CATEGORY:"
                          />
                        </div>
                        <div class="md:col-span-4">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="issue"
                            type="text"
                            placeholder="Enter the Question"
                            label="QUESTION :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please fill the field "
                            onInput={inputHandler}
                          />
                        </div>
                        
                        <div class="md:col-span-3 ">
                          <TextInput
                            class="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="solution"
                            type="text"
                            placeholder="Enter the solutuon"
                            label="SOLUTION :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please fill the field"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3 text-right">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              SUBMIT
                            </Button>
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

export default FaqForm;
