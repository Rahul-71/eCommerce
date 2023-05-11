import React from "react";
import styles from "./Cart.module.css";
import { formatPrice } from "./Utils/UtilityFunctions";

const cartElements = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
];

const Cart = () => {
  return (
    <div className={styles.cart}>
      <h1>CART</h1>
      <table style={{ width: "100%", color: "black", fontSize: 24 }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartElements.map((ele) => (
            <tr className={styles["cart-item"]}>
              <td className={styles["cart-image"]}>
                <img src={ele.imageUrl} alt={ele.title} />
                <p>{ele.title}</p>
              </td>
              <td className="h5">{formatPrice(ele.price)}</td>
              <td>
                <input type="number" className="form-control form-control-sm" />
                <button type="reset" className="btn btn-danger">
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Cart;
