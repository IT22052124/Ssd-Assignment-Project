import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../Shared/Components/context/authcontext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const auth = useContext(AuthContext);
  const shippingFee = 500;
  const total = 0;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/${auth.cusId}`);
        const fetchedOrders = response.data;
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [auth.cusId]);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start items-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order History</h1>
      </div>
      {orders.map((order) => {
        let subtotal = 0; // Initialize subtotal for each order
        return (
          <div key={order._id} className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-start items-start flex-col">
                    <h2 className="text-2xl dark:text-white font-semibold leading-6 text-gray-800">Order #{order.orderId}</h2>
                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  {order.CartItems.map((item) => {
                    subtotal += item.quantity * item.productId.price; // Update subtotal for each item
                    return (
                      <div key={item.productId._id} className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col md:flex-row justify-start items-start w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                          <div className="w-full md:w-40">
                            <img className="w-full" src={`http://localhost:5000/${item.productId.image}`} alt={item.productId.name} />
                          </div>
                          <div className="border-b border-gray-200 flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-2">
                              <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">{item.productId.name}</h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span>{item.productId.style}</p>
                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span>{item.productId.size}</p>
                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span>{item.productId.color}</p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base dark:text-white xl:text-lg leading-6">Rs.{item.productId.price}</p>
                              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.quantity}</p>
                              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item.quantity * item.productId.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-center items-stretch w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        Rs.{subtotal}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Discount</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">0%</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.{shippingFee}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      Rs.{subtotal + shippingFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;

