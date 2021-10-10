import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./ActivityCard.scss";
import firebase from "../../firebase";
import { addUserToActivity } from "../../Backend/ActivitiesDB";
import { CircularProgressProps } from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import BookmarkIcon from "@material-ui/icons/TurnedInNot";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Fab, Button } from "@material-ui/core";
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
      if ((personGoing.id == member.id)) {
        setIsInActivity(true);
      }
    });
  }

  console.log("MEMEMMMMMMMMMM", members);

  useEffect(inActivity, []);

   function downloadImg() {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref();

    var starsRef = storageRef.child("activityImage/" + activity.imgUrl);
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


    if(activity?.vidUrl){
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
        //USE AN IMAGE INSTEAD
      });
    }
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

  useEffect(downloadImg, []);
  useEffect(getVideo, []);

  var progress = 10;

  return (
    <div className="ActivityCard" onClick={goToActivityPage}>
      <div className="ImageContainer">
        {/* <video
          src={vid}
          muted
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
        /> */}
        <img className = "Image" src = {img}/>
      </div>

      <div className="ActivityHeader">
        <div className="Main">
          
          <Typography className="Title" variant="h2">
            {activity?.title}
          </Typography>

          <Typography className="Info" variant="body1">
            {activity?.location}
          </Typography>

          <Typography className="Hours" variant="body1">
            {activity?.hours}
          </Typography>

        </div>
        <div className = "Secondary">
        <div className="TimerContainer">
          <StopWatch className="Timer" activityTime={activity?.time} />
        </div>
        <div className="BookmarkContainer">
          <BookmarkIcon className="Bookmark" />
          <Typography className="Spots" variant="body1">
            {activity?.spots || "0"} spots left
          </Typography>
        </div>
      </div>
      </div>

      <div className="Footer">
        <div className="MoreContainer">
          {/* <p> Tennis : Group Size : 24/28 people : Competition : 6-730pm : 3 weeks left </p> */}
          <Fab className="MoreButton" variant="entended">
            <strong> More Info </strong>
          </Fab>
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
