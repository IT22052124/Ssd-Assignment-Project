import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { EmployeeAuthContext } from "../context/EmployeeAuthContext";

const ProtectedRouteCashier = () => {
  const { isCashierLoggedIn } = useContext(EmployeeAuthContext);

  return <div>{isCashierLoggedIn ? <Outlet/> : <Navigate to="/loginemployee" replace />}</div>;
};

export default ProtectedRouteCashier;
