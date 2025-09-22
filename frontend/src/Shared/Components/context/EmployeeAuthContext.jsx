import { createContext, useEffect, useState } from 'react';

export const EmployeeAuthContext = createContext({
  isLoggedInEmployee: false,
  isCashierLoggedIn: false,
  employeePersonId: null,
  cashierlogin:()=>{},
  login: () => {},
  logout: () => {}
});

export const EmployeeAuthProvider = ({ children }) => {
  const [isLoggedInEmployee, setisLoggedInEmployee] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedInEmployee');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isCashierLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [employeePersonId, setEmployeePersonId] = useState(() => {
    const savedEmployeePersonId = localStorage.getItem('employeePersonId');
    return savedEmployeePersonId ? JSON.parse(savedEmployeePersonId) : null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedInEmployee', JSON.stringify(isLoggedInEmployee));
    localStorage.setItem('isCashierLoggedIn', JSON.stringify(isCashierLoggedIn));
    localStorage.setItem('employeePersonId', JSON.stringify(employeePersonId));
  }, [isLoggedInEmployee,isCashierLoggedIn, employeePersonId]);//

  const login = (employeePersonId) => {
    console.log('Setting employeePersonId:', employeePersonId);
    console.log(employeePersonId) // Add this line for debugging
    setisLoggedInEmployee(true);
    setEmployeePersonId(employeePersonId);
  };

  const cashierlogin = (employeePersonId) => {
    console.log('Setting employeePersonId:', employeePersonId);
    console.log(employeePersonId) // Add this line for debugging
    setIsCashierLoggedIn(true);
    setEmployeePersonId(employeePersonId);
  };

  const logout = () => {
    setIsCashierLoggedIn(false)
    setisLoggedInEmployee(false);
    setEmployeePersonId(null);
  };

  return (
    <EmployeeAuthContext.Provider value={{ isLoggedInEmployee,isCashierLoggedIn, employeePersonId, cashierlogin,login, logout }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export default EmployeeAuthProvider;