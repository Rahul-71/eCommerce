import React, { useContext } from "react";
import { CartContext } from "../cart-context/CartContext";
import styles from "./Headers.module.css";

const Headers = ({ showCart }) => {
  const cartCtx = useContext(CartContext);

  const numOfItems = cartCtx.items.length;

  return (
    <div className={styles.navbar}>
      <nav className={styles["nav-links"]}>
        <a href="/">Home</a>
        <a href="/store">Store</a>
        <a href="/about">About</a>
      </nav>

      <button
        type="button"
        className="btn btn-primary btn-md"
        onClick={showCart}
      >
        <span className="h5">Cart</span>
        <span className="badge rounded-pill text-bg-warning mx-3">
          {numOfItems}
        </span>
      </button>
    </div>
  );
};

export default Headers;
