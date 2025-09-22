/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const SupplierformUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    },
    false
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplier/${id}`)
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
            mail: {
              value: res.data.mail,
              isValid: true,
            },
            address: {
              value: res.data.address,
              isValid: true,
            },
            city: {
                value: res.data.city,
                isValid: true,
              },
            image: {
              value: res.data.image,
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

    const formData = new FormData();
    formData.append('name',formState.inputs.name.value);
    formData.append('telephone',formState.inputs.telephone.value);
    formData.append('mail',formState.inputs.mail.value);
    formData.append('address',formState.inputs.address.value);
    formData.append('city',formState.inputs.city.value);
    formData.append('image',formState.inputs.image.value);

    axios
      .put(`http://localhost:5000/supplier/${id}`, formData)
      .then((res) => {
        setLoading(false);
        Toast("Supplier Updated Successfully!!","success")
        navigate("/Supplier/");
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
        <div class="min-h-full px-6 py-10 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Update Supplier
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Enter Supplier details below !!
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600 flex justify-center items-center">
                      <ImageUpload center id="image" onInput={inputHandler} initialValue={formState.inputs.image.value}/>
                    </div>
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                        <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            type="text"
                            initialValue={formState.inputs.name.value}
                            placeholder="Enter Supplier Name"
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="telephone"
                            type="number"
                            initialValue={formState.inputs.telephone.value}
                            placeholder="Enter Telephone Number"
                            label="Telephone :"
                            validators={[VALIDATOR_PHONE()]}
                            errorText="Please Enter a valid Phone Number (10 numbers)"
                            onInput={inputHandler}
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
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
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
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
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="city"
                            initialValue={formState.inputs.city.value}
                            options={City}
                            onInput={inputHandler}
                            Display=""
                            label="City:"
                            initialValid
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

export default SupplierformUpdate;
