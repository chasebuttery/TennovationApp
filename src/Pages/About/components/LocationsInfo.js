import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import GolfIcon from "../../../Images/sugar.png";
import HollIcon from "../../../Images/holl.png";
import KTCIcon from "../../../Images/ktc.png";
import MoreIcon from "../../../Images/Go.png";
import "./LocationsInfo.scss";

export default function LocationsInfo() {
  const history = useHistory();

  function goToLocationPage() {
    history.push("/partners");
  }

  return (
    <div className="LocationsInfo">
      <h1 className="InfoTitle"> Locations </h1>
      <p> our partnered locations </p>
      <div className="Icons">
        <div className="Location">
          <img className="Icon" src={KTCIcon} />
          <a
            rel="noopener noreferrer"
            href="http://ktcquail.com/"
            target="_blank"
          >
            KTC/Quail
          </a>
        </div>
        <div className="Location">
          <img className="Icon" src={HollIcon} />
          <a
            rel="noopener noreferrer"
            href="http://www.hollingertennis.net/"
            target="_blank"
          >
            Hollinger
          </a>
        </div>
        {/* <div className="Location">
          <img className="Icon" src={GolfIcon} />
          <a
            rel="noopener noreferrer"
            href="http://www.sugarvalleygc.com/welcome"
            target="_blank"
          >
            Sugar Valley
          </a>
        </div> */}
        <div className="Location" onClick={goToLocationPage}>
          <img className="Icon" src={MoreIcon} />
          <p className="More">More</p>
        </div>
      </div>
    </div>
  );
}
