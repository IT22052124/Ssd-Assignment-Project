import React, { useContext, useEffect, useState } from "react";
import Review from "./review";
import axios from "axios";
import { format } from "date-fns";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import CustomerLoader from "../../../Shared/Components/UiElements/CustomerLoader";
import CheckVerify from "./checkVerify";
import { Link } from "react-router-dom";

const ReviewCustomer = ({ ProductID, reference, Rating, onReviewChange }) => {
  const Auth = useContext(AuthContext);
  const [productReviews, setProductReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [rate, setRate] = useState("All");
  const [temp, setTemp] = useState(1);
  const [AddRow, setAddRow] = useState(5);
  const [productRating, setProductRating] = useState([]);
  const [ratingCount, setRatingCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [loading, setLoading] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const totalRatings = productRating.length;
  const array = [0, 1, 2, 3, 4];

  const scrollToBottom = (rating) => {
    reference.current.scrollIntoView({ behavior: "smooth" });
    filterRating(rating)
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/ProductReview/product/${ProductID}`)
      .then((res) => {
        setProductReviews(res.data);
        setFilteredReviews(res.data);
        const ProductRating = res.data;
        setProductRating(ProductRating.map((item) => item.Rating));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, [temp, ProductID]);

  const calculateRatingCount = (ratingsArray) => {
    const count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingsArray.forEach((rating) => {
      if (count[rating] !== undefined) {
        count[rating] += 1;
      }
    });
    return count;
  };

  useEffect(() => {
    const count = calculateRatingCount(productRating);
    setRatingCount(count);
  }, [productRating]);

  const toggleModelDelete = () => {
    setOpenDeleteModel(!openDeleteModel);
  };

  const deleteHandle = async (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/ProductReview/delete/${id}`)
      .then((res) => {
        Toast("Deleted Successfully!!", "success");
        toggleModelDelete();
        onReviewChange();
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const filterRating = (value) => {
    if (value === "All") {
      setFilteredReviews(productReviews);
    } else {
      const filtered = productReviews.filter(
        (product) => product.Rating === value
      );
      setFilteredReviews(filtered);
    }
    setAddRow(5);
    setRate(value)
    console.log(rate)
  };
  return (
    <>
      <section class="bg-white antialiased dark:bg-gray-900 md:pb-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div class="shrink-0 space-y-4">
              <p class="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {isNaN(Rating) ? "No Reviews Found " : Rating + " out of 5"}
              </p>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    {rating}
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-orange-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-orange-600"
                      style={{
                        width: `${
                          isNaN(Rating)
                            ? "0"
                            : (ratingCount[rating] / totalRatings) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <Link
                    onClick={()=> scrollToBottom(rating)}
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                  >
                    {ratingCount[rating]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </Link>
                </div>
              ))}
            </div>
            <Review
              ProductID={ProductID}
              onReviewChange={onReviewChange}
              setTemp={setTemp}
              temp={temp}
            />
          </div>

          <div
            class="mt-6 divide-y divide-gray-200 dark:divide-gray-700 w-5/6 float-left"
            ref={reference}
          >
            {filteredReviews.length === 0 ? (
              <div className="relative text-center">
                <h2 className="font-semibold">No reviews Here</h2>
              </div>
            ) : (
              filteredReviews.slice(0, AddRow).map((ProductR, index) => {
                let formattedDate = "";
                let dateString = ProductR.createdAt;

                if (dateString) {
                  const convertedDateString = dateString.replace("Z", "+00:00");
                  formattedDate = format(
                    new Date(convertedDateString),
                    "MMMM d yyyy 'at' HH:mm"
                  );
                }
                return (
                  <div class="gap-3 pb-6 sm:flex sm:items-start">
                    <div class="shrink-0 space-y-2 sm:w-48 md:w-72">
                      <div class="flex items-center gap-0.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              className={`h-4 w-4 ${
                                starIndex < ProductR.Rating
                                  ? "text-orange-600"
                                  : "text-gray-300"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div class="space-y-0.5">
                        <p class="text-base font-semibold text-gray-900 dark:text-white">
                          {ProductR.UserID
                            ? ProductR.UserID.name
                            : "Deleted User"}
                        </p>
                        <div class="flex items-center">
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {formattedDate}
                        </p>
                        
                        {ProductR.UserID._id === Auth.cusId && (
                          <>
                            <div class="flex items-center">
                              <button
                                onClick={toggleModelDelete}
                                type="button"
                                class="relative p-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 z-10"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 30 30"
                                >
                                  <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                </svg>
                              </button>
                            </div>
                            {openDeleteModel &&
                              (loading ? (
                                <CustomerLoader />
                              ) : (
                                <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
                                  <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                                    <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                                    <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                                      <div class="md:flex items-center">
                                        <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                          <i class="bx bx-error text-3xl">
                                            &#9888;
                                          </i>
                                        </div>
                                        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                          <p class="font-bold">Warning!</p>
                                          <p class="text-sm text-gray-700 mt-1">
                                            Deleting your review is
                                            irreversible. Are you sure you want
                                            to proceed?
                                          </p>
                                        </div>
                                      </div>
                                      <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                                        <button
                                          onClick={() => {
                                            deleteHandle(ProductR._id);
                                          }}
                                          class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-orange-600 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                                        >
                                          Delete
                                        </button>
                                        <button
                                          onClick={toggleModelDelete}
                                          class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </>
                        )}
                        </div>
                      </div>
                      {ProductR.UserID &&
                      <CheckVerify ProductID={ProductID} UserID={ProductR.UserID._id}/>}
                    </div>

                    <div class="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                      <p class="text-base font-normal text-gray-800 dark:text-gray-400">
                        {ProductR.Message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            {AddRow < filteredReviews.length && (
              <div class="mt-6 pt-10 text-center">
                <button
                  type="button"
                  onClick={() => setAddRow(AddRow + 5)}
                  class="mb-2 me-2 rounded-lg border border-gray-200 bg-orange-500  px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-300 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  View more reviews
                </button>
              </div>
            )}
          </div>

          <div class="absolute right-40 pt-10 ">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <li>
                <button
                  type="button"
                  onClick={() => filterRating("All")}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === "All" && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">All&nbsp;</li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1 h-5 w-5 text-danger"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </li>
                  </ul>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => filterRating(5)}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === 5 && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">5&nbsp;</li>
                    {array.slice(0, 5).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => filterRating(4)}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === 4 && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">4&nbsp;</li>
                    {array.slice(0, 4).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      );
                    })}
                    {array.slice(0, 1).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => filterRating(3)}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === 3 && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">3&nbsp;</li>
                    {array.slice(0, 3).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      );
                    })}
                    {array.slice(0, 2).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => filterRating(2)}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === 2 && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">2&nbsp;</li>
                    {array.slice(0, 2).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      );
                    })}
                    {array.slice(0, 3).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => filterRating(1)}
                  class={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${rate === 1 && "bg-gray-100"} hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <ul className="flex justify-center">
                    <li className="pt-0.5">1&nbsp;</li>
                    {array.slice(0, 1).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      );
                    })}
                    {array.slice(0, 4).map(() => {
                      return (
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="mr-1 h-5 w-5 text-orange-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewCustomer;
