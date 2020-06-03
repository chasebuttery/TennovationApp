import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ActivityCard from '../Components/ActivityCard';
import { getActivityList } from '../Backend/ActivitiesDB';
//import {}
import './PlayPage.scss';

export default function PlayPage() {
	const [ activities, setActivities ] = useState([]);

	useEffect(() => {
		async function getActivities() {
			const list = await getActivityList();
			setActivities(list.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			
		}
		getActivities();
	}, []);

	return (
		<div className="PlayPage">
			<h1>Welcome To Tennovation Play</h1>
			<p>Here you can find new and exciting experiences. Play is just one click away.</p>
			<div className="PlayGrid">
				{activities.map((activity) => (
					<div>
						<ActivityCard activity={activity} />
					</div>
				))}
			</div>
		</div>
	);
}
