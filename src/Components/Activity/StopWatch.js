import React, { useState, useEffect, Component } from "react";
import "react-calendar/dist/Calendar.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./StopWatch.scss";

export default function Timer(props) {
  const { activityTime } = props;
  const [timeRemaining, setTimeRemaining] = useState();

  const [duration, setDuration] = useState("d");

  const [fillValue, setFillValue] = useState();
  const [curTime, setCurTime] = useState(new Date());

  //     console.log("activitiy start time", timeRemaining);
  //     // let testMin = Math.floor(timeRemaining / 60000);

  // console.log("MILLLLLLLL", activityTime);

  // async function updateTime() {
  //   let interval = setInterval(() => {
  //     setCurTime(new Date());
  //   }, 1000);
  // }

  useEffect(updateTimeRemaining, []);

  function updateTimeRemaining() {
    let interval = setInterval(() => {
      var timeDif = activityTime.toDate() - curTime;
      //console.log(timeDif, "THIS IS THE INITIAL DIFFERENCE");

    
      // console.log("94195y195y985!!!!!!!!!!!!!!", timeDif);

      if (timeDif > 86400000 || timeDif < -86400000) {
        //days
        setTimeRemaining(Math.floor(timeDif / 86400000));
        setFillValue(80);
        setDuration("d");
        return;
       
      //console.log("TIME REMAINING Activit", timeRemaining);
      } else if (timeDif > 3600000 || timeDif < 3600000) {
       
        setTimeRemaining(Math.floor(timeDif / 3600000));
        setFillValue(20);
        setDuration("h");
        return;
      } else {

        setTimeRemaining(Math.floor(timeDif / 60000));
        setFillValue(5);
        return;
      }
    }, 1000);
  }


  //console.log("TIME REMAINING Activit", timeRemaining);



  return (
    <div className="StopWatch">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          className={fillValue >= 80 ? "Circle" : "CircleAlert"}
          variant="determinate"
          size={80}
          value={fillValue}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            className="TimeLeft"
            variant="caption"
            component="div"
            color="textSecondary"
          >
            {timeRemaining + duration}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
