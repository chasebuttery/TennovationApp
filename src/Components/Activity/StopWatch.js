import React, { useState, useEffect, Component } from "react";
import "react-calendar/dist/Calendar.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./StopWatch.scss";

export default function Timer(props) {
  const { activityTime } = props;

  const [timeValue, setTimeValue] = useState(false);
  const [day, setDay] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState();
  const [curTime, setCurTime] = useState(new Date());

  //     console.log("activitiy start time", timeRemaining);
  //     // let testMin = Math.floor(timeRemaining / 60000);

  // console.log("MILLLLLLLL", activityTime);

  async function updateTime() {
    let interval = setInterval(() => {
      setCurTime(new Date());
    }, 1000);
  }

  useEffect(updateTime, []);

  async function updateTimeRemaining() {
    let interval = setInterval(() => {
      var timeDif = activityTime.toDate() - curTime;
      //console.log(timeDif, "THIS IS THE INITIAL DIFFERENCE");

      var timeDifVal = 10;

      // console.log("94195y195y985!!!!!!!!!!!!!!", timeDif);

      if (timeDif > 86400000 || timeDif < -86400000) {
        //days
        timeDifVal = Math.floor(timeDif / 86400000) + "d";
        setDay(true);
        //set to exact proportion in clock

        setTimeValue(99);
        console.log("HOURRRRRRRRR");
      } else if (timeDif > 3600000 || timeDif < 3600000) {
        timeDifVal = Math.floor(timeDif / 3600000) + "h";
        console.log("HOURRRRRRRRR");

        setTimeValue(50);
      } else {
        timeDifVal = Math.floor(timeDif / 60000) + "m";

        setTimeValue(5);
      }
      setTimeRemaining(timeDifVal);
    }, 1000);
  }
  // console.log("TIME REMAINING Activit", activityTime, timeRemaining);

  // useEffect(updateTimeRemaining, []);

  return (
    <div className="StopWatch">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          className="Circle"
          variant="determinate"
          color={day ? "default" : "secondary"}
          size={80}
          value={timeValue}
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
            {timeRemaining}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
