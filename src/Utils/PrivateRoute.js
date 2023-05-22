import React, { useContext } from "react";
import { AuthContext } from "../cart-context/AuthContext";
import { useNavigate } from "react-router";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return authCtx.isLoggedIn ? (
    <Element {...rest} />
  ) : (
    navigate("/login", { replace: true })
  );
};

export default PrivateRoute;
