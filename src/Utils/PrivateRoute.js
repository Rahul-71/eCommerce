import React, { useContext } from "react";
import { AuthContext } from "../cart-context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
