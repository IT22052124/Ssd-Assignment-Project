/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import {SnackbarProvider, useSnackbar} from 'notistack';
import Button from "../../../Shared/Components/FormElements/Button";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";

const EmployeeformUpdate = () => {
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const Type = [
  { value: "...." },
  { value: "Sales person" },
  { value: "System Administrator" },
  { value: "Manager" },
  { value: "Store Keeper" },
  { value: "Cashier" },
  { value: "Glass cutter"},
  ];
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      mail: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      hourlywage: {
        value: "",
        isValid: false,
      },
      
    },
    false
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/employee/update/${id}`)
      .then((res) => {
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            telephone: {
              value: res.data.telephone,
              isValid: true,
            },
            address: {
              value: res.data.address,
              isValid: true,
            },
            mail: {
              value: res.data.mail,
              isValid: true,
            },
            type: {
              value: res.data.type,
              isValid: true,
            },
            hourlywage: {
              value: res.data.hourlywage,
              isValid: true,
            },
            
          },
          true
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/employee/update/${id}`, {
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        address: formState.inputs.address.value,
        mail: formState.inputs.mail.value,
        type: formState.inputs.type.value,
        hourlywage: formState.inputs.hourlywage.value,
       
      })
      .then((res) => {
        setLoading(false);
        Toast("Employee Updated Successfully!! 🔥","success")
        navigate("/Employee/");
      })
      .catch((err) => {
        enqueueSnackbar('Error',{variant:'Error'});
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <h1> LOADING...</h1>
      ) : (
        <>
        <div class="min-h-full px-6 py-10 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Update Employee
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Update employee details below !!
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                   
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                        <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            initialValid
                            type="text"
                            initialValue={formState.inputs.name.value}
                            placeholder="Enter employee Name"
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />

                        </div>
                        <div class="md:col-span-2">
                          <Input
                          initialValid
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="address"
                            type="text"
                            initialValue={formState.inputs.address.value}
                            placeholder="Enter Address"
                            label="Street :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter an Address."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            initialValid
                            id="telephone"
                            type="number"
                            initialValue={formState.inputs.telephone.value}
                            placeholder="Enter Telephone Number"
                            label="Telephone :"
                            validators={[VALIDATOR_PHONE()]}
                            errorText="Please Enter a valid Phone Number (10 numbers)"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            initialValid
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="mail"
                            type="text"
                            initialValue={formState.inputs.mail.value}
                            placeholder="Enter Mail"
                            label="Email :"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please Enter a valid mail."
                            onInput={inputHandler}
                          />
                        </div>
                        
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="type"
                            initialValue={formState.inputs.type.value}
                            options={Type}
                            onInput={inputHandler}
                            Display=""
                            label="Employee Type:"
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-2 ">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-5"
                            element="Input"
                            id="hourlywage"
                            initialValid
                            type="number"
                            initialValue={formState.inputs.hourlywage.value}
                            placeholder="Enter Hourly Wage"
                            label="Daily Wage :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter wage."
                            onInput={inputHandler}
                          />

                        <div class="md:col-span-5 text-right ">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Update
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
          </div>
        </>
         
      )}
    </form>
  );
};

export default EmployeeformUpdate;
