import React, { useState, useEffect } from 'react';
import './Member.scss';

export default function Member(props) {
	const { member } = props;

	console.log(member.profileImg);

	return (
		<div className="Member">
			<img className="MemberImage" src={member.profileImg} />
			<h1 className="MemberName">{member.name}</h1>
		</div>
	);
}
