import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const CheckLogin = ({children}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return <div>{isLoggedIn ? <Navigate to="/products" replace /> : children}</div>;
};

export default CheckLogin;
