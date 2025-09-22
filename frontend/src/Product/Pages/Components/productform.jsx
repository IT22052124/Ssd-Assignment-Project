import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const Category = [
  { value: "...." },
  { value: "Aluminium Bars" },
  { value: "Aluminium Accessories" },
  { value: "Boards" },
  { value: "House Accessories" },
  { value: "Pentry Accessories" },
  { value: "Locks" },
  { value: "Other" },
];

const ProductForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
      Alert_quantity: {
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

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formState.inputs)
    const formData = new FormData();
    formData.append('name',formState.inputs.name.value);
    formData.append('description',formState.inputs.description.value);
    formData.append('category',formState.inputs.category.value);
    formData.append('price',formState.inputs.price.value);
    formData.append('weight',formState.inputs.weight.value);
    formData.append('Alert_quantity',formState.inputs.Alert_quantity.value);
    formData.append('image',formState.inputs.image.value);

    axios
      .post("http://localhost:5000/product/new", formData)
      .then((res) => {
        setLoading(false);
        Toast("Product Added Successfully!! 🔥","success")
        navigate("/Product/");
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
                <h2 class="font-semibold text-xl text-gray-600 text-center">Add Product</h2>
                <p class="text-gray-500 mb-6 text-center">Enter Product details below !!</p>
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
                            placeholder="Enter Product Name"
                            label="Product Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="description"
                            type="text"
                            placeholder="Enter Description"
                            label="Description :"
                            validators={[
                              VALIDATOR_MINLENGTH(5),
                              VALIDATOR_MAXLENGTH(250),
                            ]}
                            errorText="Please Enter a Description (5 - 250 letters)"
                            onInput={inputHandler}
                            initialValue="No Description Available !!"
                            initialValid= {true}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="price"
                            type="number"
                            placeholder="Enter Price"
                            label="Selling Price :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a price."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="weight"
                            type="number"
                            placeholder="Enter Weight of product"
                            label="Weight :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a Weight."
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
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="Alert_quantity"
                            type="number"
                            placeholder="Enter Quantity"
                            label="Alert Quantity :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a Quantity."
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

export default ProductForm;
export { Category };
