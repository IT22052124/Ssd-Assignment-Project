import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const ProtectedRouteCustomer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return <div>{isLoggedIn ? <Outlet/> : <Navigate to="/" replace />}</div>;
};

export default ProtectedRouteCustomer;
