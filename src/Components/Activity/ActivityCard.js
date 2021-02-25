import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ActivityCard.scss";
import firebase from "../../firebase";
import { addUserToActivity } from "../../Backend/ActivitiesDB";
import { getMembersGoingList } from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import "./ActivityCard.scss";
import JoinActivity from "./JoinActivity";
import { NavLink } from "react-router-dom";
import Token from "../../Images/token.png";
import Ktc from "../../Images/ktc.png";
import Sport from "../../Images/tennis.png";

import MoreIcon from "../../Images/Go.png";

export default function ActivityCard(props) {
  const { activity } = props;
  const [members, setMembers] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const [img, setImg] = useState("");

  const [showImg, setShowImg] = useState(false);

  const history = useHistory();

  function goToActivityPage() {
    history.push("./explore/" + activity.activityID);
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
    console.log(member);
    console.log(members);
    console.log("LIST" + members.length);
    console.log(!members.includes(member));
    //console.log('ADDINGGGG');
    //fruits.find(fruit => fruit.name === 'apples');
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

  function expandActivity() {
    setExpanded(!expanded);

    //GO TO FULL ACTIVITY PAGE

    // <NavLink  className to = {'./play/' + activity.activityID} >
  }

  //   function joinActivity() {
  //     console.log("joining activity");
  //     addUserToActivity(activity.activityID);
  //   }

  //Test Members Going Array
  //   members.map(member => {
  //     console.log("member..." + member.name);
  //   });

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
        console.log("in");
      })
      .catch(function(error) {
        // A full list of error codes is available at
        //console.log("ig not downloaded")
      });
  }

  downloadImg();

  console.log("activity card values", activity);

  return (
    <div className="ActivityCard">
      <div className="ActivityCardInner">
        <div className="ActivityCardFront">
          {showImg && (
            <div className="ActivityContainer">
              <img className="Image" src={img} />
            </div>
          )}
          <div className="MobileSub">
            <h3 className="Title">{activity.title}</h3>
            <div className="More" onClick={goToActivityPage}>
              <img className="Icon" src={MoreIcon} />
              <p>More</p>
            </div>
          </div>
        </div>

        <div className="ActivityCardBack">
          <div className="Top">
            <div className="Sport">
              <img className="Icon" src={Sport} />
            </div>
            <div>
              {activity.location === "KTC/Quail" ? (
                <img className="KTC" src={Ktc} />
              ) : <p>{activity.location}</p>}
            </div>
            <div className="Cost">
              <img className="Token" src={Token} />
              <h2 className="Amount ">{activity.cost}</h2>
            </div>
          </div>
          <h2 className="Title">{activity.title}</h2>


          {showImg && <img className="Image" src={img} />}
          {/* <div className="Location">
            <img className="Kettering" src={Kettering} />
          </div> */}
          <div className="Time">
            <p>{activity.time}</p>
          </div>

          <h4 className="Description">{activity.description}</h4>

          <div className="JoinOptions">
            <JoinActivity
              activityID={activity.activityID}
              onSubmit={refreshMembersGoing}
              onLeave={refreshMembersNotGoing}
            />
          </div>
          <div className="Members">
            <div className="MembersGoingGrid">
              {members.map((member) => (
                <div>
                  <Member member={member} />
                </div>
              ))}
            </div>
            <div className="More" onClick={goToActivityPage}>
              <img className="Icon" src={MoreIcon} />
              <p>More</p>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
