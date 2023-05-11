import React from "react";
import styles from "./StoreItems.module.css";
import { formatPrice } from "./Utils/UtilityFunctions";

const StoreItems = ({ productsArr }) => {
  // const formatPrice = (val, currency = "INR") => {
  //   return new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: currency,
  //   }).format(val);
  // };

  return (
    <div className={styles["grid-container"]}>
      {productsArr.map((prod) => (
        <div className={styles["grid-item"]}>
          <h2>{prod.title}</h2>
          <img src={prod.imageUrl} alt={prod.title} />
          <div>
            <h5>{formatPrice(prod.price)}</h5>
            <button>ADD TO CART</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreItems;
