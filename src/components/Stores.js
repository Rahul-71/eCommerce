import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart-context/CartContext";
import Cart from "./Cart";
import StoreItems from "./StoreItems";

const Stores = () => {
  const cartCtx = useContext(CartContext);

  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    const fetchProd = async () => {
      // console.log("fetching products");
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProductsArr(data);
    };

    fetchProd();
  }, []);

  return (
    <div>
      {cartCtx.isCartShown && <Cart />}
      <StoreItems productsArr={productsArr} />
    </div>
  );
};

export default Stores;
