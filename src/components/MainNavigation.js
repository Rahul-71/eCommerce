import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../cart-context/CartContext";

const MainNavigation = () => {
  const cartCtx = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-md bg-secondary fixed-top px-5">
      <div>
        <button
          className="navbar-toggler"
          type="menu"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <NavLink
              to="/"
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
              onClick={
                !cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined
              }
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
              onClick={
                cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined
              }
            >
              Store{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
              onClick={
                !cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined
              }
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
              onClick={
                !cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
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
