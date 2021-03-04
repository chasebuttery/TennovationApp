import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavBar.scss";
import Logo from "../Images/tvthick.png";
import NavMenu from "../Images/nav.png";
import Portfolio from "../Images/portfolio.png";
//import Schedule from "../Images/Schedule.jpeg";
import Auth from "../Auth";
import firebase from "../firebase";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [profileIcon, setProfileIcon] = useState();

  const location = useLocation();

  useEffect(() => {
    console.log("Location changed");
  }, [location]);

  // useEffect(() => {
  //   async function getMemberStatus() {

  //     const user = await Auth.isMember();

  //       setMember(user);
  //       console.log(user,"status")

  //       console.log(member,"statsSER")

  //   }
  //   getMemberStatus();
  // },);d

  useEffect(() => {
    async function getProfileImg() {
      const profileImg = await Auth.getProfileImg();
      setProfileIcon(profileImg);
      console.log("memmbebrrr");
    }
    getProfileImg();
  }, [profileIcon, location]);

  function expandNavbar() {
    setIsExpanded(!isExpanded);
  }

  console.log("expand", isExpanded);

  return (
    <div className="NavBar">
      <div className="Expander">
        <button onClick={expandNavbar} className="ExpandButton">
          <img className="ExpandIcon" src={NavMenu} />
        </button>
      </div>
      
      <div className="MainNav">
        <div className="LogoLink">
          <NavLink to="/">
            <img className="LogoIcon" src={Logo} />
          </NavLink>
        </div>
      </div>
      <div className="Profile">
        <NavLink activeClassName="active" to="/profile">
          <img className="ProfileIcon" src={profileIcon} />
        </NavLink>
      </div>

      <div
        className={isExpanded ? "Expand" : "Closed"}
        onClick={expandNavbar}
      >
        <div className="PlayLink">
          <NavLink activeClassName="active" to="/explore">
            <h1 className="Text">explore</h1>
          </NavLink>
        </div>
        <div className="PortfolioLink">
          <NavLink to="/portfolio">
            <h1 className="Text">activity portfolio</h1>
          </NavLink>
        </div>
        <div className="MembersLink">
          <NavLink activeClassName="active" to="/members">
            <h1 className="Text">members</h1>
          </NavLink>
        </div>
        <div className="AboutLink">
          <NavLink activeClassName="active" to="/partners">
            <h1 className="Text">partners</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
