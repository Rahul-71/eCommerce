import React, { useContext } from "react";
import { formatPrice } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";
import styles from "./StoreItems.module.css";

const StoreItems = ({ productsArr }) => {
  const cartCtx = useContext(CartContext);

  const addItemToCart = (e) => {
    const itemId = e.target.parentElement.parentElement.getAttribute("id");

    const selectedItem = productsArr.filter((item) => +item.id === +itemId)[0];

    cartCtx.addItem(selectedItem);
  };

  return (
    <div className={styles["grid-container"]}>
      {productsArr.map((prod) => (
        <div id={prod.id} key={prod.id} className={styles["grid-item"]}>
          {prod.id}
          <h2>{prod.title}</h2>
          <img src={prod.imageUrl} alt={prod.title} />
          <div>
            <h5>{formatPrice(prod.price)}</h5>
            <button type="button" onClick={addItemToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreItems;
