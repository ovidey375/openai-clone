import { createContext, useState } from "react";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    return localStorage.getItem("token") || Cookie.get("jwt") || null;
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};
