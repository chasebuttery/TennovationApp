import React, { useState, useEffect, Component } from "react";
import ActivityCard from "../../Components/Activity/ActivityCard";
import { getActivitiesByAll } from "../../Backend/ActivitiesDB";
import anim from "../../Images/tennanim.mp4";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import "./PlayPage.scss";
import "react-calendar/dist/Calendar.css";
import ActivityFilter from "./components/ActivityFilter";
import tokenIcon from "../../Images/token.png";
import ticketIcon from "../../Images/ticket.png";

export default function PlayPage(props) {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState({});

  const [loading, setLoading] = useState(false);

  // const history = useHistory();
  // const location = useLocation();

  useEffect(() => {
    async function getActivitiesBy() {
      setLoading(true);
      const list = await getActivitiesByAll(filter);
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

  return (
    <div className="PlayPage">
      <div className="Header">
        <h1>Activities</h1>
        <div className="DaySlide">
          <label> Within Days</label>
          <Slider
            className="Slider"
            olo
            defaultValue={20}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={10}
            valueLabelDisplay="on"
            marks={days}
          />
        </div>
        <div className="Wallet">
          <strong> 1 </strong>
          <img className="Ticket" src={ticketIcon} />
          <strong> 1 </strong>
          <img className="Token" src={tokenIcon} />
        </div>
      </div>

      <div className="Play">
        <div className="Filter">
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
