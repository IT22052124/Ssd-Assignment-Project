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

const InquiryFormUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const status = [
        { value: "Pending" },
        { value: "On progress" },
        { value: "Solved" },];

        const [loading, setLoading] = useState(false);
        const [formState, inputHandler, setFormData] = useForm(
            {
              reply: {
                value: "",
                isValid: false,
              },
              status: {
                value: "",
                isValid: false,
              },
            },
            false
          );

          useEffect(() =>{
            setLoading(true);
            axios
              .get(`http://localhost:5000/inquiry/${id}`)
              .then((res) => {
                setFormData(
                  {
                    reply: {
                      value: res.data.reply,
                      isValid: true,
                    },
                    status: {
                      value: res.data.status,
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
            .put(`http://localhost:5000/inquiry/${id}`, {
      
            
            reply: formState.inputs.reply.value,
            status: formState.inputs.status.value,
            
          })
            .then((res) => {
                setLoading(false);
                Toast("Faq Updated Successfully!!","success")
                navigate("/inquiry_admin/");
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
            <div class="min-h-screen p-6 bg-white flex items-center justify-center">
            <div class="container mx-auto">
                <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center"></h2>
                <p class="text-gray-500 mb-6 text-center"></p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 max-w-4xl mr-16">


                    
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 items-center ml-0">
                        <div class="md:col-span-7 ">
                            <TextInput
                            class="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="reply"
                            type="text"
                            initialValue={formState.inputs.reply.value}
                            validators={[VALIDATOR_REQUIRE()]}
                            placeholder="Enter a Reply"
                            label="Reply :"
                            errorText="Please fill the field"
                            onInput={inputHandler}
                            />
                        </div>
                        <div class="md:col-span-3">
                            <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="status"
                            VALIDATOR_REQUIREvalidators={[VALIDATOR_REQUIRE()]}
                            options={status}
                            initialValue={formState.inputs.status.value}
                            onInput={inputHandler}
                            Display=""
                            label="Status:"
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

export default InquiryFormUpdate;