import React, { useState, useRef } from "react";
import "./SupplierTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import DeleteConfirmBox from "../../../Shared/Components/UiElements/DeleteConfirmBox";
import UpdatePrice from "./UpdatePrice";
import { MdDeleteOutline } from "react-icons/md";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { useReactToPrint } from 'react-to-print';
import PrintDetails from "./PrintDetails";

const SupplierProductTable = (props) => {
  const [cart, setCart] = useState([]);
  const [loading , setLoading] = useState(false)
  const [isclick,setisclick] = useState(false)
  const [amount, setAmount] =useState(0);

  const supplier= props.id;
  let total =0;

  cart.map((item, index) => (total=total+(item.quantity*item.price)))

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/supplierproduct/purchase", {
        cart: cart,
        total: total,
        amount: amount,
        supplier: supplier,
      })
      .then((res) => {
        setLoading(false);
        window.location.reload();
        Toast("Purchesed Successfully!! 🔥","success");
        
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Purchase details",
    onAfterPrint: () => alert("Purchase Detail is successfully generated !"),
  });

  const Headings = [
    "#",
    "Product id",
    "Product name",
    "Unit Price",
    "Action",
    "Cart"
  ];

  const addToCart = (supplierProduct, product, productName, productID, price) => {
    
      setCart([...cart, {supplierProduct, supplier, product, productName, productID, price, quantity: 1 }]);
    
  };

  const check = (product) =>{
    const existingProduct = cart.find(item => item.product === product);
    if(existingProduct)
      return false
    else
      return true
  }


  const updateQuantity = (product, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.product === product ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  
  const removeFromCart = (product) => {
    const index = cart.findIndex(item => item.product === product);
    
    if (index !== -1) {
        const newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
        setCart(newCart);
    }
};

  const togglemodelpopup = () => {
    setisclick(!isclick)
  }

  return (
    <>
    <PrintDetails details={cart}  componentRef={componentRef} totalAmount={total}  paid = {amount}/>
      <div>
        <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.supplierProducts.map((item, index) => {
              return (
                <TableRow key={item._id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.product.ID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.product.name}
                  </th>
                  <td className="px-6 py-4" style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>Rs.{item.unitPrice}</span>
                    <UpdatePrice id={item._id} />
                  </td>
                  <td className="px-3 py-4">
                    <DeleteConfirmBox deleteLink={`http://localhost:5000/supplierproduct/${item._id}`} dlt={props.deletesp} dltset={props.setdeletesp}/>
                  </td>
                  <td className="px-6 py-4">
                    {check(item.product._id)?
                    (<button onClick={() => addToCart(item._id, item.product._id, item.product.name, item.product.ID, item.unitPrice )} className="px-2 py-1 bg-green-500 text-white">Add</button>) : 
                    (<button onClick={() => removeFromCart(item.product._id)} className="px-2 py-1 bg-red-500 text-white">Remove</button>)}
                  </td>
                </TableRow>
              );
            })
          )}
        </Table>

        
        <div className="text-center pt-4">
          {cart.length !== 0 ? (<button
            type="button"
            onClick={togglemodelpopup}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Purchase
          </button>) : <></>}
        </div>
      </div>

      {isclick &&
        <div>
          <div
            id="deleteModal"
            tabindex="-1"
            className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            aria-modal="true"
            role="dialog"
          >
              <div class="relative p-4 w-full max-w-[720px] h-full md:h-auto">
                <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <button
                    onClick={togglemodelpopup}
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
                  {loading && (
                      <center>
                        <Loader />
                      </center>
                    ) }

                  <div className="flex flex-row ...">
                    <div>
                      <form className="max-w-sm mx-auto pt-8">
                        <div className="flex items-center">
                            <table className="w-full">
                                <thead className="text-xs text-gray-50 uppercase bg-red-400 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>
                                        <th className="px-4 py-2 font-bold">Product Name</th>
                                        <th className="px-4 py-2 font-bold">Quantity</th>
                                        <th className="px-4 py-2 font-bold">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{item.productName}</td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    min={1}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.product,
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="border rounded px-1 py-1 w-16"
                                                />
                                            </td>
                                            <td>{(item.quantity*item.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                      </form>
                    </div>
                    <div className="max-w-sm mx-auto pt-20 pl-8">
                      <p className="font-semibold">Total : {total}</p>
                      <p className="font-semibold">Amount : <input
                                                                onChange={(event) => {
                                                                    setAmount(event.target.value);
                                                                }}
                                                                type="number"
                                                                min={0}
                                                                defaultValue={0}
                                                                className="border rounded px-1 py-1 w-20 border-gray-700"
                                                            /></p>
                    </div>
                  </div>

                  <div class="flex justify-center items-center space-x-4 pt-9">
                  <button
                    onClick={submitHandler}
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    disabled = {loading}
                  >
                      Buy Products
                  </button>
                    <div className="flex justify-end flex-grow">
                      <button
                        onClick={handleprint}
                        className="flex flex-row-reverse items-center space-x-2"
                      >
                        <span>Print</span>
                        <svg
                          class="h-8 w-8 text-black-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
          </div>
        </div>
          
          }
    </>
  );
};

export default SupplierProductTable;
