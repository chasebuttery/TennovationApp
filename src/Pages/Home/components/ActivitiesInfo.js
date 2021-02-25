import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import TennisIcon from "../../../Images/tennis.png";
import BasketballIcon from "../../../Images/bball.png";
import GolfIcon from "../../../Images/golf.png";
import MoreIcon from "../../../Images/Go.png";
import "./ActivitiesInfo.scss";

export default function ActivitiesInfo() {
  const history = useHistory();

  function goToPlayPage() {
    history.push("/explore");
  }

  return (
    <div className="ActivitiesInfo">
      <h1 className="InfoTitle"> Activities</h1>
      <p> play, train, and compete in</p>
      <div className="Types">
        <div className="Sport">
          <img className="Icon" src={TennisIcon} />
          <p className="Name"> Tennis</p>
        </div>
        <div className="Sport">
          <img className="Icon" src={BasketballIcon} />

          <p className="Name"> Basketball</p>
        </div>
        <div className="Sport">
          <img className="Icon" src={GolfIcon} />

          <p className="Name"> Golf</p>
        </div>
        <div className="Sport" onClick={goToPlayPage}>
          <img className="Icon" src={MoreIcon} />
          <p className="More">More</p>
        </div>
      </div>
    </div>
  );
}
