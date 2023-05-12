import React, { useContext } from "react";
import { formatPrice } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";
import styles from "./Cart.module.css";

const Cart = ({ hideCart, isCartShown }) => {
  const cartCtx = useContext(CartContext);
  const cartElements = cartCtx.items;

  const removeItemFromCart = (e) => {
    const rId = e.target.parentElement.id;
    cartCtx.removeItem(rId);
  };

  return (
    <div
      className={`${
        styles.cart
      } container w-50 bg-secondary bg-gradient mt-5 rounded-5 fade ${
        isCartShown ? "show show-with-delay" : ""
      }`}
    >
      <p className="h1 text-center bg-gradient text-white">CART</p>
      <table className="table fs-4">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartElements.map((ele, indx) => (
            <tr className={styles["cart-item"]}>
              <td className={styles["cart-image"]}>
                <img src={ele.imageUrl} alt={ele.title} />
                <p>{ele.title}</p>
              </td>
              <td className="h5">{formatPrice(ele.price)}</td>
              <td id={ele.id} className="col">
                <input
                  type="number"
                  className="form-control form-control-sm w-25"
                  value={1}
                  disabled
                />

                <button
                  type="reset"
                  className="btn btn-danger"
                  onClick={removeItemFromCart}
                >
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-3 " colSpan="3">
              <div className="d-flex mx-4 justify-content-between ">
                <button className="btn btn-danger btn-lg" onClick={hideCart}>
                  Close
                </button>
                <button className="btn btn-success btn-lg">Proceed</button>
                <span>Total Price: {formatPrice(cartCtx.totalPrice)}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Cart;
