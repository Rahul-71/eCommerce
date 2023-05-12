import React, { useState } from "react";
import CartContextProvider from "./cart-context/CartContext";
import Cart from "./components/Cart";
import Headers from "./components/Headers";
import StoreItems from "./components/StoreItems";

const productsArr = [
  {
    id: 1,
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: 2,
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: 3,
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: 4,
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCart = () => {
    setIsCartShown(true);
  };
  const hideCart = () => {
    setIsCartShown(false);
  };

  return (
    <CartContextProvider>
      <Headers showCart={showCart} />
      {isCartShown && <Cart isCartShown={isCartShown} hideCart={hideCart} />}
      <StoreItems productsArr={productsArr} />
    </CartContextProvider>
  );
};

export default App;
