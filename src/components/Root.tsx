import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Root = () => {
  return (
    <>
      <div id="app" className="d-flex flex-column">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
