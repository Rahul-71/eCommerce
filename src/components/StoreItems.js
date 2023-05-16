import React, { useContext } from "react";
import { formatPrice } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";
import { Link, NavLink } from "react-router-dom";

const StoreItems = ({ productsArr }) => {
  const cartCtx = useContext(CartContext);

  const addItemToCart = (e) => {
    const itemId =
      e.target.parentElement.parentElement.parentElement.getAttribute("id");
    const selectedItem = productsArr.filter((item) => +item.id === +itemId)[0];
    console.log("selectedItem", selectedItem);
    cartCtx.addItem(selectedItem);
  };

  return (
    <div className="container mt-sm-3 ">
      <div className="row g-5 mb-3 align-items-center">
        {/* now for each col */}
        {productsArr.map((prod) => (
          <div id={prod.id} key={prod.id} className="col-lg-4 col-md-6">
            <NavLink
              to={`/products/${prod.id}`}
              style={{ textDecoration: "none" }}
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
            >
              <div className="card  border-0" style={{ width: "12rem" }}>
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="card-img-top"
                  style={{ width: "200px", height: "200px" }}
                />
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
            </NavLink>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default StoreItems;
