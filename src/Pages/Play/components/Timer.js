import React, { useState, useEffect, Component } from "react";
import "./ActivityFilter.scss";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Checkbox,Radio, Button } from "@material-ui/core";
import { weekdays } from "moment";
import { mdiSelectMultipleMarker } from "@mdi/js";

import "../PlayPage.scss";


export default function Timer() {
    const [timer, setTimer] = useState()

    function updateTime() {
        let interval = setInterval(() =>{
            var tempTime = new Date();
            setTimer(tempTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }, 1000)
    }

    useEffect(updateTime, []);

    console.log("TIMER", timer);
    


  return (
  <>


    <div className = "TimeString">
        <p>{timer || "~"}</p>
    </div>
    </>
  );
}
