import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../cart-context/CartContext";

const MainNavigation = () => {
  const cartCtx = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg px-5">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            to="/"
            className={`nav-link ${(isActive) =>
              isActive ? "active" : undefined}`}
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/store"
            className={`nav-link ${(isActive) =>
              isActive ? "active" : undefined}`}
            onClick={cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined}
          >
            Store{" "}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={`nav-link ${(isActive) =>
              isActive ? "active" : undefined}`}
            onClick={!cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined}
          >
            About
          </NavLink>
        </li>
      </ul>
      {!cartCtx.isCartShown && (
        <button
          type="button"
          className="btn btn-primary btn-md rounded-pill align-items-center"
          onClick={() => cartCtx.toggleCartShown()}
        >
          <span className="h5">Cart</span>
          <span className="badge rounded-pill text-bg-warning ms-3">
            {cartCtx.items.length}
          </span>
        </button>
      )}
    </nav>
  );
};

export default MainNavigation;
