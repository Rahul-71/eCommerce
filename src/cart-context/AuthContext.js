import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  emailId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const userLoggedIn = !!token;

  const loginHandler = (token, emailID) => {
    setToken(token);
    setEmail(emailID);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail("");
  };

  const contextValue = {
    token: token,
    emailId: email,
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
