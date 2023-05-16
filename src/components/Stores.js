import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart-context/CartContext";
import Cart from "./Cart";
import StoreItems from "./StoreItems";

// const productsArr = [
//   {
//     id: 1,
//     title: "Colors",
//     price: 100,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
//   },
//   {
//     id: 2,
//     title: "Black and white Colors",
//     price: 50,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
//   },
//   {
//     id: 3,
//     title: "Yellow and Black Colors",
//     price: 70,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
//   },
//   {
//     id: 4,
//     title: "Blue Color",
//     price: 100,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
//   },
// ];

// const getAllProducts = async function () {
//   const res = await fetch("https://fakestoreapi.com/products");
//   return await res.json();
// };

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

  // console.log("prodArr");
  // console.log(productsArr);
  // let productsArr = [];

  // useEffect(
  //   () =>
  //     async function () {
  //       console.log("fetching the products...");
  //       const response = await fetch(getAllProducts);
  //       productsArr = await response.json();

  //       console.log("productsArr: ");
  //       console.log(productsArr);
  //     },
  //   [productsArr]
  // );

  return (
    <div>
      {cartCtx.isCartShown && <Cart />}
      <StoreItems productsArr={productsArr} />
    </div>
  );
};

export default Stores;
