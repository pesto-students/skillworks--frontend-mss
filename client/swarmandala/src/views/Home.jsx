import React from "react";
import Artists_container from "../components/Artists/Artists_container";
import Raga_container from "../components/Raga/Raga_container";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Container_test">
      <Outlet />
      <div>
        <Raga_container />
        <Artists_container />
      </div>
    </div>
  );
}

export default Home;
