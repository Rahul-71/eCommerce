import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../cart-context/CartContext";
import { AuthContext } from "../cart-context/AuthContext";

const MainNavigation = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      authCtx.logout();
      navigate("/");
    }
  };

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
              end
              className={`nav-link ${(isActive) =>
                isActive ? "active" : undefined}`}
              onClick={
                !cartCtx.isCartShown ? cartCtx.toggleCartShown : undefined
              }
            >
              Home
            </NavLink>
          </li>
          {authCtx.isLoggedIn && (
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
          )}
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
          {!authCtx.isLoggedIn ? (
            <li className="nav-item align-items-center justify-content-center">
              <NavLink
                to="/login"
                className={`nav-link ${(isActive) =>
                  isActive ? "active" : undefined}`}
              >
                Login
              </NavLink>
            </li>
          ) : undefined}
        </ul>
      </div>
      {authCtx.isLoggedIn && (
        <button
          className="btn btn-danger mx-2 rounded-pill btn-md"
          onClick={logoutHandler}
        >
          Logout
        </button>
      )}
      {authCtx.isLoggedIn &&
        !cartCtx.isCartShown &&
        (console.log("cart opened: " + JSON.stringify(cartCtx.items)),
        (
          <button
            type="button"
            className="btn btn-primary btn-md rounded-pill align-items-center"
            onClick={() => cartCtx.toggleCartShown()}
          >
            <span className="h5">Cart</span>
            <span className="badge rounded-pill text-bg-warning ms-3">
              {console.log("cart items : ", cartCtx.items)}
              {cartCtx.items.length}
            </span>
          </button>
        ))}
    </nav>
  );
};

export default MainNavigation;
