import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setIsConnected(true);
    setUserID(id);
    setUserToken(token);
  };

  const logout = () => {
    setIsConnected(false);
    setUserID(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isConnected, login, logout, userID, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
