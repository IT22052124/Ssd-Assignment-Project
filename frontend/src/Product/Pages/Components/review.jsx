import axios from "axios";
import React, { useContext, useState } from "react";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { AuthContext } from "../../../Shared/Components/context/authcontext";

const Review = ({ProductID , setTemp , temp , onReviewChange}) => {
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0) {
      Toast("Please select a rating before submitting.", "error");
      return; 
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/ProductReview/new", {
        userID: auth.cusId,
        Productid: ProductID,
        rating: rating,
        message: message,
      })
      .then((res) => {
        setLoading(false);
        Toast("Thank You For Your Feedback !", "success");
        setTemp(temp + 1)
        setRating(0);
        setMessage("");
        onReviewChange()
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div class="text-white">
        <div className="container flex flex-col justify-center items-center">
          <div className="relative flex flex-col min-w-0 break-words w-2/3 max-w-3xl mb-6 shadow-lg rounded-lg bg-white">
            <div class="flex-auto p-6">
              {loading && (
                <div className="flex justify-center items-center h-full">
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-t-yellow-300 border-gray-300 rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
              <h4 class="text-2xl mb-4 text-black font-semibold">
                Write a Review?
              </h4>
              <form id="feedbackForm" onSubmit={handleFormSubmit} action="#">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="email"
                  >
                    Rating
                  </label>
                  <div class="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        className={`w-8 h-8 ms-3 ${
                          index < rating ? "text-orange-600" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => setRating(index + 1)}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="message"
                  >
                    Message
                  </label>
                  <textarea
                    maxlength="300"
                    name="feedback"
                    id="feedback"
                    rows="4"
                    cols="80"
                    class="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                    placeholder=""
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  ></textarea>
                </div>
                <div class="text-center mt-6">
                  <button
                    id="feedbackBtn"
                    class=" bg-orange-600 text-white hover:bg-orange-300 text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
