import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const Category = [
  { value: "...." },
  { value: "VISA" },
  { value: "Mastercard" },
];

const CCForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const subtotal = queryParams.get("subtotal");
  const shippingFee = queryParams.get("shippingFee");
  const total = queryParams.get("total");
  const selectedItemsString = queryParams.get("selectedItems");
  const selectedItems = selectedItemsString ? selectedItemsString.split(",") : [];
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      cvv: {
        value: "",
        isValid: false,
      },
      expiredate: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/OnPay/onpay/card/${id}`)
      .then((res) => {
        setFormData(
          {
            firstname: {
              value: res.data.firstname,
              isValid: true,
            },
            lastname: {
              value: res.data.lastname,
              isValid: true,
            },
            category: {
              value: res.data.category,
              isValid: true,
            },
            cvv: {
              value: res.data.cvv,
              isValid: true,
            },
            expiredate: {
              value: res.data.expiredate,
              isValid: true,
            },
            number: {
              value: res.data.number,
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

  console.log(formState)

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstname", formState.inputs.firstname.value);
    formData.append("lastname", formState.inputs.lastname.value);
    formData.append("category", formState.inputs.category.value);
    formData.append("cvv", formState.inputs.cvv.value);
    formData.append("expiredate", formState.inputs.expiredate.value);
    formData.append("number", formState.inputs.number.value);

    console.table(Object.fromEntries(formData))

    axios
      .put(`http://localhost:5000/OnPay/onpay/${id}`, {
        firstname: formState.inputs.firstname.value,
        lastname: formState.inputs.lastname.value,
        category: formState.inputs.category.value,
        cvv: formState.inputs.cvv.value,
        expiredate: formState.inputs.expiredate.value,
        number: formState.inputs.number.value,
      })
      .then((res) => {
        setLoading(false);
        Toast("Credit Card Updated Successfully!!", "success");
        navigate(`/CC?subtotal=${subtotal}&shippingFee=${shippingFee}&total=${total}&selectedItems=${selectedItems.join(",")}`);
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
          <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Add Credit Card Information
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Enter Credit card details below !!
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="firstname"
                            type="text"
                            placeholder="Enter First Name"
                            label="First Name :"
                            initialValue={formState.inputs.firstname.value}
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MAXLENGTH(16),
                            ]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="lastname"
                            type="text"
                            placeholder="Enter Last Name"
                            label="Last Name :"
                            initialValue={formState.inputs.lastname.value}
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MAXLENGTH(16),
                            ]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="number"
                            type="text"
                            placeholder="Enter Card Number"
                            label="Card Number :"
                            initialValue={formState.inputs.number.value}
                            validators={[
                              VALIDATOR_MINLENGTH(16),
                              VALIDATOR_MAXLENGTH(16),
                            ]}
                            errorText="Please enter correct card number"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="cvv"
                            type="number"
                            placeholder="Enter CVV"
                            label="CVV :"
                            initialValue={formState.inputs.cvv.value}
                            validators={[
                              VALIDATOR_MIN(0),
                              VALIDATOR_MAX(10000),
                            ]}
                            errorText="Please Enter your cvv"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="category"
                            options={Category}
                            onInput={inputHandler}
                            Display=""
                            label="Category:"
                            initialValue={formState.inputs.category.value}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Card type."
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="expiredate"
                            type="date"
                            placeholder="Enter Expiry Date"
                            label="Expiry Date :"
                            initialValue={formState.inputs.expiredate.value}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_DATE()]}
                            errorText="Please Enter a Expiry date."
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

export default CCForm;
export { Category };
