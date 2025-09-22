import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { useForm } from "../../../Shared/hooks/form-hook";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../../Shared/Components/util/validate";


function PopUp(props) {
    const [isclick, setisClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [products, setproducts] = useState([]);
    const [product, setProduct] = useState();
  

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setproducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


    const [formState, inputHandler] = useForm(
        {
          unitPrice: {
            value: "",
            isValid: true,
          },
        },
        false
      );

      const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        axios
          .post("http://localhost:5000/supplierproduct/", {
            supplier: props.id,
            product: product,
            unitPrice: formState.inputs.unitprice.value,
          })
          .then((res) => {
            setLoading(false);
            window.location.reload(); 
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
        console.log(formState);
      };
  
    const togglemodel = () => {
      setisClick(!isclick);
    };
  
    console.log("Selected Product ID:", product);
    return (
      <>
        <Link
          onClick={togglemodel}
        >
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
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
                    
                    <form onSubmit={submitHandler} class="max-w-sm mx-auto pt-8">
                        <div class="flex items-center">
                            <label class="block mb-2 text-base font-medium text-gray-900 dark:text-white mr-2">Select a product : </label>
                            <select
                                value={product}
                                onChange={(event) => setProduct(event.target.value)}
                                id="product"
                                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={{ padding: "0.5rem" }}
                            >
                                <option value="">Select a product</option>
                                {products.map((item, index) => (
                                    <option key={item._id} value={item._id}>
                                        {item.ID} - {item.name}
                                    </option>
                                ))}
                            </select>
                            
                        </div>
                        <div class="flex items-center mt-4"> 
                            <label class="block mb-2 text-base font-medium text-gray-900 dark:text-white mr-2">Enter Unit Price : </label>
                            <Input
                                class="ml-5 flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{padding: '0.5rem'}}
                                element="Input"
                                id="unitprice"
                                type="number"
                                placeholder="Enter unit price"
                                validators={[[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]]}
                                errorText="Please Enter Unit Price"
                                onInput={inputHandler}
                            />
                        </div>
                    </form>

                    <div class="flex justify-center items-center space-x-4 pt-9">
                      <button
                        onClick={submitHandler}
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

export default PopUp;