import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./ActivityCard.scss";
import firebase from "../../firebase";
import { addUserToActivity } from "../../Backend/ActivitiesDB";
import { getMembersGoingList } from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import "./ActivityCard.scss";
import JoinActivity from "./JoinActivity";
import { NavLink } from "react-router-dom";
import timer from "../../Images/timer.jpg";
import Ktc from "../../Images/ktc.png";
import Sport from "../../Images/tennis.png";

import MoreIcon from "../../Images/Go.png";

export default function ActivityCard(props) {
  const { activity } = props;
  const [members, setMembers] = useState([]);


  var moment1 = moment(activity?.time.toDate(), "DD-MM-YYYY hh:mm:ss");
  var moment2 = moment();

  var diff = moment2.diff(moment1, "days");
  var diff2 = moment2.diff(moment1, "hours");
  var diff3 = moment2.diff(moment1, "minutes");

  const [img, setImg] = useState("");

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

  useEffect(() => {
    async function getMembersGoing(activity) {
      const membersList = await getMembersGoingList(activity.activityID);
      setMembers(
        membersList.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getMembersGoing(activity);
  }, [activity]);

  function refreshMembersGoing(member) {
    let isMemberIn = members.find((memb) => memb.name === member.name);

    if (isMemberIn == null) {
      setMembers([...members, member]);
    }
  }

  function refreshMembersNotGoing(memberData) {
    let filteredMembers = members.filter(
      (member) => member.name != memberData.name
    );
    setMembers(filteredMembers);
  }

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

  console.log("TIIIIIMMMMEEe", activity?.time.toDate());

  console.log(moment2, moment1, "TOJEAOGJAOGDIFFFFF FF======");

  console.log(diff, "oiafhoghaoghaoigh");

  function getTimeRemaining() {
    if (-diff > 1) {
      return -diff + "d";
    }
    else if(-diff2 < 24 && -diff2 > 1){
      return -diff2 + "h";
    } 
    else if(-diff2 <=  1) {
      return -diff3 + "m";
    }
  }

  downloadImg();

  return (
    <div className="ActivityCard">

      <div className = "Header">
      <h4 className="Title">{activity.title}</h4>
      <img className="Timer" src={timer} />
     
      <p className = "Info"> {getTimeRemaining()} </p>
      <p className = "Info2"> {getTimeRemaining()} </p>
    
      <p className = "Detail">spots left</p>
      <p className = "Detail2 ">M, 830-10</p>

      </div>

      <div className="ImageContainer">
        <img className="Image" src={img} />
      </div>

      <div className="Highlights" >

        <h4>Tennis </h4>
        <h4>Practice </h4>
        <h4>Tennis </h4>

        <p>Stats</p>
        <p>Stats</p>
        <p>Stats</p>
      </div>

      <div className="Options">
        <JoinActivity
          activityID={activity.activityID}
          onSubmit={refreshMembersGoing}
          onLeave={refreshMembersNotGoing}
        />
        <p onClick={goToActivityPage}>More </p>
      </div>

    </div>
  );
}
