import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ActivityCard.scss';
import { addUserToActivity, deleteUserFromActivity, getMembersGoingList } from '../Backend/ActivitiesDB';
import Member from './Member';
import Auth from '../Auth';

export default function JoinActivity(props) {
	const { activityID } = props;
	// const { members } = props.members;
	const [ member, setMember ] = useState({
		name: Auth.getUserName(),
		profileImg: Auth.getProfileImg()
	});

	console.log('props' + props);

	//const [ membersGoingList ] = useState(getMembersGoingList(activityID) );

	function passMemberToParent(member) {
		console.log('DATA ' + member.name);
		props.onSubmit(member);
	}

	function addMember(event) {
		console.log('joining activity');
		event.preventDefault();
		addUserToActivity(activityID);
		passMemberToParent(member);
	}

	function deleteMember(event) {
		deleteUserFromActivity(activityID);
		// deleteUserFromParent(member);
		props.onLeave(member);
	}

	return (
		<div className="JoinActivity">
			<button className="JoinActivityButton" type="submit" onClick={addMember}>
				JOIN
			</button>
			<button className="LeaveActivityButton" onClick={deleteMember}>
				LEAVE
			</button>
		</div>
	);
}
