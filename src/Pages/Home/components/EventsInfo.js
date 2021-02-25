import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import EventIcon from "../../../Images/event.png";
import TourneyIcon from "../../../Images/tourney.png";
import PartyIcon from "../../../Images/party.png";
import MoreIcon from "../../../Images/Go.png";
import "./EventsInfo.scss";

export default function EventsInfo() {
  const history = useHistory();

  function goToPlayPage() {
    history.push("/play");
  }

  return (
    <div
      className="EventsInfo"
      onClick={(e) => {
        history.push("/explore");
      }}
    >
      <h1 className="InfoTitle"> Events </h1>
      <p> sign up for and join </p>
      <div className="Types">
        <div className="Event">
          <img className="Icon" src={TourneyIcon} />
          <p className="Name"> Tournaments </p>
        </div>
        <div className="Event">
          <img className="Icon" src={PartyIcon} />
          <p className="Name"> Parties</p>
        </div>
        <div className="Event">
          <img className="Icon" src={EventIcon} />
          <p className="Name"> Meetings </p>
        </div>
        <div className="Event" onClick={goToPlayPage}>
          <img className="Icon" src={MoreIcon} />
          <p className="More">More</p>
        </div>
      </div>
    </div>
  );
}
