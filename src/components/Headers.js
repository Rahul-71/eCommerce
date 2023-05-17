import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const Headers = () => {
  return (
    <>
      <MainNavigation />
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1 className="fs-1 text-white">Insta Mall</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Headers;
