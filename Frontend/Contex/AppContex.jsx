import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [mainId, setMainId] = useState(0);

  return (
    <AppContext.Provider value={{ mainId, setMainId }}>
      {children}
    </AppContext.Provider>
  );
}
