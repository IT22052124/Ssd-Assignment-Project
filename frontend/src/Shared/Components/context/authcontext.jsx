import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  cusId: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [cusId, setCusId] = useState(() => {
    const savedCusId = localStorage.getItem('cusId');
    return savedCusId ? JSON.parse(savedCusId) : null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('cusId', JSON.stringify(cusId));
  }, [isLoggedIn, cusId]);

  const login = (customerId) => {
    setIsLoggedIn(true);
    setCusId(customerId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCusId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, cusId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
