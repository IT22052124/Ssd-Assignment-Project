import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./CreditTable.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DeleteConfirmBox from "../../../Shared/Components/UiElements/DeleteConfirmBox";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

function CardList() {
  const [cards, setCards] = useState([]);
  const [deleteCart, setdeleteCart] = useState(1);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const subtotal = queryParams.get("subtotal");
  const shippingFee = queryParams.get("shippingFee");
  const total = queryParams.get("total");
  const selectedItemsString = queryParams.get("selectedItems");
  const id = selectedItemsString ? selectedItemsString.split(",") : [];

  useEffect(() => {

    alert("Click on a card to use it for your payment")
    axios
      .get(`http://localhost:5000/OnPay/onpay/list/${auth.cusId}`)
      
      .then((response) => {
        setCards(response.data);
       
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, [auth.cusId]);

  const handleUseCard = async (cardId) => {
    try {
      // Fetch the cart items based on the selected item IDs
      const cartResponse = await axios.get(`http://localhost:5000/cart/carts`, {
        params: { id }
      });
      const cartItems = cartResponse.data;
  
      // Create a new order and immediately use the response to submit the payment
      const orderResponse = await axios.post("http://localhost:5000/order/new", {
        uid: auth.cusId,
        cartitem: cartItems
      });
      // Extract the order ID from the response
      
  
      // Log the order response to debug
     
  
      // Submit the payment using the captured order ID
      const paymentResponse = await axios.post("http://localhost:5000/payment/submit", {
        subtotal: subtotal,
        shippingFee: shippingFee,
        total: total,
        card_id: cardId,
        user_id: auth.cusId,
        method: "Online"
      });
  
      // Log the payment response to debug
      console.log("Payment response:", paymentResponse.data);
  
      // Delete each cart item after the order is placed
      for (const item of cartItems) {
        await axios.delete(`http://localhost:5000/cart/${item._id}`);
        console.log("Cart item deleted successfully:", item._id);
      }
  
      Toast("Payment Completed!!", "success");
      navigate('/Products');
    } catch (error) {
      console.error("Error placing order:", error.message || error);
      // Handle error (e.g., display an error message)
    }
  };
  

  return (
    <div className="custom-cards-container">
       
      {cards.map((card) => (
        <div key={card._id} className="custom-card-container">
          <div className="card-list" onClick={() => handleUseCard(card._id)}>
            <div className="card-inner">
              <div className="front">
                <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map" />
                <div className="row">
                  <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" alt="chip" />
                  {card.category === "Mastercard" && (
                    <svg width="100px" height="100px" viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z" fill="#FF5F00"/>
                    <path d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429" fill="#EB001B"/>
                    <path d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429" fill="#F79E1B"/>
                    </svg>
                  )}
                  {card.category === "VISA" && (
                   <svg width="100px" height="100px" viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M25.7516 27.4332H21.8901L24.3054 13.4325H28.1667L25.7516 27.4332Z" fill="#15195A"/>
                   <path d="M39.7499 13.7748C38.9882 13.4915 37.7802 13.1787 36.2865 13.1787C32.4731 13.1787 29.7878 15.0851 29.7713 17.8106C29.7396 19.8215 31.6939 20.9384 33.1556 21.6089C34.6495 22.2941 35.1574 22.7413 35.1574 23.352C35.1422 24.29 33.9502 24.7223 32.8384 24.7223C31.2967 24.7223 30.4707 24.4994 29.2153 23.9776L28.7069 23.7539L28.1665 26.8967C29.0722 27.2835 30.7408 27.6268 32.4731 27.6419C36.5249 27.6419 39.1627 25.765 39.1939 22.8605C39.2093 21.2667 38.1774 20.0454 35.9526 19.0475C34.602 18.4069 33.7749 17.9749 33.7749 17.3195C33.7908 16.7236 34.4745 16.1133 35.9991 16.1133C37.2544 16.0834 38.1768 16.3663 38.8755 16.6494L39.2247 16.7981L39.7499 13.7748V13.7748V13.7748Z" fill="#15195A"/>
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M46.6618 13.4325H49.6486L52.7639 27.433H49.1885C49.1885 27.433 48.8386 25.8244 48.7278 25.3328H43.7699C43.6266 25.705 42.9595 27.433 42.9595 27.433H38.9078L44.6435 14.5941C45.0409 13.6855 45.7407 13.4325 46.6618 13.4325ZM46.4238 18.556C46.4238 18.556 45.2001 21.6689 44.8821 22.4732H48.0918C47.933 21.7733 47.2017 18.4219 47.2017 18.4219L46.9319 17.2156C46.8182 17.5262 46.6539 17.9533 46.543 18.2414C46.4679 18.4366 46.4173 18.568 46.4238 18.556Z" fill="#15195A"/>
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M5.1589 13.4325H11.3716C12.2138 13.462 12.8971 13.7152 13.1194 14.6094L14.4696 21.0422C14.4697 21.0426 14.4699 21.043 14.47 21.0434L14.8832 22.9796L18.6649 13.4325H22.7481L16.6785 27.4184H12.5951L9.15337 15.253C7.96587 14.6021 6.6106 14.0786 5.09534 13.7154L5.1589 13.4325Z" fill="#15195A"/>
                   </svg>
                  )}
                </div>
                <div className="row card-no">
                  <p>****</p>
                  <p>****</p>
                  <p>****</p>
                  <p>{card.number.slice(-4)}</p>
                </div>
                <div className="row card-holder">
                  <p>CARD HOLDER</p>
                  <p>VALID TILL</p>
                </div>
                <div className="row name">
                  <p>{`${card.firstname} ${card.lastname}`}</p>
                  <p>{card.expiredate}</p>
                </div>
              </div>
              <div className="back">
                <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map" />
                <div className="bar"></div>
                <div className="row card-cvv">
                  <div>
                    <img src="https://i.ibb.co/S6JG8px/pattern.png" alt="pattern" />
                  </div>
                  <p>{card.cvv}</p>
                </div>
                <div className="row card-text">
                </div>
                <div className="row signature">
                  <p>CUSTOMER SIGNATURE</p>
                  {card.category === "Mastercard" && (
                    <svg width="100px" height="100px" viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z" fill="#FF5F00"/>
                    <path d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429" fill="#EB001B"/>
                    <path d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429" fill="#F79E1B"/>
                    </svg>
                  )}
                  {card.category === "VISA" && (
                   <svg width="100px" height="100px" viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M25.7516 27.4332H21.8901L24.3054 13.4325H28.1667L25.7516 27.4332Z" fill="#15195A"/>
                   <path d="M39.7499 13.7748C38.9882 13.4915 37.7802 13.1787 36.2865 13.1787C32.4731 13.1787 29.7878 15.0851 29.7713 17.8106C29.7396 19.8215 31.6939 20.9384 33.1556 21.6089C34.6495 22.2941 35.1574 22.7413 35.1574 23.352C35.1422 24.29 33.9502 24.7223 32.8384 24.7223C31.2967 24.7223 30.4707 24.4994 29.2153 23.9776L28.7069 23.7539L28.1665 26.8967C29.0722 27.2835 30.7408 27.6268 32.4731 27.6419C36.5249 27.6419 39.1627 25.765 39.1939 22.8605C39.2093 21.2667 38.1774 20.0454 35.9526 19.0475C34.602 18.4069 33.7749 17.9749 33.7749 17.3195C33.7908 16.7236 34.4745 16.1133 35.9991 16.1133C37.2544 16.0834 38.1768 16.3663 38.8755 16.6494L39.2247 16.7981L39.7499 13.7748V13.7748V13.7748Z" fill="#15195A"/>
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M46.6618 13.4325H49.6486L52.7639 27.433H49.1885C49.1885 27.433 48.8386 25.8244 48.7278 25.3328H43.7699C43.6266 25.705 42.9595 27.433 42.9595 27.433H38.9078L44.6435 14.5941C45.0409 13.6855 45.7407 13.4325 46.6618 13.4325ZM46.4238 18.556C46.4238 18.556 45.2001 21.6689 44.8821 22.4732H48.0918C47.933 21.7733 47.2017 18.4219 47.2017 18.4219L46.9319 17.2156C46.8182 17.5262 46.6539 17.9533 46.543 18.2414C46.4679 18.4366 46.4173 18.568 46.4238 18.556Z" fill="#15195A"/>
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M5.1589 13.4325H11.3716C12.2138 13.462 12.8971 13.7152 13.1194 14.6094L14.4696 21.0422C14.4697 21.0426 14.4699 21.043 14.47 21.0434L14.8832 22.9796L18.6649 13.4325H22.7481L16.6785 27.4184H12.5951L9.15337 15.253C7.96587 14.6021 6.6106 14.0786 5.09534 13.7154L5.1589 13.4325Z" fill="#15195A"/>
                   </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="custom-card-actions">
            <Link to={`/CC/${card._id}?subtotal=${subtotal}&shippingFee=${shippingFee}&total=${total}&selectedItems=${id.join(",")}`} className="custom-card-button">Update</Link>
            <DeleteConfirmBox 
              deleteLink={`http://localhost:5000/OnPay/${card._id}`}
              dlt={deleteCart}
              dltset={setdeleteCart}

            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardList;
