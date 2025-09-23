import { createContext, useEffect, useState } from "react";

export const EmployeeAuthContext = createContext({
  isLoggedInEmployee: false,
  isCashierLoggedIn: false,
  employeePersonId: null,
  avatarUrl: null,
  cashierlogin: () => {},
  login: () => {},
  logout: () => {},
});

export const EmployeeAuthProvider = ({ children }) => {
  const [isLoggedInEmployee, setisLoggedInEmployee] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedInEmployee");
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem("isCashierLoggedIn");
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [employeePersonId, setEmployeePersonId] = useState(() => {
    const savedEmployeePersonId = localStorage.getItem("employeePersonId");
    return savedEmployeePersonId ? JSON.parse(savedEmployeePersonId) : null;
  });

  const [avatarUrl, setAvatarUrl] = useState(() => {
    const saved = localStorage.getItem("employeeAvatarUrl");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem(
      "isLoggedInEmployee",
      JSON.stringify(isLoggedInEmployee)
    );
    localStorage.setItem(
      "isCashierLoggedIn",
      JSON.stringify(isCashierLoggedIn)
    );
    localStorage.setItem("employeePersonId", JSON.stringify(employeePersonId));
  }, [isLoggedInEmployee, isCashierLoggedIn, employeePersonId]);

  useEffect(() => {
    localStorage.setItem("employeeAvatarUrl", JSON.stringify(avatarUrl));
  }, [avatarUrl]);

  const login = (employeePersonId, avatar) => {
    console.log("Setting employeePersonId:", employeePersonId);
    console.log(employeePersonId); // Add this line for debugging
    setisLoggedInEmployee(true);
    setEmployeePersonId(employeePersonId);
    if (avatar) setAvatarUrl(avatar);
  };

  const cashierlogin = (employeePersonId, avatar) => {
    console.log("Setting employeePersonId:", employeePersonId);
    console.log(employeePersonId); // Add this line for debugging
    setIsCashierLoggedIn(true);
    setEmployeePersonId(employeePersonId);
    if (avatar) setAvatarUrl(avatar);
  };

  const logout = () => {
    setIsCashierLoggedIn(false);
    setisLoggedInEmployee(false);
    setEmployeePersonId(null);
    setAvatarUrl(null);
  };

  return (
    <EmployeeAuthContext.Provider
      value={{
        isLoggedInEmployee,
        isCashierLoggedIn,
        employeePersonId,
        avatarUrl,
        cashierlogin,
        login,
        logout,
      }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export default EmployeeAuthProvider;
