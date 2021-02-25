import React, { useEffect, useLocation, useState } from "react";
import "./App.scss";
import Routes from "./Routes";
import NavBar from "./NavBar/NavBar";
import Auth from "./Auth";

export default function App() {
  return (
    <div className="App">
      <div className="Nav">
        <NavBar />
      </div>
      <div className="PageContent">
        <Routes />
      </div>
    </div>
  );
}
