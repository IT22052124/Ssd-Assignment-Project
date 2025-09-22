import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { EmployeeAuthContext } from "../context/EmployeeAuthContext";

const ProtectedRouteEmployee = () => {
  const { isLoggedInEmployee } = useContext(EmployeeAuthContext);

  return <div>{isLoggedInEmployee ? <Outlet/> : <Navigate to="/loginemployee" replace />}</div>;
};

export default ProtectedRouteEmployee;
