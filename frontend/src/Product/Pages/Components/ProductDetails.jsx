/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import CustomerHeader from "../../../Shared/Components/UiElements/CustomerHeader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import CustomerLoader from "../../../Shared/Components/UiElements/CustomerLoader";
import ReviewCustomer from "./ReviewCustomers";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(0);
  const [total, setTotal] = useState(0);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/ProductReview/product/${id}`
      );
      const reviews = res.data;
      setLength(reviews.length);

      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.Rating,
          0
        );
        setTotal(totalRating);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    setLoading(false);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleIncrement = () => {
    if (quantity < product.Stock) {
      setQuantity(quantity + 1);
    }
  };
  let Status = 1;
  if (product.Stock === 0) {
    Status = 0;
  }

  const submithandler = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/cart/cart/new", {
        user: auth.cusId,
        product: product,
        quantity: quantity,
      })
      .then((res) => {
        setLoading(false);
        Toast("Product Added To Cart !!", "success");
        navigate("/Products");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const getStarsFromRating = () => {
    if (length === 0) {
      return { filledStars: 0, halfStar: false, emptyStars: 5 };
    }

    const avgRating = total / length;
    const maxStars = 5;

    const filledStars = Math.floor(avgRating);
    const halfStar = avgRating - filledStars >= 0.5;
    const emptyStars = maxStars - filledStars - (halfStar ? 0.5 : 0);

    return { filledStars, halfStar, emptyStars };
  };

  const { filledStars, halfStar, emptyStars } = getStarsFromRating();

  return (
    <>
      <CustomerHeader title={product.name} />
      {loading ? (
        <CustomerLoader />
      ) : (
        <>
          <main className="w-full flex flex-col lg:flex-row pb-10">
            <section className="gap-8 mt-16 pl-56  pr-16 sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
              <div className="w-96 h-96">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt="Product Image"
                  className="block m-auto pointer-events-none transition duration-300 cursor-pointer hover:shadow-xl"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </section>
            <section className="w-full p-6 lg:mt-36 lg:pr-20 lg:py-10 2xl:pr-40 2xl:mt-40">
              <h4 className="font-bold text-orange-600 mb-2 uppercase text-xs tracking-widest">
                {product.category}
              </h4>
              <h1 class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p class="text-dark-grayish mb-6 text-base sm:text-lg">
                {product.description}
              </p>
              <div class="flex items-center gap-2 sm:mt-0 pb-3">
                <div class="flex items-center gap-0.5">
                  {Array.from({ length: filledStars }, (_, index) => (
                    <svg
                      key={`filled-${index}`}
                      className="h-4 w-4 text-orange-600"
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
                  {halfStar && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-orange-600"
                      fill="currentColor"
                      width="16"
                      height="16"
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 276.901 276.901"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M275.922,105.676c-2.353-7.24-8.612-12.517-16.146-13.611l-71.441-10.381l-31.95-64.737 c-3.369-6.826-10.322-11.148-17.935-11.148c-7.613,0-14.565,4.322-17.935,11.148L88.566,81.684L17.125,92.065 c-7.533,1.095-13.793,6.371-16.146,13.611s-0.391,15.188,5.062,20.502l51.695,50.391l-12.203,71.153 c-1.287,7.504,1.798,15.087,7.956,19.562c6.159,4.475,14.326,5.065,21.063,1.521l63.898-33.594l63.899,33.594 c2.927,1.539,6.121,2.298,9.305,2.298c4.146,0,8.273-1.288,11.758-3.819c6.159-4.475,9.243-12.059,7.956-19.562l-12.204-71.153 l51.696-50.39C276.312,120.864,278.274,112.916,275.922,105.676z M183.715,155.264c-4.714,4.595-6.865,11.215-5.752,17.703 l7.131,41.575l-37.337-19.629c-2.913-1.532-6.11-2.298-9.306-2.298V70.99l18.669,37.826c2.913,5.902,8.545,9.994,15.059,10.94 l41.743,6.065L183.715,155.264z" />{" "}
                      </g>
                    </svg>
                  )}
                  {Array.from({ length: emptyStars }, (_, index) => (
                    <svg
                      key={`empty-${index}`}
                     strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4 text-orange-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#e0e0e0"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({total !== 0 && length !== 0 ? (total / length).toFixed(1) : 0}
                  )
                </p>
                <Link
                  onClick={scrollToBottom}
                  class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {" "}
                  {length} Reviews{" "}
                </Link>
              </div>
              <div class="flex items-center justify-between mb-6 sm:flex-col sm:items-start">
                <div class="flex items-center gap-4">
                  <h3 class="text-very-dark font-bold text-3xl inline-block">
                    Rs.{product.price}.00
                  </h3>
                </div>
                <p class="text-dark-grayish w-fit decoration-dark-grayish decoration-1 my-auto">
                  {Status === 1 ? (
                    <> {product.Stock} in Stock</>
                  ) : (
                    <>Out Of Stock</>
                  )}
                </p>
              </div>
              <div class="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
                <div class="w-full bg-gray-100 h-10 text-sm bg-light flex items-center justify-between rounded-lg font-bold relatives sm:w-80">
                  <div className="px-3" onClick={handleDecrement}>
                    <FaMinus
                      color="orange"
                      size={24}
                      className="hover:cursor-pointer"
                    />
                  </div>

                  <input
                    type="number"
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                    max={product.Stock}
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (
                        !isNaN(newQuantity) &&
                        newQuantity >= 1 &&
                        newQuantity <= product.Stock
                      ) {
                        setQuantity(newQuantity);
                      } else if (e.target.value === "") {
                        setQuantity(""); 
                      }
                    }}
                    onBlur={() => {
                      if (quantity === "") {
                        setQuantity(1);
                      }
                    }}
                    required
                  />
                  <div className="px-3" onClick={handleIncrement}>
                    <FaPlus
                      color="Orange"
                      size={24}
                      className="hover:cursor-pointer"
                    />
                  </div>
                </div>
                {Status === 1 ? (
                  <>
                    {" "}
                    <button
                      class="w-full h-10 bg-orange-600 py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-white shadow-md shadow-orange hover:brightness-125 transition select-none"
                      id="add-cart"
                      onClick={submithandler}
                    >
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Add to cart
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      class="w-full h-10 bg-orange-600 py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-white shadow-md shadow-orange hover:brightness-125 transition select-none"
                      id="add-cart"
                      disabled
                    >
                      Out Of Stock
                    </button>
                  </>
                )}
              </div>
            </section>
          </main>
          <ReviewCustomer
            onReviewChange={fetchReviews}
            reference={bottomRef}
            ProductID={id}
            Rating={(total / length).toFixed(1)}
          />
        </>
      )}
    </>
  );
};

export default ProductDetails;
