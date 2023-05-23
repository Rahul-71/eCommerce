import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { formatPrice, getNthParent } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";

const StoreItems = ({ productsArr }) => {
  const cartCtx = useContext(CartContext);

  const addItemToCart = (e) => {
    e.preventDefault();
    const itemId = getNthParent(e.target, 3).getAttribute("id");
    console.log("inside addItemToCart : " + itemId);
    const selectedItem = productsArr.filter((item) => +item.id === +itemId)[0];
    console.log("selectedItem", selectedItem);

    // adding item to cart
    cartCtx.addItem(selectedItem);
  };

  return (
    <div className="container mt-sm-3 ">
      <div className="row g-5 mb-3 align-items-center">
        {/* now for each col */}
        {productsArr.map((prod) => (
          <div id={prod.id} key={prod.id} className="col-lg-4 col-md-6">
            <div className="card  border-0" style={{ width: "12rem" }}>
              <NavLink
                to={`/products/${prod.id}`}
                style={{ textDecoration: "none" }}
                className={`nav-link ${(isActive) =>
                  isActive ? "active" : undefined}`}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="card-img-top"
                  style={{ width: "200px", height: "200px" }}
                />
              </NavLink>
              <section className="card-body">
                <h6>{prod.title}</h6>
                <p>{formatPrice(prod.price, "USD")}</p>
                <button
                  type="button"
                  className="btn btn-md btn-primary"
                  onClick={addItemToCart}
                >
                  ADD TO CART
                </button>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreItems;
