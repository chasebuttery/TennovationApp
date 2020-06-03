import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import GolfIcon from '../../Images/sugar.png';
import HollIcon from '../../Images/holl.png';
import KTCIcon from '../../Images/ktc.png';
import './LocationsInfo.scss';

export default function LocationsInfo() {

  const history = useHistory();

  return (
    <div className='LocationsInfo' onClick = {e => {history.push('/play')}}>
      
      <h1 className = "InfoTitle"> Locations </h1>
      <p> Play at our partnered locations.. </p>
        <div className="Icons">
          <div className ="KTC">
          <img className='Icon' src={KTCIcon} />
          KTC/Quail
        </div>
        <div className ="Holl">
      <img className='Icon' src={HollIcon} />
        Hollinger
      </div>
      <div className ="Brook">
      <img className='Icon' src={GolfIcon} />
      Sugar Valley
      </div>
      </div>
    </div>
  )
}
