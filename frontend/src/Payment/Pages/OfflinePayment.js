import React, { useState, useContext } from "react";
import axios from "axios";

import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Button from "../../Shared/Components/FormElements/Button";
import { useForm, } from "../../Shared/hooks/form-hook";
import { useNavigate,useLocation } from "react-router-dom";
import Loader from "../../Shared/Components/UiElements/Loader";
import {AuthContext} from "../../Shared/Components/context/authcontext";
import Toast from "../../Shared/Components/UiElements/Toast/Toast";

const CreditForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subtotal = queryParams.get("subtotal");
  const shippingFee = queryParams.get("shippingFee");
  const total = queryParams.get("total");
  console.log(auth.cusId);
  const [formState, inputHandler] = useForm(
    {
      uid: {
        value: "",
        isValid: true,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const handleUseCard = async () => {
    try {
      const cartResponse = await axios.get(`http://localhost:5000/cart/list/${auth.cusId}`);
      const cartItems = cartResponse.data;
     

      const response = await axios.post("http://localhost:5000/order/new", {
        uid : auth.cusId,
        cartitem : cartItems
      });

     
      console.log("Order placed successfully:",);
      // Handle success (e.g., display a success message)

      for (const item of cartItems) {
        await axios.delete(`http://localhost:5000/cart/${item._id}`);
        console.log("Cart item deleted successfully:", item._id);
      }

      await axios.post("http://localhost:5000/payment/submit", {
        subtotal: subtotal,
        shippingFee: shippingFee,
        total: total,
        user_id: auth.cusId ,// Pass the user_id parameter
        method: "Offline"
      });
      Toast("Receipt uploaded!!" , "success")
      navigate('/Products');
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error (e.g., display an error message)
    }
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formState.inputs);
    const formData = new FormData();
    formData.append("uid", auth.cusId);
    formData.append("image", formState.inputs.image.value);

    axios
      .post("http://localhost:5000/offpay/new", formData)
      .then((res) => {
        setLoading(false);
        handleUseCard();
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
          <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Offline Payment
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Submit your offline payment details
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-1 gap-y-2text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600 flex justify-center items-center">
                      <ImageUpload center id="image" onInput={inputHandler} />
                    </div>
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                        <h2 class="font-semibold text-xl text-gray-600 text-center">
                 Terms and Conditions</h2> <br /> 
                        <ol><span><li>Accepted File Formats: Receipts must be submitted in JPEG format (with the extension .jpg or .jpeg).</li>
                          <li>File Size Limitations: Receipt files must not exceed 5 MB in size.</li>
                          <li>Quality Requirements: Receipt images must be clear and legible, with all relevant details visible.</li>
                          <li>No Manipulation: Receipt images must not be edited, altered, or digitally manipulated in any way.</li>
                          <li>Original Receipts: Only original receipts for purchases are accepted. Screenshots, photocopies, or duplicates will not be processed.</li>
                          <li>Date and Details: The receipt must include the date of purchase, list of items purchased, and total amount paid.</li>
                          
                          <li>Ownership of Receipts: By submitting a receipt, you grant permission for its use in processing and verification. You retain ownership of your receipts.</li>
                          </span></ol>
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
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default CreditForm;
