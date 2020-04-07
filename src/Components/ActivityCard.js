import React, { useState, useEffect } from 'react';
import './ActivityCard.scss';
import { addUserToActivity } from '../Backend/ActivitiesDB';
import { getMembersGoingList } from '../Backend/ActivitiesDB';
import Member from './Member';
import './ActivityCard.scss';
import JoinActivity from './JoinActivity';
import { NavLink } from 'react-router-dom';

export default function ActivityCard(props) {
	const { activity } = props;
	const [ members, setMembers ] = useState([]);
	const [ expanded, setExpanded ] = useState(true);

	useEffect(
		() => {
			async function getMembersGoing(activity) {
				const membersList = await getMembersGoingList(activity.activityID);
				setMembers(membersList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}
			getMembersGoing(activity);
		},
		[ activity ]
	);

	function refreshMembersGoing(member) {
		console.log(member);
		console.log(members);
		console.log('LIST' + members.length);
		console.log(!members.includes(member));
		//console.log('ADDINGGGG');
		//fruits.find(fruit => fruit.name === 'apples');
		let isMemberIn = members.find((memb) => memb.name === member.name);
		console.log(isMemberIn);
		if (isMemberIn == null) {
			console.log('ADDINGGGG');
			setMembers([ ...members, member ]);
		}
	}

	function refreshMembersNotGoing(memberData) {
		console.log('LEAVING ACTIVITY' + memberData.name);
		let filteredMembers = members.filter((member) => member.name != memberData.name);
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

	return (
		<div className="ActivityCard">
			<h2 className="Title">{activity.title}</h2>
			<h4 className="Category">{activity.category}</h4>
			<img className="Image" src={activity.imageURL} />
			<h4 className="Description">{activity.description}</h4>
			<NavLink className="ActivityLink" to={'./play/' + activity.activityID}>
				<h1>Activity Page</h1>
			</NavLink>
			<JoinActivity
				activityID={activity.activityID}
				onSubmit={refreshMembersGoing}
				onLeave={refreshMembersNotGoing}
			/>
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
