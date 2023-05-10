import React from "react";

const StoreItems = ({ productsArr }) => {
  const formatPrice = (val, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(val);
  };

  return (
    <div>
      {productsArr.map((prod) => (
        <div>
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
