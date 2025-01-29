import React, { createContext, useState, useContext } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  
  const login = (userData) => {
    console.log("updatedlogin")
    setUser(userData);
  };

  const logout = () => {
    console.log("updatedlogout")
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
