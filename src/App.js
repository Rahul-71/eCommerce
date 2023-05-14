import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./cart-context/CartContext";
import AboutPage from "./components/AboutPage";
import Headers from "./components/Headers";
import Stores from "./components/Stores";
import Home from "./components/Home";

const routerDefination = createBrowserRouter([
  {
    path: "/",
    element: <Headers />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/store", element: <Stores /> },
    ],
  },
]);

const App = () => {
  return (
    <CartContextProvider>
      <RouterProvider router={routerDefination}>
        <Headers />
      </RouterProvider>
    </CartContextProvider>
  );
};

export default App;
