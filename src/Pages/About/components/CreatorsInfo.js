import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import CreatorIcon from "../../../Images/creator.png";
import MoreIcon from "../../../Images/Go.png";
import "./CreatorsInfo.scss";

export default function CreatorsInfo() {
  const history = useHistory();

  return (
    <div
      className="CreatorsInfo"
      onClick={(e) => {
        history.push("/partners");
      }}
    >
      <h1 className="InfoTitle"> Creators</h1>
      <p> our coaches, teachers, and organizers</p>
      <div className="Icons">
        <div className="Creator">
          <img className="Icon" src={CreatorIcon} />
          Coaches
        </div>
        <div className="Creator">
          <img className="Icon" src={CreatorIcon} />
          Teachers
        </div>
        <div className="Creator">
          <img className="Icon" src={CreatorIcon} />
          Organizers
        </div>
        <div className="Creator">
          <img className="Icon" src={MoreIcon} />
          <p className="More">More</p>
        </div>
      </div>
    </div>
  );
}
