import React, { useState, useEffect, Component } from "react";
import ActivityCard from "../../Components/Activity/ActivityCard";
import { getActivitiesByAll, getActiveActivities } from "../../Backend/ActivitiesDB";
import anim from "../../Images/tennanim.mp4";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./PlayPage.scss";
import "react-calendar/dist/Calendar.css";
import ActivityFilter from "./components/ActivityFilter";

import { Checkbox,Radio, Button } from "@material-ui/core";
import Timer from "./components/Timer";
import tokenIcon from "../../Images/token.png";
import ticketIcon from "../../Images/ticket.png";

export default function PlayPage(props) {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(false);

  // const history = useHistory();
  // const location = useLocation();

  useEffect(() => {
    async function getActivitiesBy() {
      setLoading(true);
      //const list = await getActivitiesByAll(filter);
      const list = await getActiveActivities();
      setActivities(list.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }
    getActivitiesBy();

    //getActivitiesBy(filterOptions);
  }, [filter]);

  function updateFilter(filterOptions) {
    //console.log("5555555555555", filterOptions);

    setFilter(filterOptions);
  }

  function searchActivities(e) {
    var searchValue = e.target.value;
    console.log("SSSSSSSSSSSESSSFSSS", searchValue);
  }

  const days = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 100,
      label: "30",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }


  function openFilter(){
    setIsMobile(!isMobile);
  }

  return (
    <div className="PlayPage">
      <div className="Header">
        <h1>Activities</h1>
        <div className="Sorter">
        <Select
          className = "SortBy"
          variant="outlined"
          value={10}
          color = "primary"
          onChange= {() => {}}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Free w/memb </MenuItem>
          <MenuItem value={20}>Free for all</MenuItem>
          <MenuItem value={30}> 1 tickets</MenuItem>
          <MenuItem value={30}> 3 tickets</MenuItem>
        </Select>
        </div>
        <div className="Wallet">
          <strong> 1 </strong>
          <img className="Ticket" src={ticketIcon} />
          <strong> 1 </strong>
          <img className="Token" src={tokenIcon} />
        </div>
      </div>


      <div className = "SubHeader">
      <div className = "Time">
          <Timer />
        </div>
        <div className = "FilterButton">
        <Button  className = "Button" onClick = {openFilter}> FILTER</Button>
        </div>

      </div>

      <div className="Play">
        <div className={isMobile ? "FilterMobile" : "Filter"}>
          <TextField
            className="SearchField"
            id="outlined-basic"
            label="Search Activities"
            onChange={searchActivities}
          />
          <ActivityFilter updateFilter={updateFilter} />
        </div>
        <div className="PlayGrid">
          {!loading ? (
            activities.map((activity) => (
              <div key={activity}>
                <ActivityCard key={activity.id} activity={activity} />
              </div>
            ))
          ) : (
            <div className="Loading">
              {/* <video className="Anim" autoPlay loop muted playsInline>
                <source src={anim} type="video/mp4" />
            </video> */}
              Loading
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
