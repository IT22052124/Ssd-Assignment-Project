/* eslint-disable react-hooks/rules-of-hooks */
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const ProductformUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [clickStock,setClickStock] = useState(false)

  const toggleStock = () =>{
    setClickStock(!clickStock)
  }


  const [formState, inputHandler, setFormData] = useForm(
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

      weight: {
        value: "",
        isValid: false,
      },
      Alert_quantity: {
        value: "",
        isValid: false,
      },
      Stock: {
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
      .get(`http://localhost:5000/product/update/${id}`)
      .then((res) => {
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            description: {
              value: res.data.description,
              isValid: true,
            },
            category: {
              value: res.data.category,
              isValid: true,
            },
            weight: {
              value: res.data.weight,
              isValid: true,
            },
            Alert_quantity: {
              value: res.data.Alert_quantity,
              isValid: true,
            },
            Stock: {
              value: res.data.Stock,
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
  console.table(formState);
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("category", formState.inputs.category.value);
    formData.append("weight", formState.inputs.weight.value);
    formData.append("Alert_quantity", formState.inputs.Alert_quantity.value);
    formData.append("Stock", formState.inputs.Stock.value);
    formData.append("image", formState.inputs.image.value);
    axios
      .put(`http://localhost:5000/product/update/${id}`, formData)
      .then((res) => {
        setLoading(false);
        Toast("Product Updated Successfully!!", "success");
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
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Update Product
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Enter Product details below !!
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600 flex justify-center items-center">
                      <ImageUpload
                        center
                        id="image"
                        onInput={inputHandler}
                        initialValue={formState.inputs.image.value}
                      />
                    </div>
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            initialValue={formState.inputs.name.value}
                            type="text"
                            placeholder="Enter Product Name"
                            label="Product Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="description"
                            type="text"
                            initialValue={formState.inputs.description.value}
                            placeholder="Enter Description"
                            label="Description :"
                            validators={[
                              VALIDATOR_MINLENGTH(5),
                              VALIDATOR_MAXLENGTH(250),
                            ]}
                            errorText="Please Enter a Description (5 - 250 words)"
                            onInput={inputHandler}
                            initialValid
                          />
                        </div>

                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="weight"
                            initialValue={formState.inputs.weight.value}
                            type="number"
                            placeholder="Enter Weight of product"
                            label="Weight :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a Weight."
                            onInput={inputHandler}
                            initialValid
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
                            initialValid
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="Alert_quantity"
                            initialValue={formState.inputs.Alert_quantity.value}
                            type="number"
                            placeholder="Enter Alert Quantity of product"
                            label="Alert Quantity :"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                            errorText="Please Enter a number :"
                            onInput={inputHandler}
                            initialValid
                          />
                        </div>
                        
                         <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="Stock"
                            initialValue={formState.inputs.Stock.value}
                            type="number"
                            placeholder="Enter Stock of product"
                            label="Stock ( Warning ⚠️):"
                            validators={[VALIDATOR_REQUIRE(),VALIDATOR_MIN(0)]}
                            errorText="Please Enter a Number."
                            onInput={inputHandler}
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

export default ProductformUpdate;
