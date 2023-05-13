import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../cart-context/CartContext";
import styles from "./Headers.module.css";

const Headers = () => {
  const cartCtx = useContext(CartContext);

  const numOfItems = cartCtx.items.length;

  return (
    <>
      <div className="navbar px-5">
        <nav className={styles["nav-links"]}>
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about" onClick={() => cartCtx.showCart()}>
            {/* onClick we are enabling the cart since we are using negatation of isCartShown for below button */}
            About
          </Link>
        </nav>

        {!cartCtx.isCartShown && (
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={cartCtx.showCart}
          >
            <span className="h5">Cart</span>
            <span className="badge rounded-pill text-bg-warning mx-3">
              {numOfItems}
            </span>
          </button>
        )}
      </div>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1 className="fs-1 text-white">The Generic</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Headers;
