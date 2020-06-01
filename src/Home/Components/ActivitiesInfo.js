import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import TennisIcon from '../../Images/tennis.png';
import BasketballIcon from '../../Images/bball.png';
import GolfIcon from '../../Images/golf.png';
import './ActivitiesInfo.scss';

export default function ActivitiesInfo() {

  const history = useHistory();

  return (
    <div className='ActivitiesInfo' onClick = {e => {history.push('/play')}}>
      
      <h1 className = "InfoTitle"> Activities</h1>
      <p> play, train, and compete in sports and more</p>
        <div className="Icons">
          <div className ="Tennis">
          <img className='Icon' src={TennisIcon} />
          Tennis
        </div>
        <div className ="Basketball">
      <img className='Icon' src={BasketballIcon} />
        Basketball
      </div>
      <div className ="Golf">
      <img className='Icon' src={GolfIcon} />
      Golf
      </div>
      </div>
    </div>
  )
}
