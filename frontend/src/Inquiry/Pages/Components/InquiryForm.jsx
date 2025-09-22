import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import TextInput from "../../../Shared/Components/FormElements/Textinput";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_PHONE,  
  VALIDATOR_REQUIRE,
} 
from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { AuthContext } from "../../../Shared/Components/context/authcontext";

const type = [
  { value: "...." },
  { value: "Order" },
  { value: "Delivery" },
  { value: "Products" },
  { value: "Returns & Exchanges" },
  { value: "Payments & Billing" },
  { value: "Technical Support" },
  { value: "Other" },];


const InquiryForm = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      subject: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      mail: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { id } = useParams();
  const [customer, setcustomer] = useState({});
  const auth = useContext(AuthContext);

  useEffect(()=> {
      setLoading(true);
      axios
          .get(`http://localhost:5000/customer/${auth.cusId}`)
          .then((res)=> {
              setcustomer(res.data);
              setLoading(false);
          })
          .catch((err)=> {
              console.log(err);
              setLoading(false);
          });
  }, [id] );

  console.log(formState)

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    axios
      .post("http://localhost:5000/inquiry/new",  {
      
      subject: formState.inputs.subject.value,
      description: formState.inputs.description.value,
      type: formState.inputs.type.value,
      telephone: formState.inputs.telephone.value,
      name: formState.inputs.name.value,
      mail: customer.mail,
    })
      .then((res) => {
        setLoading(false);
        Toast("Inquiry sent Successfully!! 🔥","success")
        navigate("/inquiries/");
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
          <div class="min-h-screen p-6 bg-white flex items-center justify-center ml-20">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">Make an Inquiry</h2>
                <p class="text-gray-500 mb-6 text-center">Enter Inquiry details below !!</p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:px-8 mt-6 max-w-4xl ml-36">

                    
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 items-center ml-40">
                        <div class="md:col-span-4">
                        <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            type="text"
                            initialValue={customer.name}
                            placeholder="Enter the name" 
                            label="Inquirer Name :"
                            validators={[VALIDATOR_REQUIRE()] }
                            errorText="Please fill the field."
                            onInput={inputHandler}
                            readOnly={true}
                          />
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="subject"
                            type="text"
                            placeholder="Enter the subject" 
                            label="Subject :"
                            validators={[VALIDATOR_REQUIRE()] }
                            errorText="Please fill the field."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                         <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="type"
                            options={type}
                            onInput={inputHandler}
                            Display=""
                            label="TYPE:"
                          />
                        </div>
                        <div class="md:col-span-4">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="telephone"
                            type="number"
                            placeholder="Enter the phoneNumber"
                            label="PhoneNumber :"
                            validators={[VALIDATOR_PHONE()]}
                            errorText="Please enter correct phoneNumber "
                            onInput={inputHandler}
                          />
                        </div>
                        
                        <div class="md:col-span-3 ">
                          <TextInput
                            class="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="description"
                            type="text"
                            placeholder="Explain the issue or request"
                            label="Description :"
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

export default InquiryForm;
