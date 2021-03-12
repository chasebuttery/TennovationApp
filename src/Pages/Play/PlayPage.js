import React, { useState, useEffect, Component } from "react";
import ActivityCard from "../../Components/Activity/ActivityCard";
import {
  getActivitiesByAll
} from "../../Backend/ActivitiesDB";
import anim from "../../Images/tennanim.mp4";
import "./PlayPage.scss";
import "react-calendar/dist/Calendar.css";
import ActivityFilter from './components/ActivityFilter'

export default function PlayPage(props) {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState({})
 
 const [loading, setLoading] = useState(false);


  // const history = useHistory();
  // const location = useLocation();
  

  useEffect(() => {
    async function getActivitiesBy() {
      setLoading(true)
      const list = await getActivitiesByAll(filter);
      setActivities(list.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false)
    }
    getActivitiesBy();
    
    //getActivitiesBy(filterOptions);
  }, [ filter]);


  function updateFilter(filterOptions){

    //console.log("5555555555555", filterOptions);
  
    setFilter(filterOptions)

  }


  

  return (
    <div className="PlayPage">
      <div className="Header">
        <h1>Activities</h1>
      </div>

      <div className = "Play">
        <div className = "Filter">
           <ActivityFilter updateFilter = {updateFilter} />
        </div>
        
      <div className="PlayGrid">
        { !loading ? activities.map((activity) => (
          <div key = {activity}>
            <ActivityCard key={activity.id} activity={activity} />
          </div >
        )) :
            <div className = "Loading">
            {/* <video className="Anim" autoPlay loop muted playsInline>
                <source src={anim} type="video/mp4" />
            </video> */}
            Loading
            </div>
        }
      </div>
      </div>
    </div>
  );
}
