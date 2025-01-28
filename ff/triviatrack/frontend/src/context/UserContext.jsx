import React, { createContext, useState, useContext } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state (null if logged out)

  // Update user state when logging in
  const login = (userData) => {
    setUser(userData);
  };

  // Clear user state when logging out
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for using the UserContext
export const useUser = () => useContext(UserContext);
