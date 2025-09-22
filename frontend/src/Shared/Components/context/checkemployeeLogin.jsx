import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { EmployeeAuthContext } from "../context/EmployeeAuthContext";

const CheckEmployeeLogin = ({ children }) => {
  const { isLoggedIn } = useContext(EmployeeAuthContext);
  return <div>{isLoggedIn ? <Navigate to="/Dashboard" replace /> : children}</div>;
};

export default CheckEmployeeLogin;
