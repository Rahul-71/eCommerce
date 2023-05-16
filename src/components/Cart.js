import React, { useContext } from "react";
import { formatPrice } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
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
      } container w-25 bg-secondary bg-gradient top-0 mt-5 overflow-auto rounded-5 fade ${
        cartCtx.isCartShown ? "show show-with-delay" : ""
      }`}
    >
      <p className="h1 text-center bg-gradient text-white">CART</p>
      <table className="table fs-4 mb-5">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartElements.map((ele) => (
            <tr key={ele.id} className={styles["cart-item"]}>
              <td>
                <img
                  src={ele.image}
                  alt={ele.title}
                  className="rounded-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <p className="h6">{ele.title}</p>
              </td>
              <td className="h5">{formatPrice(ele.price)}</td>
              <td id={ele.id} className="col">
                <input
                  type="text"
                  className="w-25 me-1 form-control-sm"
                  value="1"
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
            <td className="p-3" colSpan="3">
              <div className="d-flex justify-content-between ">
                <button
                  className="btn btn-danger btn-md"
                  onClick={() => cartCtx.toggleCartShown()}
                >
                  Close
                </button>
                <button className="btn btn-success btn-md">Proceed</button>
                <span className="h6">
                  Total Price: {formatPrice(cartCtx.totalPrice)}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Cart;
