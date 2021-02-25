import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./JoinActivity.scss";
import {
  addUserToActivity,
  deleteUserFromActivity,
  getMembersGoingList,
} from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import Auth from "../../Auth";

export default function JoinActivity(props) {
  const { activityID } = props;
  // const { members } = props.members;
  const [member, setMember] = useState({
    name: Auth.getUserName() || "",
    profileImg: Auth.getProfileImg(),
  });

  const history = useHistory();
  console.log("props" + props);

  //const [ membersGoingList ] = useState(getMembersGoingList(activityID) );

  function passMemberToParent(member) {
    console.log("DATA " + member.name);
    props.onSubmit(member);
  }

  function addMember(event) {
    console.log("joining activity");
    event.preventDefault();

    //if logged in
    if (member.name != "") {
      addUserToActivity(activityID);
      passMemberToParent(member);
    } else {
      history.push("/profile");
    }
  }

  function deleteMember(event) {
    deleteUserFromActivity(activityID);
    // deleteUserFromParent(member);
    props.onLeave(member);
  }

  return (
    <div className="JoinActivity">
      <button className="JoinActivityButton" type="submit" onClick={addMember}>
        I'M IN
      </button>
      <button className="LeaveActivityButton" onClick={deleteMember}>
        I'M OUT
      </button>
    </div>
  );
}
