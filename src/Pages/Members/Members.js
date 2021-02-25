import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Members.scss";
import { getMembersGoingList, getMembers } from "../../Backend/ActivitiesDB";
import Member from "../../Components/Member/Member";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembersList() {
      const membersList = await getMembers();
      setMembers(
        membersList.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getMembersList();
  }, [members]);

  return (
    <div className="MembersPage">
      <h1>Members</h1>
      <div className="MembersGoingGrid">
        {members.map((member) => (
          <div>
            <Member member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
