// components/Cart.js
import React, { useState, useEffect,useContext ,useRef} from "react";
import axios from "axios";
import ModalComponent from "../../Payment/Pages/Components/PaymentOption";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Shared/Components/FormElements/Button";
import DeleteConfirmBox from "../../Shared/Components/UiElements/DeleteConfirmBox"
import "../../Cart/Pages/Components/Cart.css";
import Toast from "../../Shared/Components/UiElements/Toast/Toast";
import { AuthContext } from "../../Shared/Components/context/authcontext";

const deliveryPrices = {
  "Ampara": 500,
  "Anuradhapura": 600,
  "Badulla": 450,
  "Batticaloa": 550,
  "Colombo": 400,
  "Galle": 550,
  "Gampaha": 450,
  "Hambantota": 650,
  "Jaffna": 700,
  "Kalutara": 500,
  "Kandy": 500,
  "Kegalle": 550,
  "Kilinochchi": 750,
  "Kurunegala": 550,
  "Mannar": 700,
  "Matale": 500,
  "Matara": 600,
  "Monaragala": 650,
  "Mullaitivu": 750,
  "Nuwara Eliya": 550,
  "Polonnaruwa": 550,
  "Puttalam": 600,
  "Ratnapura": 600,
  "Trincomalee": 600,
  "Vavuniya": 700
};


const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteCart,setdeleteCart] = useState(1);
  let subtotal = 0;
  const shippingFee = useRef(0);
  const navigate = useNavigate();


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const auth = useContext(AuthContext);
  console.log(auth.cusId)

  useEffect(() => {
    // Fetch cart items when component mounts
    axios
      .get(`http://localhost:5000/cart/list/${auth.cusId}`)
      .then((response) => {
        // Adjust quantity based on available stock
        const updatedCart = response.data.map((item) => {
          // If stock is less than or equal to 0, set quantity to 0
          if (item.product.Stock <= 0) {
            handleQuantityUpdate(item._id, 0, item.product.Stock);
            item.quantity = 0;
          } else {
            // If quantity exceeds available stock, set quantity to available stock
            if (item.quantity > item.product.Stock) {
              handleQuantityUpdate(item._id, item.product.Stock, item.product.stock);
              item.quantity = item.product.Stock;
            }
          }
          return item;
        });
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, [deleteCart]);
  console.log(cart)


  const handleQuantityUpdate = (itemId, newQuantity, availableStock) => {
    if (newQuantity > availableStock) {
      // Notify user that the requested quantity exceeds available stock
      Toast("Requested quantity exceeds available stock", "error");
      newQuantity = 0;
      return;
    } 

    axios
      .put(`http://localhost:5000/cart/cart/${itemId}`, { quantity: newQuantity })
      .then((response) => {
        setdeleteCart(deleteCart + 1);
        Toast("Quantity updated !!", "success");
      })
      .catch((error) => {
        console.error("Error updating quantity", error);
      });
  };

  cart.map((item) => (
    subtotal = subtotal + (item.quantity * item.product.price)
  ))

    // Fetch user's district data from the database and calculate shipping fee
   useEffect(() => {
     axios
       .get(`http://localhost:5000/customer/${auth.cusId}`)
       .then((response) => {
         const userDistrict = response.data.city; // Assuming the district data is fetched correctly
         // Define shipping fee based on user's district
         console.log(userDistrict);
         
         shippingFee.current = deliveryPrices[userDistrict]; // Fetch the shipping fee from the deliveryPrices object
       })
       .catch((error) => {
         console.error("Error fetching user district", error);
       });
   }, [auth.cusId]);
   
   const handleItemSelect = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

   const handleCheckout = () => {
    if (selectedItems.length > 0) {
      const total = subtotal + shippingFee.current;
      navigate(`/confirm-order?subtotal=${subtotal}&shippingFee=${shippingFee.current}&total=${total}&selectedItems=${selectedItems.join(",")}`); // Pass selected item IDs as a comma-separated string
    } else {
      // Prompt user to select at least one item
      alert("Please select at least one item before proceeding to checkout.");
    }
  };

   

  const handleOfflineCheckout = () => {
    // Calculate total including subtotal and shipping fee
    const total = subtotal + shippingFee.current;
  
    // Navigate to card page with subtotal and shipping fee as query parameters
    navigate(`/offpay?subtotal=${subtotal}&shippingFee=${shippingFee.current}&total=${total}`);
  };

  return (
    <div class="bg-gray-100 h-screen py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div class="flex flex-col md:flex-row gap-1">
          <div class="md:min-w-3/4">
            <div class="bg-white rounded-lg shadow-md p-4 mb-3">
              <table class="w-max">
                <thead>
                  <tr>
                    <th class="text-left font-semibold px-6 py-4  bg-orange-600 text-white">Select</th>
                    <th class="text-left font-semibold px-6 py-4 bg-orange-600 text-white">Product</th>
                    <th class="text-left font-semibold px-6 py-4 bg-orange-600 text-white">Price</th>
                    <th class="text-left font-semibold px-6 py-4 bg-orange-600 text-white">Quantity</th>
                    <th class="text-left font-semibold px-6 py-4 bg-orange-600 text-white ">Total</th>
                    <th class="text-left font-semibold px-6 py-4 bg-orange-600 text-white">Delete</th>
                  </tr>
                </thead>
                
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                       <td class="px-6 py-4">
                      <input
                          type="checkbox"
                          onChange={() => handleItemSelect(item._id)}
                          checked={selectedItems.includes(item._id)}
                        /></td>
                      <td class="py-4">
                        <div class="flex items-center">
                        <img
                    class="w-full rounded-lg sm:w-40 object-cover"
                    src={`http://localhost:5000/${item.product.image}`}
                    alt="profile_pic"
                  />
                          <span class="font-semibold pl-5">{item.product.name}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4">${item.product.price}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <button class="border rounded-md py-2 px-4 mr-2" disabled={item.quantity===0|| item.product.Stock===0} onClick={() => handleQuantityUpdate(item._id,item.quantity - 1,item.product.Stock)} >{(console.log(item.product.Stock))}
                            -
                          </button>
                          <span class="text-center w-8">{item.quantity}</span>
                          <button class="border rounded-md py-2 px-4 ml-2" disabled={item.quantity===0|| item.product.Stock===0} onClick={() => handleQuantityUpdate(item._id,item.quantity + 1,item.product.Stock)} >
                            +
                          </button>
                        </div>
                      </td>
                      <td class="px-6 py-4">${item.quantity * item.product.price}</td>
                      
                      <td class="px-6 py-4"><button class="border rounded-md py-2 px-4 ml-2" ><DeleteConfirmBox deleteLink={`http://localhost:5000/cart/${item._id}`} dlt={deleteCart} dltset={setdeleteCart}/></button></td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="md:w-1/4" className="summary">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-semibold mb-4">Summary</h2>
              <div class="flex justify-between mb-2">
                <span>Subtotal</span>
                <span class="pl-4">Rs.{subtotal}/=</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Taxes</span>
                <span>Rs.0.00/=</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Rs.{shippingFee.current}/=</span>
              </div>
              <hr class="my-2" />
              <div class="flex justify-between mb-2">
                <span class="font-semibold">Total</span>
                <span class="font-semibold">Rs.{subtotal+shippingFee.current}/=</span>
              </div>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
