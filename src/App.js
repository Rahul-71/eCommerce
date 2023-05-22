import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import AuthContextProvider from "./cart-context/AuthContext";
import CartContextProvider from "./cart-context/CartContext";
import AboutPage from "./components/AboutPage";
import ContactUs from "./components/ContactUs";
import Headers from "./components/Headers";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import ProductDetails from "./components/ProductDetails";
import Stores from "./components/Stores";

const routerDefination = createBrowserRouter([
  {
    path: "/",
    element: <Headers />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/store", element: <Stores /> },
      { path: "/products/:productId", element: <ProductDetails /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/login", element: <LoginForm /> },
      { path: "*", element: <NotFound /> },
    ],
    errorElement: <NotFound />,
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={routerDefination}>
          <Headers />
        </RouterProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

export default App;
