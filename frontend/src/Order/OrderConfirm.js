// ConfirmOrderPage.js
import React, { useEffect, useState,useRef,useContext } from "react";
import { useLocation,useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Shared/Components/context/authcontext";

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

const ConfirmOrderPage = ({}) => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
 let subtotal=0;
  const shippingFee = useRef(0);
  const selectedItemsString = queryParams.get("selectedItems");
  const id = selectedItemsString ? selectedItemsString.split(",") : [];
  const [selectedItemDetails, setSelectedItemDetails] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch details of selected items when the component mounts
    const fetchSelectedItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/carts`, {
          params: { id }
        });
        setSelectedItemDetails(response.data);
        
      } catch (error) {
        console.error("Error fetching selected item details:", error);
      }
    };fetchSelectedItemDetails();
}, [id]);

const auth = useContext(AuthContext);
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

const getCurrentDateTime = () => {
    // Create a new Date object
    const date = new Date();
  
    // Options for formatting the date and time
    const options = {
      timeZone: 'Asia/Colombo', // Set the timezone to Sri Lanka
      day: 'numeric', // Display the day of the month
      month: 'long', // Display the full name of the month
      year: 'numeric', // Display the full year
      hour: 'numeric', // Display the hour (12-hour clock)
      minute: 'numeric', // Display the minute
      hour12: true, // Use 12-hour clock format
    };
  
    
    // Get the formatted date and time string
    const formattedDateTime = date.toLocaleString('en-US', options);
  
    return formattedDateTime;
  };

  selectedItemDetails.map((item) => (
    subtotal = subtotal + (item.quantity * item.product.price)
  ))
  useEffect(() => {
    // Fetch details of selected items when the component mounts
    const fetchSelectedUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customer/${auth.cusId}`, {
          params: { id }
        });
        setSelectedUserDetails(response.data);
        
      } catch (error) {
        console.error("Error fetching selected item details:", error);
      }
    };fetchSelectedUserDetails();
}, [auth.cusId]);

const handleCardCheckout = () => {
  // Calculate total including subtotal and shipping fee
  const total = subtotal + shippingFee.current;

  // Navigate to card page with subtotal and shipping fee as query parameters
  navigate(`/CC?subtotal=${subtotal}&shippingFee=${shippingFee.current}&total=${total}&selectedItems=${selectedItemsString}`);
};



  // Example usage
  const formattedDateTime = getCurrentDateTime();

  return (
    
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order Confirmation</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{formattedDateTime}</p>
      </div>

      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Order</p>
            <div>
            {selectedItemDetails.map(item => (
                <React.Fragment key={item.id}>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img className="w-full hidden md:block" src={`http://localhost:5000/${item.product.image}`} alt="dress" />
                    {console.log(item.product)}
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.product.name}</h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Category: </span>{item.product.category}</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Weight: </span> {item.product.weight}</p>
                        
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base dark:text-white xl:text-lg leading-6">Rs.{item.product.price}/= </p>
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.quantity}</p>
                      <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item.product.price * item.quantity}/=</p>
                    </div>
                  </div>
                  </div>
                  </React.Fragment>
                ))}
            
            
            </div>
          </div>
        </div>
      </div>
      <div>
      <div>
      
      <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div class="flex justify-between w-full">
              <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
              <p class="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.{subtotal}/=</p>
            </div>
            
            <div class="flex justify-between items-center w-full">
              <p class="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p class="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.{shippingFee.current}/=</p>
            </div>
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs.{subtotal+shippingFee.current}/=</p>
          </div>
        </div>
        <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Payment</h3>
          <div class="flex justify-between items-start w-full">
            <div class="flex justify-center items-center space-x-4">
              <div class="w-8 h-8">
                <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div class="flex flex-col justify-start items-center">
                <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span class="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs.{shippingFee.current}/=</p>
          </div>
          <div class="w-full flex justify-center items-center">
            <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white" onClick={handleCardCheckout}>Pay Now</button>
          </div>
        </div>
        
      </div>
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div>
      {selectedUserDetails && (
                
      <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div class="flex flex-col justify-start items-start flex-shrink-0">
          <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src={`http://localhost:5000/${selectedUserDetails.image}`} alt="avatar"  height="150" width="150"/>
            <div class="flex justify-start items-start flex-col space-y-2">
              <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800"></p>
              
            </div>
          </div>

          <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="cursor-pointer text-sm leading-5 ">{selectedUserDetails.mail}</p>
          </div>
        </div>
        <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{selectedUserDetails.address}</p>
            </div>
            <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{selectedUserDetails.address}</p>
            </div>
          </div>
          <div class="flex w-full justify-center items-center md:justify-start md:items-start">
            <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" onClick={() => { window.location.href = `http://localhost:3000/Customer/update/${auth.cusId}`; }}>Edit Details</button>
            
          </div>
          
        </div>
        
      </div>
      
    )}
      </div>
     
      </div>
      
  </div>
  
</div>


  
);};

export default ConfirmOrderPage;