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
import TicketStatus from "./status";
const InquiryFormUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const rating = [
        { value: "Poor" },
        { value: "Average" },
        { value: "Good" },
        { value: "Excellent" },];
        

        const [loading, setLoading] = useState(false);
        const [formState, inputHandler, setFormData] = useForm(
            {
              status: {
                value: "",
                isValid: false,
              },
              rating: {
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
                    status: {
                      value: res.data.status,
                      isValid: true,
                    },
                    rating: {
                      value: res.data.rating,
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
      
            
            status: formState.inputs.status.value,
            rating: formState.inputs.rating.value,
            
          })
            .then((res) => {
                setLoading(false);
                Toast("Faq Updated Successfully!!","success")
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
            
            <div class="min-h-screen p-6 bg-white flex items-center justify-center">
            <div class="container mx-auto">
                <div>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 max-w-4xl mr-16">
                       <h2 style={{textAlign:"center", marginBottom:"10px"}}><b>Give your feedback</b></h2> 
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 items-center ml-0">
                        
                        <div class="md:col-span-8">
                            <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="rating"
                            VALIDATOR_REQUIREvalidators={[VALIDATOR_REQUIRE()]}
                            options={rating}
                            initialValue={formState.inputs.rating.value}
                            onInput={inputHandler}
                            Display=""
                            label="Rating:"
                            />
                        </div>
                        
                        <div class="md:col-span-3 text-right" >
                            <div class="inline-flex items-end" >
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