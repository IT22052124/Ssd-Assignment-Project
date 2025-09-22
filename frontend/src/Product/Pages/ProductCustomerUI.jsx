import React, { useEffect, useState } from "react";
import ProductList from "./Components/ProductList";
import axios from "axios";
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";

const ProductCustomerUI = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [PriceRangeDropdown, setPriceRangeDropdown] = useState(false);

  const Category = [
    "Aluminium Bars",
    "Aluminium Accessories",
    "Boards",
    "House Accessories",
    "Pentry Accessories",
    "Locks",
    "Other",
    "in Stock",
  ];

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

  useEffect(() => {
    console.log(products);
    filterProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchTerm, selectedCategories, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const isOnlyInStock = selectedCategories.filter(
      (category) => category === "in Stock"
    );


    if (isOnlyInStock.length !== selectedCategories.length && selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedCategories.includes("in Stock")) {
      filtered = filtered.filter((product) => {
        return product.Stock > 0;
      });
    }

    filtered = filtered.filter((product) => {
      const price = product.price;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filtered);
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const togglePriceRangeDropdown = () => {
    setPriceRangeDropdown(!PriceRangeDropdown);
    setMinPrice(0);
    setMaxPrice(20000);
  };

  return (
    <><div className="h-full w-screen" style={{
      backgroundImage: `url('/img/products.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
    <CustomerHeader title="Product List"/>
      <main className="mx-auto pb-24  sm:pb-24 lg:max-w-[80rem] "  >
        
        <div className="lg:gap-8 lg:grid lg:grid-cols-3 xl:grid-cols-5 xl:pt-12">
          <aside>
            <div className="hidden lg:block">
              <form>
                <div className="pb-2 pt-3">
                  <div className="relative">
                    <div className="pl-4 flex items-center absolute left-0 bottom-0 top-0 pointer-events-none">
                      <svg
                        className="text-slate-400 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-search"
                      onChange={handleSearch}
                      className="text-black bg-slate-700 border-slate-500 text-slate-900 text-sm leading-5 pl-10 p-2 bg-slate-50 border-slate-300 border rounded-lg w-full block"
                      placeholder="Search keywords..."
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <fieldset>
                    <legend className="text-gray-900 font-medium text-sm leading-5 block">
                      Category
                    </legend>
                    <div className="pt-3">
                      {Category.map((item, index) => {
                        let count;
                        if (item === "in Stock") {
                          count = products.filter((product) => {
                            return product.Stock > 0;
                          }).length;
                        } else {
                          count = products.filter((product) => {
                            return product.category === item;
                          }).length;
                        }
                        return (
                          <div key={index} className="flex items-center pt-3">
                            <input
                              id={`category-${index}`}
                              name="category[]"
                              type="checkbox"
                              className="text-indigo-600 border-gray-300 rounded-sm w-4 h-4"
                              value={item}
                              onChange={handleCategoryChange}
                            />
                            <label
                              htmlFor={`category-${index}`}
                              class="text-gray-600 text-sm leading-5 ml-3"
                            >
                              {item + " "}({count})
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                <div className="pt-10">
                  <div>
                    <button
                      type="button"
                      onClick={togglePriceRangeDropdown}
                      className="flex justify-between items-center w-full text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <label className="text-gray-900 font-medium text-sm leading-5 block mb-2 text-left rtl:text-right whitespace-nowrap">
                        Price Range
                      </label>
                      <svg
                        className={`w-4 h-3 pb-1${
                          PriceRangeDropdown ? "transform rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    {PriceRangeDropdown && (
                      <div className="gap-3 grid grid-cols-2 pt-2">
                        <div>
                          <input
                            id="min-price"
                            type="range"
                            min="0"
                            max="20000"
                            value={minPrice}
                            step="1"
                            className="bg-gray-200 rounded appearance-none cursor-pointer w-full h-2"
                            onChange={handleMinPriceChange}
                          />
                        </div>

                        <div>
                          <input
                            id="max-price"
                            type="range"
                            min="0"
                            max="20000"
                            value={maxPrice}
                            step="1"
                            className="bg-gray-200 rounded appearance-none cursor-pointer w-full h-2"
                            onChange={handleMaxPriceChange}
                          />
                        </div>

                        <div className="md:col-span-2 justify-between items-center flex">
                          <div className="w-full">
                            <label
                              for="min-price-input"
                              className="text-gray-900 font-medium text-sm leading-5 block mb-2"
                            >
                              From
                            </label>
                            <input
                              type="number"
                              id="min-price-input"
                              value={minPrice}
                              min="0"
                              max="20000"
                              className="text-white bg-slate-600 border-slate-400 p-2 border rounded w-full block md:text-xs md:leading-4 md:text-gray-900 md:bg-gray-50 md:border-gray-300"
                              placeholder=""
                              onChange={handleMinPriceChange}
                            />
                          </div>

                          <div className="w-full">
                            <label
                              for="max-price-input"
                              className="text-gray-900 font-medium text-sm leading-5 block mb-2"
                            >
                              To
                            </label>
                            <input
                              type="number"
                              id="max-price-input"
                              value={maxPrice}
                              min="0"
                              max="20000"
                              className="text-white bg-slate-600 border-slate-400 p-2 border rounded w-full block md:text-xs md:leading-4 md:text-gray-900 md:bg-gray-50 md:border-gray-300"
                              placeholder=""
                              onChange={handleMaxPriceChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </aside>
          <div className="mt-6 lg:mt-0 lg:col-span-4 ">
            <div className="opacity-75 border border-gray-300 border-dashed rounded-lg overflow-hidden h-96 lg:h-full relative">
              <ProductList products={FilteredProducts} loading={loading} />
            </div>
          </div>
        </div>
      </main></div>
    </>
  );
};

export default ProductCustomerUI;
