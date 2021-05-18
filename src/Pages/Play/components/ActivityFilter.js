import React, { useState, useEffect, Component } from "react";
import "./ActivityFilter.scss";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Checkbox,Radio, Button } from "@material-ui/core";
import { weekdays } from "moment";


export default function ActivityFilter(props) {
  const [filterOptions, setFilterOptions] = useState({
    tennis: false,
    basketball: false,
    golf: false,
    other: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

 


  

  const { updateFilter } = props;

  updateFilter(filterOptions);

  function toggleFilter(e) {
    let value = e.target.value;
    let checked = e.target.checked;

    //console.log("========!!!!!!!!!!", checked);

    setFilterOptions((curFilter) => {
      return {
        ...curFilter,
        [value]: checked,
      };
    });
  }

  return (
  <>
      <div className="ActivityFilter">

    <div className = "Sport">
    <label>Sport </label>
     <div className = "FilterOption" >
       <Checkbox
        value="tennis"
        className = "Checkbox"
        checked={filterOptions.tennis}
        onChange={toggleFilter}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Tennis </label>
      </div>
      <div className="FilterOption">
        <Checkbox
          value="basketball"
          className = "Checkbox"
          checked={filterOptions.basketball}
          onChange={toggleFilter}
          color = "default"
          type="checkbox"
        />
        <label>Golf</label>
      </div>
      <div className="FilterOption">
        <Checkbox
          checked={filterOptions.golf}
          onChange={toggleFilter}
          className = "Checkbox"
          color = "default"
          value="golf"
          type="checkbox"
        />
        <label>Basketball</label>
      </div>
      <div className = "FilterOption" >
       <Checkbox
        value="tennis"
        className = "Checkbox"
        checked={filterOptions.tennis}
        onChange={toggleFilter}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Baseball </label>
      </div>
      <div className = "FilterOption" >
       <Checkbox
        value="tennis"
        className = "Checkbox"
        checked={filterOptions.tennis}
        onChange={toggleFilter}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Soccer </label>
      </div>
      <div className="FilterOption">
        <Checkbox
          checked={filterOptions.other}
          onChange={toggleFilter}
          className = "Checkbox"
          color = "default"
          value="other"
          type="checkbox"
        />
        <label>Other</label>
      </div>
      </div>


      <div className = "Day">
      <label>Day </label>
      <div className="FilterOption">
        <Radio
        className = "Radio"
          checked={filterOptions.monday}
          onChange={toggleFilter}
          value="monday"
          color = "default"
          type = "checkbox"
         
        />
        <label>Monday</label>
      </div>
      <div className="FilterOption">
        <Radio
          value="tuesday" 
          className = "Radio"
          checked={filterOptions.tuesday}
          onChange={toggleFilter}
          color = "default"
          type = "checkbox"
        />
        <label>Tuesday</label>
      </div>
      <div className="FilterOption">
        <Radio
        value="wednesday"
        className = "Radio"
          checked={filterOptions.wednesday}
          onChange={toggleFilter}
          color = "default"
          type = "checkbox"
        />
        <label>Wednesday</label>
      </div>
      <div className="FilterOption">
        <Radio
        value="thursday"
          checked={filterOptions.thursday}
          onChange={toggleFilter}
          className = "Radio"
          color = "default"
          type = "checkbox"
        />
        <label>Thursday</label>
      </div>
      <div className="FilterOption">
        <Radio
         value="friday"
          checked={filterOptions.friday}
          onChange={toggleFilter}
          className = "Radio"
          color = "default"
          type = "checkbox"
        
        />
        <label>Friday</label>
      </div>
      <div className="FilterOption">
        <Radio
        value="saturday"
          checked={filterOptions.saturday}
          onChange={toggleFilter}
          color = "default"
          className = "Radio"
          type = "checkbox"
        />
        <label>Saturday</label>
      </div>
      <div className="FilterOption">
        <Radio
        value="sunday"
          checked={filterOptions.sunday}
          onChange={toggleFilter}
          className = "Radio"
          color = "default"
          type = "checkbox"
        />
        <label>Sunday</label>
      </div>

      <div className = "Week">
    <label>Type </label>
     <div className = "FilterOption" >
       <Checkbox
        value="current"
        className = "Checkbox"
        checked={false}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Learn </label>
      </div>
      <div className = "FilterOption" >
       <Checkbox
        value="current"
        className = "Checkbox"
        checked={false}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Play </label>
      </div>
      <div className = "FilterOption" >
       <Checkbox
        value="current"
        className = "Checkbox"
        checked={false}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Create </label>
      </div>
      <div className = "FilterOption" >
       <Checkbox
        value="current"
        className = "Checkbox"
        checked={false}
        color = "default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label>Compete </label>
      </div>
      </div>

      </div>
    </div>
    </>
  );
}
