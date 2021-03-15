import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ActivityPage.scss";
import { addUserToActivity } from "../../Backend/ActivitiesDB";
import {
  getActivityData,
  getMembersGoingList,
} from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import JoinActivity from "./JoinActivity";
import { NavLink } from "react-router-dom";
import firebase from "../../firebase";

import Token from "../../Images/token.png";
import Ktc from "../../Images/ktc.png";
import Tennis from "../../Images/tennis.png";
import Hollinger from "../../Images/holl.png";

export default function ActivityPage(props) {
  const [fullActivity, setFullActivity] = useState({});

  const [members, setMembers] = useState([]);

  const [img, setImg] = useState();
  const [vid, setVid] = useState();

  const [showImg, setShowImg] = useState(false);
  const [showVid, setShowVid] = useState(false);

  const { activityid } = props.match.params;
  const history = useHistory();

  useEffect(() => {
    async function getFullActivity(activityid) {
      const activityData = await getActivityData(activityid);
      setFullActivity(activityData);
    }
    getFullActivity(activityid);

    console.log(fullActivity);
  }, [activityid]);

  useEffect(() => {
    async function getMembersGoing(activityid) {
      const membersList = await getMembersGoingList(activityid);
      setMembers(
        membersList.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getMembersGoing(activityid);
  }, [activityid]);

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

  function downloadImg() {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref();

    var starsRef = storageRef.child("images/" + fullActivity?.imgID + ".jpg");
    //console.log('getting img')

    // Get the download URL
    const imgUrl = starsRef
      .getDownloadURL()
      .then(function(url) {
        // Insert url into an <img> tag to "download"
        setImg(url);
        setShowImg(true);
        console.log("in");
      })
      .catch(function(error) {
        // A full list of error codes is available at
        //console.log("ig not downloaded")
      });
  }

  downloadImg();

  // function downloadVid(event) {
  //   // Create a reference to the file we want to download
  //   var storageRef = firebase.storage().ref();
  //   var starsRef = storageRef.child("mainvid.mp4");
  //   console.log("getting vidd");

  //   // Get the download URL
  //   const vidUrl = starsRef
  //     .getDownloadURL()
  //     .then(function(url) {
  //       // Insert url into an <img> tag to "download"
  //       setVid(url);
  //       setShowVid(true);
  //     })
  //     .catch(function(error) {
  //       // A full list of error codes is available at
  //     });

  //   console.log(vid);
  // }

  return (
    <div className="ActivityPage">
      <h1 className="ActivityHeader">{fullActivity?.title}</h1>

      <div className="Info">
        <div className="What">
          {fullActivity?.sport === "tennis" ? (
            <img className="Icon" src={Tennis} />
          ) : (
            <p>fullActivity.sport</p>
          )}
        </div>
        <div className="Where">
          {fullActivity.location === "Hollinger" ? (
            <img className="Logo" src={Hollinger} />
          ) : (
            <p>{fullActivity.location}</p>
          )}
        </div>
        <div className="Cost">
          <p>{fullActivity.cost}</p>
          <img className="Icon" src={Token} />
        </div>
      </div>

      {showImg && <img className="Image" src={img} />}

      {/* <p>{fullActivity?.time}</p> */}

      <p>{fullActivity?.description}</p>

      <JoinActivity
        activityID={fullActivity.activityID}
        onSubmit={refreshMembersGoing}
        onLeave={refreshMembersNotGoing}
      />

      <div className="People">
        <div className="CoachInfo">
          <p>Coach:</p>
          <img className="CreatorImg" src={fullActivity.creatorImage} />
          <p> {fullActivity.creatorID}</p>
        </div>

        <div className="MembersInfo">
          <p>Members Going:</p>
          <div className="MembersGoingGrid">
            {members.map((member) => (
              <div>
                <Member member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="Results"
        onClick={(e) => {
          e.preventDefault();
          history.push("/explore");
        }}
      >
        Back To Results
      </button>
    </div>
  );
}
