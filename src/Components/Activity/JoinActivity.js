import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";

import tokenIcon from "../../Images/token.png";
import { Fab } from "@material-ui/core";
import "./JoinActivity.scss";
import {
  addUserToActivity,
  deleteUserFromActivity,
  getMembersGoingList,
} from "../../Backend/ActivitiesDB";
import Member from "../Member/Member";
import Auth from "../../Auth";

export default function JoinActivity(props) {
  const { activityID, inActivity } = props;
  // const { members } = props.members;
  const [member, setMember] = useState({
    name: Auth.getUserName() || "",
    id: Auth.getUserID || "",
    profileImg: Auth.getProfileImg() || "",
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

  console.log("FAIGAINGAGINNNNNNN", inActivity);

  return (
    <div className="JoinActivity">
      {inActivity ? (
        <>
          <Fab>
            <RemoveCircleIcon className="Remove" />
          </Fab>
        </>
      ) : (
        <>
          <Fab onClick={addMember} className="JoinFab" variant="extended">
            <strong> 1 </strong>
            <img className="Token" src={tokenIcon} />
            <strong>JOIN</strong>
            {/* <AddCircleOutlineIcon className="Add" /> */}
            {/* <RemoveCircleIcon className="Remove" />  */}
          </Fab>
        </>
      )}
    </div>
  );
}
