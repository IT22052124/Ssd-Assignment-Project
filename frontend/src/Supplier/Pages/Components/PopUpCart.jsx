import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { useForm } from "../../../Shared/hooks/form-hook";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from "../../../Shared/Components/util/validate";

const PopUpCart = (props) => {
  const [isclick, setisClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeFromCart = (product) => {
    const updatedCart = props.cart.filter((item) => item.product !== product);
    props.setCart(updatedCart);
  };
  
  

  const togglemodel = () => {
    setisClick(!isclick);
  };

 
  return (
    <>
      <button
        type="button"
        onClick={togglemodel}
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Purchase
      </button>
      {isclick && (
        <>
          <div
            id="deleteModal"
            tabindex="-1"
            className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            aria-modal="true"
            role="dialog"
          >
            {loading ? (
              <Loader />
            ) : (
              <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
                <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <button
                    onClick={togglemodel}
                    type="button"
                    class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="deleteModal"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>

                  <form onSubmit={props.submitHandler} class="max-w-sm mx-auto pt-8">
                    <div class="flex items-center">
                      <ul>
                        {props.cart.map((item, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <div>
                              <span className="font-semibold mr-2">
                                Product Name:
                              </span>
                              {item.productName}
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">
                                Quantity:
                              </span>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  props.updateQuantity(
                                    item.product,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="border rounded px-2 py-1"
                              />
                              <button
                                onClick={() => removeFromCart(item.product)}
                                className="ml-4 px-2 py-1 bg-red-500 text-white"
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </form>

                  <div class="flex justify-center items-center space-x-4 pt-9">
                    <button
                      onClick={props.submitHandler}
                      type="submit"
                      
                      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PopUpCart;
