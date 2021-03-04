import React, { useState, useEffect, Component } from "react";
import { NavLink} from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import ActivityCard from "../../Components/Activity/ActivityCard";
import Icon from "../../Images/golf.png";
import CalendarButton from "../../Images/call.png";
import {
  getActivityList,
  getActivitiesByAll,
} from "../../Backend/ActivitiesDB";
import "./PlayPage.scss";
import "react-calendar/dist/Calendar.css";

export default function PlayPage(props) {
  const [activities, setActivities] = useState([]);
  const [newFilterString, setNewFilterString] = useState("ms");
  const [tennis, setTennis] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    tennis: false,
    basketball: false,
    golf: false,
    other: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday:false,
    friday:false,
    saturday: false,
    sunday:false

  });
 const [loading, setLoading] = useState(false);


  // const history = useHistory();
  // const location = useLocation();
  

  useEffect(() => {
    async function getActivitiesBy() {
      setLoading(true)
      const list = await getActivitiesByAll(filterOptions);
      setActivities(list.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getActivitiesBy();
    setLoading(false)
    //getActivitiesBy(filterOptions);
  }, [ filterOptions]);
  //check to see if sport,day, type, time have changed.  If so run the get activities function and start load.  Then after set activities stop the load

  //change sport, change day, change type, change group size





  function toggleFilter(e){
    let value = e.target.value
    let checked = e.target.checked

    //console.log("========!!!!!!!!!!", checked);

      setFilterOptions((curFilter) => {
        return{
          ...curFilter,
          [value]: checked
      }
        })
  }

  console.log("FILLLTTTT", filterOptions);
  



  // function goToFilteredPage(value, checked ) {

  //   // console.log("LOCA", value, checked, filterString);
  //   if(value && checked){
  //     if(filterString){
  //   setNewFilterString(filterString + value)
  //     }else{
  //       setNewFilterString(value)
  //     }
    
  //   }
  //   else if(!checked){
  //     if(filterString){
  //     let newString = filterString;
  //     newString.replace(value, '')
  //     setNewFilterString(newString);
  //     }
  //   }
  // }

  //   goTo(newFilterString);
    


  //   //history.push("/explore/filter/" + newFilterString);

  // }

  // function goTo(newFilterString){
  //    history.push("/explore/filter/" + newFilterString);
  // }

  //console.log("TENNIS", tennis, "FILTER =======", filterString, filterOptions);

    

  return (
    <div className="PlayPage">
      <div className="Header">
        <h1>Activities</h1>
      </div>

      <div className = "Play">
      <div className="ActivityFilter">
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>



        <input checked = {filterOptions.monday} onChange = {toggleFilter} value = "monday" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
        <input checked = {filterOptions.tennis} onChange = {toggleFilter} value = "tennis" type= "checkbox" />
        <label>Tennis</label>
      </div>
        
      <div className="PlayGrid">
        { !loading ? activities.map((activity) => (
          <div key = {activity}>
            <ActivityCard key={activity.id} activity={activity} />
          </div >
        )) :
          "n/a"
        }
      </div>
      </div>
    </div>
  );
}
