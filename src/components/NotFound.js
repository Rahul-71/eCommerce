import React, { useContext, useEffect } from "react";
import NotFoundGif from "../assets/not_found.gif";
import { CartContext } from "../cart-context/CartContext";
import MainNavigation from "./MainNavigation";

const NotFound = () => {
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    if (!cartCtx.isCartShown) {
      console.log("is shown");
      cartCtx.toggleCartShown();
    }
  });

  return (
    <>
      <MainNavigation />
      <div className="d-flex align-items-center justify-content-center">
        <img src={NotFoundGif} alt="Not Found" className="img-fluid vh-100" />
      </div>
    </>
  );
};

export default NotFound;
