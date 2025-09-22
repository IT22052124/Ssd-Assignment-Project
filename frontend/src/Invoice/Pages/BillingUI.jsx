import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-tailwindcss-select";
import Toast from "../../Shared/Components/UiElements/Toast/Toast";
import { useReactToPrint } from "react-to-print";
import PrintQuotation from "./component/PrintQuotation";
import Loader3 from "../../Shared/Components/UiElements/loader3";
import { Link } from "react-router-dom";
import { EmployeeAuthContext } from "../../Shared/Components/context/EmployeeAuthContext";

const BillingUI = () => {
  const Auth = useContext(EmployeeAuthContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [openPaymentBox, setOpenPaymentBox] = useState(false);
  const [val, setVal] = useState(null);
  const [checkbox, setCheckBox] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState(1);

  const addItem = (item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].total =
        updatedItems[existingItemIndex].quantity * item.price;

      setSelectedItems(updatedItems);
    } else {
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, total: item.price },
      ]);
      setTotalItems((prevTotalItems) => prevTotalItems + 1);
    }

    setTotalAmount(
      (prevTotalAmount) => parseFloat(prevTotalAmount) + parseFloat(item.price)
    );
  };
  const currentDateTime = new Date().toLocaleString();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Product report ${currentDateTime}`,
    onAfterPrint: () =>
      Toast("Product Report is successfully genrated !", "success"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [temp]);

  const handleChange = (value) => {
    setVal(value);
    const selectedProduct = products.find(
      (product) => product._id === value.value
    );

    if (selectedProduct && selectedProduct.Stock > 0) {
      addItem(selectedProduct);
    } else {
      Toast("This product is out of stock", "error");
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const newSelectedItems = [...selectedItems];
    const maxStock = newSelectedItems[index].Stock;

    if (!quantity || quantity === "") {
      quantity = "";
    }

    if (quantity <= maxStock) {
      newSelectedItems[index].quantity = quantity;
      newSelectedItems[index].total =
        parseFloat(newSelectedItems[index].price) * parseInt(quantity);

      setSelectedItems(newSelectedItems);

      const newTotalAmount = newSelectedItems.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0
      );
      setTotalAmount(newTotalAmount);
    } else {
      Toast(`Quantity cannot exceed stock of ${maxStock}`, "error");
    }
  };

  const handleEmptyQuantity = (index) => {
    const newSelectedItems = [...selectedItems];

    if (
      !newSelectedItems[index].quantity ||
      newSelectedItems[index].quantity === ""
    ) {
      newSelectedItems[index].quantity = 1;
      newSelectedItems[index].total =
        parseFloat(newSelectedItems[index].price) * parseInt(1);
      setSelectedItems(newSelectedItems);

      const newTotalAmount = newSelectedItems.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0
      );
      setTotalAmount(newTotalAmount);
    }
  };

  const handleDelete = (index) => {
    const itemToRemove = selectedItems[index];
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);

    setSelectedItems(newSelectedItems);
    setTotalItems((prevTotalItems) => prevTotalItems - 1);
    setTotalAmount(
      (prevTotalAmount) =>
        parseFloat(prevTotalAmount) - parseFloat(itemToRemove.total)
    );
  };

  const handlesubmit = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/Invoice/new/", {
        cartitem: selectedItems,
      })
      .then((res) => {
        console.log(res.data);
        Toast("Successfully Registered!", "success");
        setSelectedItems([]);
        setOpenPaymentBox(!openPaymentBox);
        handlePrint();
        setTotalItems(0);
        setTotalAmount(0);
        setPaidAmount(0);
        setBalance(0);
        setTemp(temp + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  };
  const handlePaidAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setPaidAmount(e.target.value);
    setBalance(amount - totalAmount);
  };

  const togglePaymentBox = () => {
    if (paidAmount < totalAmount) {
      Toast(
        "Paid amount must be equal to or greater than the total amount",
        "error"
      );
      return;
    } else {
      setOpenPaymentBox(!openPaymentBox);
    }
  };

  return (
    <>
      <Link to="/loginemployee">
        <button
          onClick={() => {
            Auth.logout();
            Toast("Log out Successfully", "success");
          }}
          class="fixed top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Log Out
        </button>
      </Link>
      <PrintQuotation
        details={selectedItems}
        componentRef={componentRef}
        totalAmount={totalAmount}
        totalItems={totalItems}
        paidAmount={paidAmount}
        balance={balance}
        checkbox={checkbox}
      />
      <div className="bg-gray-200 h-screen" style={{
            backgroundImage: `url('/img/Billing.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <div
          className="container mx-auto  p-4 h-full  "
          
        >
          <div className="grid grid-cols-2 mt-20 gap-4 p-5 bg-white shadow-lg">
            <div>
              <h2 className="text-lg font-semibold mb-4">Add Billing Items</h2>
              <div className="relative  mb-4">
                <Select
                  isSearchable
                  value={val}
                  primaryColor={"red"}
                  onChange={handleChange}
                  options={products.map((product) => ({
                    value: product._id,
                    label: `${product.ID} ${product.name} Price: Rs.${product.price} Stock: ${product.Stock}`,
                  }))}
                />
              </div>
              <table className="w-full border-collapse border  border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2"></th>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white p-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="border border-gray-300 p-2">{item.ID}</td>
                      <td className="border border-gray-300 p-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          className="w-full border border-gray-300 p-2"
                          value={item.quantity}
                          min="1"
                          max={item.Stock}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                          onBlur={() => handleEmptyQuantity(index)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        Rs.{item.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        Rs.{item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between">
              <div className="relative flex m-16">
                <input
                  type="checkbox"
                  onChange={() => {
                    setCheckBox(!checkbox);
                  }}
                  id="choose-me"
                  className="absolute top-[calc(50%-theme(spacing.2))] peer w-4 h-4 left-6 accent-purple-500 rounded-full"
                />

                <label
                  htmlFor="choose-me"
                  className="p-8 font-bold  accent-purple-500 transition-colors duration-200 ease-in-out border-2 rounded select-none pl-14 peer-checked:text-fuchsia-600 peer-checked:border-fuchsia-600"
                >
                  Quotation
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Invoice Summary</h2>
                <div className="border p-4 rounded mb-4">
                  <p>Total Items: {totalItems}</p>
                  <p>Total Amount: Rs. {totalAmount.toFixed(2)}</p>
                  <div className="mb-4">
                    <label htmlFor="paidAmount" className="block mb-2">
                      Paid Amount:
                    </label>
                    <input
                      type="number"
                      id="paidAmount"
                      className="w-full border border-gray-300 p-2"
                      value={paidAmount}
                      onChange={handlePaidAmountChange}
                    />
                  </div>
                  <p>Balance: Rs. {balance.toFixed(2)}</p>
                </div>
              </div>
              {checkbox ? (
                <button
                  onClick={handlePrint}
                  className="bg-red-300 text-white p-2 rounded mt-4"
                >
                  Print Quotation
                </button>
              ) : (
                <button
                  onClick={togglePaymentBox}
                  className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {openPaymentBox && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              {loading ? (
                <>
                  <Loader3 />
                </>
              ) : (
                <>
                  <div className="md:flex items-center">
                    <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                      <i className="bx bx-error text-3xl">&#9888;</i>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                      <p className="font-bold">Warning!</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Are you sure? Do you want to proceed?
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                    <button
                      onClick={handlesubmit}
                      className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-orange-600 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setOpenPaymentBox(!openPaymentBox);
                      }}
                      className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingUI;
