import React, { useState } from "react";
import { addActivity } from "../Backend/ActivitiesDB";

export default function CreatePage() {

  const [activity, setActivity] = useState({
    activityID: "",
    title: "",
    category: "",
    categoryMap: ['categories', 'categ'],
    description: "",
    location: "",
    time: "",
    imageURL: ""
  });

  function handleTitleChange(event) {
    const titleValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        title: titleValue
      };
    });
    console.log("title is" + titleValue + " OR " + activity.title);
  }
  function handleCategoryChange(event) {
    const categoryValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        category: categoryValue
      };
    });
    console.log("category is" + categoryValue);
  }
  function handleDescriptionChange(event) {
    const descriptionValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        description: descriptionValue
      };
    });
    console.log("description is" + descriptionValue);
  }
  function handleLocationChange(event) {
    const locationValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        location: locationValue
      };
    });
    console.log("location is" + locationValue);
  }
  function handleTimeChange(event) {
    const timeValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        time: timeValue
      };
    });
    console.log("time is" + timeValue);
  }
  function handleImageChange(event) {
    const imageURLValue = event.target.value;

    setActivity(curActivity => {
      return {
        ...curActivity,
        imageURL: imageURLValue
      };
    });
    console.log("image is" + imageURLValue);
  }
  function createActivity(event) {
    addActivity(activity);
    event.preventDefault();

    console.log("create it");
  }

  return (
    <div className="CreatePage">
      <h1>Welcome To Tennovation Create</h1>
      <p>
        Here you can create activities experiences.. create
        whatever you wish..
      </p>
      <form className="CreateActivity">
        <label>
          title
          <input type="text" name="title" onChange={handleTitleChange} />
        </label>
        <select

          >
            {activity.categoryMap?.map((category ) => {
              return <option key={category }>{category}</option>})
            } || 'N/A'}
          </select>
        <label>
          category
          <input type="text" name="category" onChange={handleCategoryChange} />
        </label>
        <label>
          description
          <input
            type="text"
            name="description"
            onChange={handleDescriptionChange}
          />
        </label>
        <label>
          location
          <input type="text" name="location" onChange={handleLocationChange} />
        </label>
        <label>
          time
          <input type="text" name="time" onChange={handleTimeChange} />
        </label>
        <label>
          image
          <input type="text" name="imageURL" onChange={handleImageChange} />
        </label>
        <button type="submit" onClick={createActivity}>
          Create Activity
        </button>
      </form>
    </div>
  );
}
