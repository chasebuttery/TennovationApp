import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./HomePage.scss";
import TennisEvent from "../../Images/KTCQuail.jpeg";
import CreateIcon from "../../Images/createicon.png";
import firebase from "../../firebase";
import ActivitiesInfo from "./components/ActivitiesInfo";
import EventsInfo from "./components/EventsInfo";
import anim from "../../Images/tennanim.mp4";

export default function HomePage() {
  const history = useHistory();

  function goToCreatePage() {
    history.push("/create");
  }
  function goToJoinPage() {
    history.push("/profile");
  }

  return (
    <div className="HomePage">

    //FILTER BAR
    //





      {/* <video className="Anim" autoPlay loop muted playsInline>
        <source src={anim} type="video/mp4" />
      </video>

      <div className="Header">
        <h1 className="Tenno">T E N N O V A T I O N</h1>
        <div className="CreateActivityLink" onClick={goToCreatePage}>
          <p>Learn, play, create together.</p>
        </div>
      </div>

      <div className="HomeInfo">
        <ActivitiesInfo />

        <EventsInfo />
      </div>

      <div className="MemberButton" onClick={goToJoinPage}>
        <h2 className="BName">become a member</h2>
      </div> */}
    </div>
  );
}
