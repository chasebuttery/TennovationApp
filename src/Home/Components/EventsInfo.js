import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import EventIcon from '../../Images/event.png';
import TourneyIcon from '../../Images/tourney.png';
import PartyIcon from '../../Images/party.png';
import './EventsInfo.scss';

export default function EventsInfo() {

  const history = useHistory();

  return (
    <div className='EventsInfo' onClick = {e => {history.push('/play')}}>
      
      <h1 className = "InfoTitle"> Events </h1>
      <p> sign up for.. </p>
        <div className="Icons">
          <div className ="Tourney">
          <img className='Icon' src={TourneyIcon} />
          Tennis
        </div>
        <div className ="Party">
      <img className='Icon' src={PartyIcon} />
        Basketball
      </div>
      <div className ="Event">
      <img className='Icon' src={EventIcon} />
      Golf
      </div>
      </div>
    </div>
  )
}
