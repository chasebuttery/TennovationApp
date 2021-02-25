import React, { useState, useEffect, Component } from "react";
import { NavLink } from "react-router-dom";

import Calendar from "react-calendar";

import ActivityCard from "../../Components/Activity/ActivityCard";

import Icon from "../../Images/golf.png";
import CalendarButton from "../../Images/call.png";
import {
  getActivityList,
  getActivitiesByAll,
} from "../../Backend/ActivitiesDB";
//import {}
import "./PlayPage.scss";
import "react-calendar/dist/Calendar.css";

export default function PlayPage() {
  const [activities, setActivities] = useState([]);
  const [activityOptions, setActivityOptions] = useState({
    type: "activity/event",
    typeMap: ["any", "activity", "event", "tournament", "party", "meeting"],
    categoryMap: ["any", "learn", "play", "train", "compete"],

    sportMap: ["all", "tennis", "basketball", "golf", "drone flying", "other"],
    costMap: ["select cost", "0", "1", "2", "3", "other"],
    locationMap: [
      "select location",
      "KTC Quail",
      "Hollinger",
      "Sugar Valley",
      "Bellbrook Golf Range",
      "other",
    ],
    dayMap: [
      "select day",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    weekMap: ["this week", "next week", "future"],
    coachMap: [
      "select coach",
      "Chase Buttery",
      "Matt Redden",
      "Alex Fryman",
      "Ryan Remaly",
    ],
  });
  const [category, setCategory] = useState("");

  const [openCalendar, setOpenCalendar] = useState(false);

  const [week, setWeek] = useState("");
  const [type, setType] = useState("");

  const [date, setDate] = useState(new Date());

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const [day, setDay] = useState(getTheDay());

  function getTheDay() {
    const dow = new Date().getDay();

    if (dow === 1) {
      return "Monday";
    } else if (dow === 2) {
      return "Tuesday";
    } else if (dow === 3) {
      return "Wednesday";
    } else if (dow === 4) {
      return "Thursday";
    } else if (dow === 5) {
      return "Friday";
    } else if (dow === 6) {
      return "Saturday";
    } else {
      return "Sunday";
    }
  }
  function setTheDay(dow) {
    console.log(dow, "wahthtt");
    if (dow === 1) {
      setDay("Monday");
    } else if (dow === 2) {
      setDay("Tuesday");
    } else if (dow === 3) {
      setDay("Wednesday");
    } else if (dow === 4) {
      setDay("Thursday");
    } else if (dow === 5) {
      setDay("Friday");
    } else if (dow === 6) {
      setDay("Saturday");
    } else {
      setDay("Sunday");
    }
  }

  useEffect(() => {
    async function getActivitiesBy(dow) {
      const list = await getActivitiesByAll(day);
      setActivities(list.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getActivitiesBy(day);
  }, [day]);

  console.log(activities);

  function handleCategorySelect(e) {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
  }

  function handleWeekSelect(e) {
    const weekValue = e.target.value;
    setWeek(weekValue);
  }

  function handleTypeSelect(e) {
    const typeValue = e.target.value;
    setType(typeValue);
  }

  function onDayChange(date) {
    setDate(date);
    setOpenCalendar(false);

    setTheDay(date.getDay());

    console.log(date, "WHAT ISITITIAGOHASVAHHAHAHA");
  }

  console.log(date.toLocaleDateString("en-US", dateOptions), "DATEEEEEE", day);

  return (
    <div className="PlayPage">
      <div className="Header">
        <h1>Explore</h1>
        <p>Find new activities and events near you.</p>
      </div>
      <div className="FilterOptions">
        <div>
          <img
            className="CalendarButton"
            onClick={(e) => {
              setOpenCalendar(!openCalendar);
            }}
            src={CalendarButton}
          />
        </div>
        <h3
          className="Day"
          onClick={(e) => {
            setOpenCalendar(!openCalendar);
          }}
        >
          {date.toLocaleDateString("en-US", dateOptions)}
        </h3>
        <div className="Select">
          <select
            className="SelectType"
            onChange={handleTypeSelect}
            value={type}
          >
            {activityOptions.categoryMap?.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {openCalendar === true && (
        <Calendar className="Calendar" onChange={onDayChange} value={date} />
      )}

      <div className="PlayGrid">
        {activities.map((activity) => (
          <div>
            <ActivityCard key={activity.id} activity={activity} />
          </div>
        ))}
      </div>
    </div>
  );
}
