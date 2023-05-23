import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  setEmailId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const setEmailHandler = (email) => {
    setEmail(email);
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
