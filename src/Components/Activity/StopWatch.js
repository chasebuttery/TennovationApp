import React, { useState, useEffect, Component } from "react";
import "react-calendar/dist/Calendar.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function Timer(props) {
    const {activityTime} = props;


    const [timeRemaining, setTimeRemaining] = useState();
    const [curTime, setCurTime] = useState(new Date());

//     console.log("activitiy start time", timeRemaining);
//     // let testMin = Math.floor(timeRemaining / 60000);


// console.log("MILLLLLLLL", activityTime);



    function updateTime() {
        let interval = setInterval(() =>{
            setCurTime(new Date());
        }, 1000)
    }

    useEffect(updateTime, [])



    function updateTimeRemaining() {
        let interval = setInterval(() =>{

            var timeDif = activityTime.toDate() - curTime;
            var timeDifVal;

               console.log("94195y195y985!!!!!!!!!!!!!!", timeDif);

            if(timeDif > 86400){
                //days
            timeDifVal = Math.floor( timeDif /    86400  )

            //console.log("94195y195y985!!!!!!!!!!!!!!");
            }
            else if( timeDif > 3600000){
                //hours

                timeDifVal = Math.floor( timeDif /    3600000  )
            }
            else{
                //min
                timeDifVal = Math.floor( timeDif /    60000  )
               // console.log("94195y195y985!!!!!!!!!!!!!!");
                
            }
            setTimeRemaining(timeDifVal);


        }, 1000)
    }

    useEffect(updateTimeRemaining, [])





  return (


    <div className = "StopWatch">
        <Box position="relative" display="inline-flex">
          <CircularProgress className = "Circle" variant="determinate" value = {timeRemaining} />
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
            <Typography variant="caption" component="div" color="textSecondary">{timeRemaining}</Typography>
          </Box>
        </Box>
    </div>
   
  );
}
