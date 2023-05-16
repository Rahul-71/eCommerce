import React from "react";
import * as Icons from "react-bootstrap-icons";

const Home = () => {
  return (
    <div className="d-flex justify-content-center bg-secondary">
      <div className="text-center">
        <h4 className="border border-2 p-2">Get Our Latest Album</h4>
        <button className="bg-secondary border-0">
          <Icons.Play className="h1 mt-3" />
        </button>
      </div>
    </div>
  );
};

export default Home;
