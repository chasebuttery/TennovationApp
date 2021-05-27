import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./ActivityCard.scss";
import firebase from "../../firebase";
import { addUserToActivity } from "../../Backend/ActivitiesDB";
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Fab } from "@material-ui/core";
import { getMembersGoingList } from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import "./ActivityCard.scss";
import JoinActivity from "./JoinActivity";
import StopWatch from "./StopWatch";
import { NavLink } from "react-router-dom";
import timer from "../../Images/timer.jpg";
import Ktc from "../../Images/ktc.png";
import Sport from "../../Images/tennis.png";

import Auth from "../../Auth";
import MoreIcon from "../../Images/Go.png";


export default function ActivityCard(props) {
  const { activity } = props;
  const [members, setMembers] = useState([]);
  const [isInActivity, setIsInActivity] = useState(false);

  const [member, setMember] = useState({
    name: Auth.getUserName() || "",
    id: Auth.getUserID() || "",
    profileImg: Auth.getProfileImg(),
  });


  const [img, setImg] = useState("");

  const [vid, setVid] = useState("");

  const [showImg, setShowImg] = useState(false);

  const history = useHistory();

  function goToActivityPage() {
    // history.push("./explore/activity/" + activity.activityID);
    const win = window.open(
      "/explore/activity/" + activity.activityID,
      "_blank"
    );
    win.focus();
  }

  function inActivity() {
    members.forEach((personGoing) => {
      if ((personGoing.id = member.id)) {
        setIsInActivity(true);
      }
    });
  }

  console.log("MEMEMMMMMMMMMM", members);

  useEffect(inActivity, []);

  function downloadImg() {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref();

    var starsRef = storageRef.child("images/" + activity.imgID + ".jpg");
    //console.log('getting img')

    // Get the download URL
    const imgUrl = starsRef
      .getDownloadURL()
      .then(function(url) {
        // Insert url into an <img> tag to "download"
        setImg(url);
        setShowImg(true);
      })
      .catch(function(error) {
        // A full list of error codes is available at
        //console.log("ig not downloaded")
      });
  }
  
  function getVideo() {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref();

    var starsRef = storageRef.child("videos/" + activity?.vidUrl);
    //console.log('getting img')

    // Get the download URL
    const vidUrl = starsRef
      .getDownloadURL()
      .then(function(url) {
        // Insert url into an <img> tag to "download"
        setVid(url);
      })
      .catch(function(error) {
        // A full list of error codes is available at
        //console.log("ig not downloaded")
      });
  }

  function refreshMembersGoing(member) {
    let isMemberIn = members.find((memb) => memb.name === member.name);
    console.log(isMemberIn);
    if (isMemberIn == null) {
      console.log("ADDINGGGG");
      setMembers([...members, member]);
    }
  }

  function refreshMembersNotGoing(memberData) {
    console.log("LEAVING ACTIVITY" + memberData.name);
    let filteredMembers = members.filter(
      (member) => member.name != memberData.name
    );
    setMembers(filteredMembers);
  }
  

  downloadImg();
  getVideo();

  var progress = 10;

  return (
    <div className="ActivityCard" onClick = {goToActivityPage}>

      <div className = "VideoContainer">
          <video src = {vid}  muted autoPlay loop/>
      </div>

      <div className="Header">
        <div className = "Main">
             {/* <h4 className="Title">{activity.title}</h4>
              */}
              <Typography className = "Title" variant = "h2" >Tennis Class</Typography>
         
              <Typography className = "Info" variant = "body1" >Tennis Class</Typography>
        {/* <img className="Timer" src={timer} /> */}
        </div>
        <div className = "Progress">
        <StopWatch activityTime = {activity?.time}/>
        </div>
      </div>


      <div className="Footer">
      <div className="Highlights">
        <p> Tennis : Group Size : 24/28 people : Competition : 6-730pm : 3 weeks left </p>
      </div>
        <JoinActivity
          activityID={activity.activityID}
          onSubmit={refreshMembersGoing}
          onLeave={refreshMembersNotGoing}
          inActivity={isInActivity}
        />
      </div>

    </div>
  );
}
