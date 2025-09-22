import { createContext, useEffect, useState } from 'react';

export const DeliveryAuthContext = createContext({
  isLoggedIn: false,
  deliveryPersonId: null,
  login: () => {},
  logout: () => {}
});

export const DeliveryAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedInDelivery');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [deliveryPersonId, setDeliveryPersonId] = useState(() => {
    const savedDeliveryPersonId = localStorage.getItem('deliveryPersonId');
    return savedDeliveryPersonId ? JSON.parse(savedDeliveryPersonId) : null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedInDelivery', JSON.stringify(isLoggedIn));
    localStorage.setItem('deliveryPersonId', JSON.stringify(deliveryPersonId));
  }, [isLoggedIn, deliveryPersonId]);

  const login = (deliveryPersonId) => {
    console.log('Setting deliveryPersonId:', deliveryPersonId);
    console.log(deliveryPersonId) // Add this line for debugging
    setIsLoggedIn(true);
    setDeliveryPersonId(deliveryPersonId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setDeliveryPersonId(null);
  };

  return (
    <DeliveryAuthContext.Provider value={{ isLoggedIn, deliveryPersonId, login, logout }}>
      {children}
    </DeliveryAuthContext.Provider>
  );
};

export default DeliveryAuthProvider;