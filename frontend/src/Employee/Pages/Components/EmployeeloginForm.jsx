import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import { SnackbarProvider, useSnackbar } from "notistack";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const EmployeeloginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      role:{
        value: "",
        isValid: false,

      }
      ,

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
  const Type = [
    { value: "...." },
    { value: "Cashier" },
    { value: "System Administrator" },
  
  ];

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/EmployeeLogin/new", {
        id: 1,
        name: formState.inputs.name.value,
        role:formState.inputs.role.value,
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
      })
      .then((res) => {
        setLoading(false);
        Toast("Employee Added Successfully!! 🔥", "success");
        navigate("/EmployeeLogin");
      })
      .catch((err) => {
        enqueueSnackbar("error", { variant: "Error" });
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
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Add Emmployee login credentials
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Enter Employee credentials below !!
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
                            type="text"
                            placeholder="Enter Employee Name"
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="role"
                            options={Type}
                            onInput={inputHandler}
                            Display=""
                            label="Role:"
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            label="username :"
                            validators={[ VALIDATOR_EMAIL()]}
                            errorText="Please Enter a username"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="password"
                            type="text"
                            placeholder="Enter password"
                            label="password :"
                            errorText="Please Enter a valid password"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        </>
      )}
    </form>
  );
};
export default EmployeeloginForm;
