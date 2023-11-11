import React, { createContext, useContext, useState } from "react";

const userGlobe = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState("initialState");

  return (
    <userGlobe.Provider value={{ user, setUser }}>
      {children}
    </userGlobe.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(userGlobe);
};
