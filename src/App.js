import React, { useState } from "react";
import Headers from "./components/Headers";
import StoreItems from "./components/StoreItems";
import Cart from "./components/Cart";

const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const App = () => {
  const [isCartShown, setIsCartShown] = useState(true);

  const showCart = () => {
    setIsCartShown(true);
  };
  const hideCart = () => {
    setIsCartShown(false);
  };

  return (
    <>
      <Headers showCart={showCart} />
      {isCartShown && <Cart hideCart={hideCart} />}
      <StoreItems productsArr={productsArr} />
    </>
  );
};

export default App;
