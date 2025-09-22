import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductReviewTable from "./Components/ProductReviewTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";
import Select from "react-tailwindcss-select";

const ProductReviews = () => {
  const [productReview, setProductReview] = useState([]);
  const [products, setProducts] = useState([]);
  const [displayProductReviews, setDisplayProductReview] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [FilteredProductReview, setFilteredProductReview] = useState([]);
  const [text, setText] = useState("All");
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [val, setVal] = useState(null);
  const dropdownButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/ProductReview/")
      .then((res) => {
        setProductReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const showDropdownOptions = () => {
    setOpenDropdown(!openDropdown);
  };
  useEffect(() => {
    setFilteredProductReview(productReview);
    setDisplayProductReview(productReview);
    setSelectedProduct(productReview);
  }, [productReview]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayProductReview(selectedProduct.slice(startIndex, endIndex));
  }, [activePage, selectedProduct , setSelectedProduct]);

  const handleChange = (value) => {
    console.log(value.value);
    setVal(value);
    if(value.value ==="all"){
      const filtered = productReview
      setFilteredProductReview(filtered);
      setSelectedProduct(filtered);
      setActivePage(1);
      setText("All");
    }
    else{
    const filtered = productReview.filter((product) => {
      if (product.ProductID) {
        return product.ProductID._id.includes(value.value);
      } else {
        return null;
      }
    });
    setFilteredProductReview(filtered);
    setSelectedProduct(filtered);
    setActivePage(1);
    setText("All");}
  };

  const handleChangeRating = (value) => {
    setText(value);
    if (value !== "All") {
      const filtered = FilteredProductReview.filter((product) => {
        if (product && product.Rating !== undefined) {
          // Check if product.Rating is equal to the specified value
          return product.Rating === value;
        }
        return false; // Default return false if conditions are not met
      });
      setSelectedProduct(filtered);
      setActivePage(1);
    } else {
      setSelectedProduct(FilteredProductReview);
      setActivePage(1);
    }
  };


  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Product Reviews"} />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl my-8">Product Reviews</h1>
            <div className="w-2/5">
              <Select
                isSearchable
                value={val}
                primaryColor={"red"}
                onChange={handleChange}
                options={[
                  {
                    value: "all",
                    label: "All Products",
                  },
                  ...products.map((product) => {
                    return {
                      value: product._id,
                      label: `${product.ID} ${product.name}`,
                    };
                  }),
                ]}
              />
            </div>
            <div class="flex-none p-2" ref={dropdownButtonRef}>
              <button
                onClick={showDropdownOptions}
                class="flex flex-row justify-between w-16 px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-blue-600"
              >
                <span class="select-none">{text}</span>
                {!openDropdown ? (
                  <svg
                    id="arrow-down"
                    class="w-6 h-6 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    id="arrow-up"
                    class="w-6 h-6 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
              {openDropdown && (
                <div
                  id="options"
                  class="block absolute z-50 w-16 py-2 mt-2 bg-white rounded-lg shadow-xl"
                >
                  <div
                    onClick={() => handleChangeRating("All")}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    All
                  </div>
                  <div
                    onClick={() => handleChangeRating(5)}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    5
                  </div>
                  <div
                    onClick={() => handleChangeRating(4)}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    4
                  </div>
                  <div
                    onClick={() => handleChangeRating(3)}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    3
                  </div>
                  <div
                    onClick={() => handleChangeRating(2)}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    2
                  </div>
                  <div
                    onClick={() => handleChangeRating(1)}
                    class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    1
                  </div>
                </div>
              )}
            </div>
          </div>
          <ProductReviewTable
            Product={displayProductReviews}
            loading={loading}
            setLoading={setLoading}
            active={activePage}
            itemsPerPage={6}
          />
          <Pagination
            active={activePage}
            totalItems={selectedProduct.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </>
  );
};

export default ProductReviews;
