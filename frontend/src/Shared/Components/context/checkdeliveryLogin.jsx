import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { DeliveryAuthContext } from "../context/DeliveryAuthContext";

const CheckDeliveryLogin = ({ children }) => {
  const { isLoggedIn } = useContext(DeliveryAuthContext);
  return <div>{isLoggedIn ? <Navigate to="/products" replace /> : children}</div>;
};

export default CheckDeliveryLogin;
