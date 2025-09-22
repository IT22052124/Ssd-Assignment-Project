import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import TextInput from "../../../Shared/Components/FormElements/Textinput";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import BackButton from "./backbutton";
const FaqFormUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const category = [
        { value: "...." },
        { value: "Order" },
        { value: "Delivery" },
        { value: "Products" },
        { value: "Returns & Exchanges" },
        { value: "Payments & Billing" },
        { value: "Technical Support" },
        { value: "Other" },];

        const [loading, setLoading] = useState(false);
        const [formState, inputHandler, setFormData] = useForm(
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

          useEffect(() =>{
            setLoading(true);
            axios
              .get(`http://localhost:5000/faq/${id}`)
              .then((res) => {
                setFormData(
                  {
                    issue: {
                      value: res.data.issue,
                      isValid: true,
                    },
                    solution: {
                      value: res.data.solution,
                      isValid: true,
                    },
                    category: {
                      value: res.data.category,
                      isValid: true,
                    },
                    aurthor: {
                      value: res.data.aurthor,
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

          }, [id, setFormData])

          const submitHandler = async (event) => {
            event.preventDefault();
            setLoading(true);

            
            axios
            .put(`http://localhost:5000/faq/${id}`, {
      
            issue: formState.inputs.issue.value,
            solution: formState.inputs.solution.value,
            category: formState.inputs.category.value,
            aurthor: formState.inputs.aurthor.value,
            
          })
            .then((res) => {
                setLoading(false);
                Toast("Faq Updated Successfully!!","success")
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
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
                <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">UPDATE FAQ</h2>
                <p class="text-gray-500 mb-6 text-center">Update FAQ details below !!</p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 max-w-4xl ml-72">
                      <BackButton></BackButton>
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 items-center ml-40">
                        <div class="md:col-span-4">
                            <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="aurthor"
                            type="text"
                            initialValue={formState.inputs.aurthor.value}
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
                            initialValue={formState.inputs.category.value}
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
                            initialValue={formState.inputs.issue.value}
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
                            initialValue={formState.inputs.solution.value}
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
}

export default FaqFormUpdate;