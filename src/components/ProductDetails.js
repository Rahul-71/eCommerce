import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchProductById, formatPrice } from "../Utils/UtilityFunctions";
import { CartContext } from "../cart-context/CartContext";
import Cart from "./Cart";

const ProductDetails = () => {
  const params = useParams();

  const cartCtx = useContext(CartContext);

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProductById(params.productId).then((prodResponse) => {
      setProduct(prodResponse);
    });
  });

  const addItemToCart = (e) => {
    cartCtx.addItem(product);
  };

  return (
    <>
      {cartCtx.isCartShown && <Cart />}
      <div className="container mt-4">
        <Link to="/store">
          <ArrowLeft className="h3" />
        </Link>
        <div className="row" id={product.id}>
          <div className="row col-md-5 justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "400px", height: "400px" }}
            />
            <button
              className="btn btn-success btn-lg w-50 mt-4"
              onClick={addItemToCart}
            >
              Add To Cart
            </button>
          </div>
          <div className="col-md-6 p-2">
            <div className="d-flex text-wrap col-md-12">
              <h3>{product.title}</h3>
            </div>
            <span className="text-capitalize badge bg-secondary text-white mb-5">
              {product.category}
            </span>
            <h3>{formatPrice(product.price)}</h3>
            <p className="fs-6">
              <span className="badge bg-success">{product.rating?.rate}</span>{" "}
              <i>{product.rating?.count} ratings</i>
            </p>
            <i className="h5">Description:</i>
            <p className="">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
