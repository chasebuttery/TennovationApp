import React from "react";
import { NavLink } from "react-router-dom";
import "./AboutPage.scss";
import CreatorsInfo from "./components/CreatorsInfo";
import LocationsInfo from "./components/LocationsInfo";

export default function AboutPage() {
  return (
    <div className="AboutPage">
      <div className="Timeline">
        <h1>Partners</h1>
      </div>
      <LocationsInfo />
      <CreatorsInfo />
    </div>
  );
}
