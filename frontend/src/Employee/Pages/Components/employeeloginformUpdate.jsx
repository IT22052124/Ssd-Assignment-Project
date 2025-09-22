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

const EmployeeloginformUpdate = () => {
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      role:{
        value: "",
        isValid: false,

      },
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/Employeelogin/update/${id}`)
      .then((res) => {
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            role:{
                value:res.data.role,
                isValid: false,
            },
            username: {
              value: res.data.username,
              isValid: true,
            },
            password: {
              value: res.data.password,
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
      .put(`http://localhost:5000/Employeelogin/update/${id}`, {
        name: formState.inputs.name.value,
        role: formState.inputs.role.value,
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
       
      })
      .then((res) => {
        setLoading(false);
        Toast("Employee credential Updated Successfully!! 🔥","success")
        navigate("/Employeelogin/");
      })
      .catch((err) => {
        enqueueSnackbar('Error',{variant:'Error'});
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };
  const Type = [
    { value: "...." },
    { value: "Cashier" },
    { value: "System Administrator" },
  
  ];

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
                  Update credential
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Update credentials details below !!
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
                          <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="role"
                            initialValue={formState.inputs.role.value}
                            options={Type}
                            onInput={inputHandler}
                            Display=""
                            label=" Role:"
                            initialValid
                          />
                        </div>
                          

                        </div>
                        <div class="md:col-span-2">
                          <Input
                          initialValid
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="username"
                            type="text"
                            initialValue={formState.inputs.username.value}
                            placeholder="Enter username"
                            label="username :"
                            validators={[ VALIDATOR_EMAIL()]}
                            errorText="Please Enter an Address."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            initialValid
                            id="password"
                            type="text"
                            initialValue={formState.inputs.password.value}
                            placeholder="Enter Telephone Number"
                            label="Password :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a password"
                            onInput={inputHandler}
                          />
                        </div>
                        
                        </div>
                        
                        
                        </div>
                        <div class="md:col-span-2 ">
                          

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
          
        </>
         
      )}
    </form>
  );
};

export default EmployeeloginformUpdate;
