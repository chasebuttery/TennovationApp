//

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addActivity } from "../../Backend/ActivitiesDB";
import firebase from "../../firebase";
import "./CreatePage.scss";

export default function CreatePage() {
  const [activity, setActivity] = useState({
    activityID: "",
    type: "activity/event",
    eventCategoryMap: ["select category", "tournament", "party", "meeting"],
    activityCategoryMap: ["select category", "learn", "play", "create"],
    sportMap: ["select sport", "tennis", "basketball", "golf", "other"],
    sportOther: "",
    costMap: ["select cost", "0", "1", "2", "3", "other"],
    costOther: "",
    locationMap: [
      "select location",
      "KTC Quail",
      "Hollinger",
      "Sugar Valley",
      "Bellbrook Golf Range",
      "other",
    ],
    locationOther: "",
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
    weekMap: ["select week", "7/6", "7/13", "7/20", "7/27"],
    coachMap: [
      "select coach",
      "Chase Buttery",
      "Matt Redden",
      "Alex Fryman",
      "Ryan Remaly",
    ],
  });

  //Activity Values to send to Firestore
  const [createActivity, setCreateActivity] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [activityCategory, setActivityCategory] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [imgID, setImgID] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [description, setDescription] = useState("");
  const [addInfo, setAddInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [coach, setCoach] = useState("");

  const history = useHistory();

  const [haveSubmitted, setHaveSubmitted] = useState(false);

  function submitActivityOrEvent(event) {
    addActivity(
      createActivity,
      createEvent,
      title,
      activityCategory,
      eventCategory,
      sport,
      location,
      cost,
      imgID,
      time,
      day,
      week,
      description,
      info,
      coach
    );
    event.preventDefault();

    //make it known form is saved and dont double deploy it

    console.log("create it");
    setHaveSubmitted(true);
  }

  // function handleSportChange(event) {
  //   const categoryValue = event.target.value;

  //   setActivity((curActivity) => {
  //     return {
  //       ...curActivity,
  //       category: categoryValue,
  //     };
  //   });
  //   console.log("category is" + categoryValue);
  // }
  // function handleCostChange(event) {
  //   const categoryValue = event.target.value;

  //   setActivity((curActivity) => {
  //     return {
  //       ...curActivity,
  //       cost: categoryValue,
  //     };
  //   });
  //   console.log("category is" + categoryValue);
  // }

  // function handleLocationChange(event) {
  //   const locationValue = event.target.value;

  //   setActivity((curActivity) => {
  //     return {
  //       ...curActivity,
  //       location: locationValue,
  //     };
  //   });
  //   console.log("location is" + locationValue);
  // }
  // function handleImageChange(event) {
  //   const imageURLValue = event.target.value;

  //   setActivity((curActivity) => {
  //     return {
  //       ...curActivity,
  //       imageURL: imageURLValue,
  //     };
  //   });
  //   console.log("image is" + imageURLValue);
  // }

  //SETTERS

  function selectActivity(e) {
    e.preventDefault();

    setCreateActivity(!createActivity);
  }

  function selectEvent(e) {
    e.preventDefault();

    setCreateEvent(!createEvent);
  }

  function handleTitleChange(event) {
    const titleValue = event.target.value;

    setTitle(titleValue);

    console.log("title is" + titleValue);
  }

  function handleACSelect(e) {
    const categoryValue = e.target.value;

    setActivityCategory(categoryValue);

    console.log("made it");
  }

  function handleECSelect(e) {
    console.log("Value", e.target.value);

    const categoryValue = e.target.value;

    setEventCategory(categoryValue);

    console.log("made ittt");
  }

  function handleSportSelect(e) {
    const value = e.target.value;

    setSport(value);

    console.log("made it to sport");
  }

  function handleLocationSelect(e) {
    const value = e.target.value;

    setLocation(value);
  }

  function handleCostSelect(e) {
    const value = e.target.value;

    setCost(value);
  }

  function saveImg(event) {
    let file = event.target.files[0];

    // Create a root reference
    var storageRef = firebase.storage().ref();

    let imgString =
      "img" +
      Math.random()
        .toString(36)
        .substring(7);
    let imgNum = Math.floor(1000 + Math.random() * 9000);
    let imgName = imgString + imgNum;

    var activityImgRef = storageRef.child("images/" + imgName + ".jpg");

    activityImgRef.put(file).then(function(snapshot) {
      console.log("Uploaded a blob or file!");
    });

    setImgID(imgName);
  }

  function handleTimeChange(event) {
    const timeValue = event.target.value;

    setTime(timeValue);
  }

  function handleDaySelect(e) {
    const value = e.target.value;

    setDay(value);
  }

  function handleWeekSelect(e) {
    const value = e.target.value;

    setWeek(value);
  }

  function handleDescriptionChange(event) {
    const descriptionValue = event.target.value;

    setDescription(descriptionValue);
    console.log("description is" + descriptionValue);
  }

  function handleInfoChange(event) {
    const infoValue = event.target.value;

    setInfo(infoValue);
  }

  function handleCoachSelect(e) {
    const value = e.target.value;

    setCoach(value);
  }

  // console.log("activityInfo", activity);
  // console.log("sport", sport)
  // console.log("ac", activityCategory)
  // console.log("ec", eventCategory)

  return (
    <div className="CreatePage">
      <div className="Header">
        <h1>Create</h1>
        <p className="text">customize and share your</p>

        <div className="AESelect">
          <button
            className={createActivity ? "active" : "unactive"}
            onClick={selectActivity}
          >
            activity
          </button>
          <button
            className={createEvent ? "active" : "unactive"}
            onClick={selectEvent}
          >
            event
          </button>
        </div>
      </div>

      <div className="CreateForm">
        <form className="Form" required={true}>
          <div className="Title">
            <label>
              title
              <input value={title} name="title" onChange={handleTitleChange} />
            </label>
            <div className="CategorySelect">
              {createActivity && createEvent == false && (
                <select
                  className="ActivitySelect"
                  onChange={handleACSelect}
                  value={activityCategory}
                >
                  {activity.activityCategoryMap?.map((category) => {
                    return (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              )}

              {createEvent && createActivity == false && (
                <select
                  className="EventSelect"
                  onChange={handleECSelect}
                  value={eventCategory}
                >
                  {activity.eventCategoryMap?.map((category) => {
                    return (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          <div className="Selects">
            <div className="SportSelect">
              <select onChange={handleSportSelect} value={sport}>
                {activity.sportMap?.map((sport) => {
                  return (
                    <option value={sport} key={sport}>
                      {sport}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="LocationSelect">
              <select onChange={handleLocationSelect} value={location}>
                {activity.locationMap?.map((location) => {
                  return (
                    <option value={location} key={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="CostSelect">
              <select onChange={handleCostSelect} value={cost}>
                {activity.costMap?.map((cost) => {
                  return (
                    <option value={cost} key={cost}>
                      {cost}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="ImageUpload">
            <label>Upload Image:</label>
            <input type="file" name="imgFile" onChange={saveImg} />
          </div>

          <div className="Details">
            <div className="Time">
              <label>
                enter time
                <input type="text" name="time" onChange={handleTimeChange} />
              </label>
              <select
                className="DaySelect"
                onChange={handleDaySelect}
                value={day}
              >
                {activity.dayMap?.map((day) => {
                  return (
                    <option value={day} key={day}>
                      {day}
                    </option>
                  );
                })}
              </select>
              <select
                className="WeekSelect"
                onChange={handleWeekSelect}
                value={week}
              >
                {activity.weekMap?.map((week) => {
                  return (
                    <option value={week} key={week}>
                      {week}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="Description">
              <label>Description</label>
              <textarea
                name="info"
                value={description}
                placeholder={description}
                onChange={handleDescriptionChange}
              />
              <button
                className="InfoAdd"
                onClick={(e) => {
                  e.preventDefault();
                  setAddInfo(!addInfo);
                }}
              >
                Add Additional Information
              </button>

              <div className="Info">
                <textarea
                  name="info"
                  value={info}
                  placeholder={info}
                  className={addInfo ? "" : "InfoClosed"}
                  onChange={handleInfoChange}
                />
              </div>
            </div>
          </div>

          <div className="CoachSelect">
            <select onChange={handleCoachSelect} value={coach}>
              {activity.coachMap?.map((coach) => {
                return (
                  <option value={coach} key={coach}>
                    {coach}
                  </option>
                );
              })}
            </select>
          </div>

          {haveSubmitted === false && (
            <div className="SubmitButton">
              <button type="submit" onClick={submitActivityOrEvent}>
                Create Activity
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
