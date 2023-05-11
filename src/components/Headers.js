import React from "react";
import styles from "./Headers.module.css";

const Headers = ({ showCart }) => {
  return (
    <div className={styles.navbar}>
      <nav className={styles["nav-links"]}>
        <a href="/">Home</a>
        <a href="/store">Store</a>
        <a href="/about">About</a>
      </nav>

      <button
        type="button"
        className={styles["cart-button"]}
        onClick={showCart}
      >
        Cart
      </button>
    </div>
  );
};

export default Headers;
