import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './HomePage.scss'
import TennisEvent from '../Images/KTCQuail.jpeg'
import CreateIcon from '../Images/createicon.png'
import firebase from '../firebase';
import ActivitiesInfo from './Components/ActivitiesInfo'
import CreatorsInfo from './Components/CreatorsInfo'
import LocationsInfo from './Components/LocationsInfo'
import EventsInfo from './Components/EventsInfo'

export default function HomePage () {
  const history = useHistory()

  function goToCreatePage () {
    history.push('/create')
  }
  function goToJoinPage () {
    history.push('/join')
  }


  return (
    <div className='HomePage'>
      <h1>Tennovation</h1>
      <h3>Learn, Play, Create Together</h3>

      <div className='Image'>
        <img src={TennisEvent} />
      </div>


      <div className = "HomeInfo">
      <ActivitiesInfo />
      <CreatorsInfo />
      <LocationsInfo />
      <EventsInfo />
      </div>

      <div className='CreateActivityButton' onClick={goToCreatePage} >
        <h2>CREATE</h2>
      </div>
      <div className='BecomeMemberButton' onClick={goToJoinPage} >
        <h2>BECOME A MEMBER </h2>
      </div>

    </div>
  )
}
